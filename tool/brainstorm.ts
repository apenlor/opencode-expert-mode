import { tool } from "@opencode-ai/plugin";

export default tool({
  description: "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores requirements and design before implementation.",
  args: {},
  async execute() {
    return "Use the skill brainstorming";
  },
});
