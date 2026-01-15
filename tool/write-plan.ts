import { tool } from "@opencode-ai/plugin";
import { promises as fs } from "fs";
import * as path from "path";

export default tool({
  description: "Create detailed implementation plan with bite-sized tasks",
  args: {},
  async execute() {
    const filePath = path.join(import.meta.dir, "..", "commands", "write-plan.md");
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  },
});
