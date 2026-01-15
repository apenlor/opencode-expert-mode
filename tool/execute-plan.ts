import { tool } from "@opencode-ai/plugin";
import { promises as fs } from "fs";
import * as path from "path";

export default tool({
  description: "Execute plan in batches with review checkpoints",
  args: {},
  async execute() {
    const filePath = path.join(import.meta.dir, "..", "commands", "execute-plan.md");
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  },
});
