import { type Plugin } from "@opencode-ai/plugin";

export const HooksPlugin: Plugin = async ({ client }) => {
  return {
    /**
     * HOOK: experimental.chat.system.transform
     * Injects the Expert Mode identity into the system prompt on every turn,
     * making it impossible for the agent to "forget" its operating mode.
     */
    "experimental.chat.system.transform": async (_input, output) => {
      output.system.push(
        `<EXTREMELY_IMPORTANT>
You are in Expert Mode.
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill tool to load it before proceeding.
</EXTREMELY_IMPORTANT>`.trim(),
      );
    },

    /**
     * HOOK: experimental.session.compacting
     * Ensures Expert Mode state persists across context compactions.
     */
    "experimental.session.compacting": async (_input, output) => {
      output.context.push("The agent is operating in Expert Mode.");
    },
  };
};
