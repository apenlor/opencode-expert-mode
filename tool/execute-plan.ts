import { tool } from "@opencode-ai/plugin";

export default tool({
  description: "Execute plan in batches with review checkpoints",
  args: {},
  async execute() {
    return "Use the skill executing-plans";
  },
});
