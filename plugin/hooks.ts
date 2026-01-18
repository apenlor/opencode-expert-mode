import { type Plugin } from "@opencode-ai/plugin";
import { promises as fs } from "fs";
import * as path from "path";

// Defines the name of the skill to be loaded at startup.
const BOOTSTRAP_SKILL_NAME = "using-expert-mode";

export const HooksPlugin: Plugin = async ({ client }) => {
  // Creates a structured logger for this plugin.
  const log = (level: "info" | "warn" | "error", message: string, extra?: object) => {
    client.app.log({ service: "ExpertModePlugin", level, message, extra });
  };

  log("info", "Expert Mode Hooks Plugin initialized.");

  // This is the full prompt injected when a session is first created.
  const getFullBootstrapPrompt = async (): Promise<string | null> => {
    try {
      const skillPath = path.join(import.meta.dir, "..", "skill", BOOTSTRAP_SKILL_NAME, "SKILL.md");
      const skillContent = await fs.readFile(skillPath, "utf-8");
      return `
<EXTREMELY_IMPORTANT>
You are in Expert Mode.

**IMPORTANT: The ${BOOTSTRAP_SKILL_NAME} skill content is included below. It is ALREADY LOADED. Do NOT use the 'skill' tool to load "${BOOTSTRAP_SKILL_NAME}" again.**

${skillContent}
</EXTREMELY_IMPORTANT>
`.trim();
    } catch (error) {
      log("error", "Failed to read bootstrap skill file.", { error: error instanceof Error ? error.message : String(error) });
      return null;
    }
  };

  // This is a lightweight reminder prompt injected after a session is compacted.
  const getCompactionReminderPrompt = (): string => {
    return `
<COMPACTION_REMINDER>
You are in Expert Mode. Your core instructions from the '${BOOTSTRAP_SKILL_NAME}' skill may have been summarized due to context length, but they are still in full effect. Continue to follow all expert-mode protocols.
</COMPACTION_REMINDER>
`.trim();
  };

  // Helper to silently inject a prompt into a session.
  const injectPrompt = async (sessionID: string, prompt: string) => {
    await client.session.prompt({
      path: { id: sessionID },
      body: {
        // noReply ensures this prompt is injected silently.
        noReply: true,
        parts: [{ type: "text", text: prompt }],
      },
    });
  };

  return {
    // Hook for when a new session is created.
    "session.created": async (session) => {
      const prompt = await getFullBootstrapPrompt();
      if (prompt) {
        try {
          await injectPrompt(session.id, prompt);
          log("info", `Injected full bootstrap prompt for session ${session.id}.`);
        } catch (error) {
          log("error", "Failed to inject full bootstrap prompt.", { error: error instanceof Error ? error.message : String(error), sessionId: session.id });
        }
      }
    },

    // Hook for when a session's context is compacted.
    "session.compacted": async (session) => {
      const prompt = getCompactionReminderPrompt();
      try {
        await injectPrompt(session.id, prompt);
        log("info", `Injected compaction reminder for session ${session.id}.`);
      } catch (error) {
        log("error", "Failed to inject compaction reminder.", { error: error instanceof Error ? error.message : String(error), sessionId: session.id });
      }
    },
  };
};
