import { type Plugin } from "@opencode-ai/plugin";
import { appendFileSync } from "fs";
import { promises as fs } from "fs";
import * as path from "path";

const BOOTSTRAP_SKILL_NAME = "using-expert-mode";
const DEBUG_LOG_FILE = "plugin-debug.log";

export const HooksPlugin: Plugin = async ({ client }) => {
  /**
   * 1. PRE-COMPUTED STATE (Performance Optimization)
   * Reading the skill once at startup is significantly faster than
   * reading it during every chat turn.
   */
  const skillPath = path.resolve(
    import.meta.dir,
    "..",
    "skills",
    BOOTSTRAP_SKILL_NAME,
    "SKILL.md",
  );
  let skillContent: string | null = null;

  // Check if local debugging is enabled via environment variable
  const isDebugEnabled =
    process.env.EXPERT_MODE_DEBUG === "1" ||
    process.env.EXPERT_MODE_DEBUG === "true";

  // Optimized internal logger
  const log = (message: string, isError = false) => {
    const timestamp = new Date().toISOString();
    const prefix = isError ? "❌" : "ℹ️";

    // Official structured log (Viewable in TUI/Log files)
    client.app.log({
      service: "ExpertMode",
      level: isError ? "error" : "info",
      message,
    });

    // Local debug file (Guaranteed visibility for you, if enabled)
    if (isDebugEnabled) {
      try {
        appendFileSync(
          DEBUG_LOG_FILE,
          `[${timestamp}] [ExpertMode] ${prefix} ${message}\n`,
        );
      } catch {
        /* Ignore logging errors to prevent plugin crash */
      }
    }
  };

  log("Initializing Expert Mode Plugin...");

  if (isDebugEnabled) {
    log("Local debugging is enabled for Expert Mode Plugin.");
  }

  try {
    skillContent = await fs.readFile(skillPath, "utf-8");
    log(`Skill loaded successfully (${skillContent.length} bytes).`);
  } catch (err) {
    log(`Critical: Failed to read skill at ${skillPath}`, true);
  }

  return {
    /**
     * HOOK: experimental.chat.system.transform
     * This is the standard in 2026.
     * It ensures the instructions are part of the model's core identity
     * on every single message, making it impossible to "forget."
     */
    "experimental.chat.system.transform": async (input, output) => {
      if (!skillContent) return;

      output.system.push(
        `
<EXTREMELY_IMPORTANT>
You are in Expert Mode.
${skillContent}
</EXTREMELY_IMPORTANT>`.trim(),
      );

      // We only log this at DEBUG level in prod, but for you we keep it info
      log(`Injected Expert Mode into system prompt.`);
    },

    /**
     * HOOK: experimental.session.compacting
     * Ensures that even after context compression, the summary explicitly
     * carries over the "Expert Mode" state.
     */
    "experimental.session.compacting": async (input, output) => {
      log("Injecting persistence flag into compaction summary.");
      output.context.push("The agent is operating in Expert Mode.");
    },

    /**
     * EVENT: session.created
     * Standard lifecycle logging.
     */
    event: async ({ event }) => {
      if (event.type === "session.created") {
        log(`Session activated: ${event.session?.id} (${event.session?.slug})`);
      }
    },
  };
};
