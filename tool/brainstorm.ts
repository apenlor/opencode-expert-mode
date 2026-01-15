import { tool } from "@opencode-ai/plugin";
import { promises as fs } from "fs";
import * as path from "path";

export default tool({
  description: "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores requirements and design before implementation.",
  args: {},
  async execute() {
    const filePath = path.join(import.meta.dir, "..", "commands", "brainstorm.md");
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  },
});
