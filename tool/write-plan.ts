import { tool } from "@opencode-ai/plugin";

export default tool({
  description: "Create detailed implementation plan with bite-sized tasks",
  args: {},
  async execute() {
    return "Use the skill writing-plans";
  },
});
