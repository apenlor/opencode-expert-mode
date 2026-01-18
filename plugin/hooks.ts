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

  return {
    // This hook runs automatically every time a new session is created.
    "session.created": async (session) => {
      try {
        const skillPath = path.join(
          import.meta.dir,
          "..",
          "skill",
          BOOTSTRAP_SKILL_NAME,
          "SKILL.md"
        );

        const skillContent = await fs.readFile(skillPath, "utf-8");

        // This system prompt is silently injected into the agent's context at the start of the session.
        const systemPrompt = `
<EXTREMELY_IMPORTANT>
You are in Expert Mode.

**IMPORTANT: The ${BOOTSTRAP_SKILL_NAME} skill content is included below. It is ALREADY LOADED. Do NOT use the 'skill' tool to load "${BOOTSTRAP_SKILL_NAME}" again.**

${skillContent}
</EXTREMELY_IMPORTANT>
`.trim();

        await client.session.prompt({
          path: { id: session.id },
          body: {
            // noReply ensures this prompt is injected silently without requiring a response from the agent.
            noReply: true,
            parts: [{ type: "text", text: systemPrompt }],
          },
        });

        log("info", `Injected ${BOOTSTRAP_SKILL_NAME} skill for session ${session.id}.`);

      } catch (error) {
        // Logs any errors that occur during the skill injection process.
        log("error", "Failed to inject bootstrap skill.", {
          error: error instanceof Error ? error.message : String(error),
          sessionId: session.id,
        });
      }
    },
  };
};
