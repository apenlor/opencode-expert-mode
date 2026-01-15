import { type Plugin } from "@opencode-ai/plugin";
import { promises as fs } from "fs";
import * as path from "path";

export const HooksPlugin: Plugin = async ({ client }) => {
  return {
    "session.created": async (session) => {
      try {
        const skillPath = path.join(
          import.meta.dir,
          "..",
          "skill",
          "using-expert-mode",
          "SKILL.md"
        );
        const skillContent = await fs.readFile(skillPath, "utf-8");

        const context = `<EXTREMELY_IMPORTANT>
You are in Expert Mode.

**IMPORTANT: The using-expert-mode skill content is included below. It is ALREADY LOADED - you are currently following it. Do NOT use the use_skill tool to load "using-expert-mode" - that would be redundant. Use use_skill only for OTHER skills.**

${skillContent}
</EXTREMELY_IMPORTANT>`;

        await client.session.prompt({
          path: { id: session.id },
          body: {
            noReply: true,
            parts: [{ type: "text", text: context }],
          },
        });
      } catch (error) {
        console.error("Error in HooksPlugin:", error);
      }
    },
  };
};
