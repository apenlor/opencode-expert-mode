---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code
compatibility: opencode
license: MIT
---

# Writing Plans

## Overview
Write comprehensive implementation plans that give a skilled developer everything they need: which files to touch, what code to write, and how to verify each step. Keep tasks bite-sized, concrete, and easy to execute.

## When to Use
Use before starting any multi-step implementation. Essential for ensuring a structured and verifiable development process.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

**Output:** Present the full plan in the chat using a Markdown code block.

## Bite-Sized Task Granularity

Each step should be small enough to execute and verify cleanly.

Include test steps when the project has a test suite.

## Plan Document Header

Every plan MUST start with this header:

```markdown
# [Feature Name] Implementation Plan

> **For OpenCode:** Use the `executing-plans` skill to implement this plan task-by-task.

**Goal:** [One sentence describing what this builds]

**Architecture:** [2–3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

## Task Structure

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.ts`
- Modify: `exact/path/to/existing.ts:123-145`
- Test: `tests/exact/path/to/test.ts`

**Step 1: [Action]**

[Code or command if needed]

**Step 2: Verify**

Run: `<test command>`
Expected: [what success looks like]

**Step 3: Checkpoint**

Summarize what should now be true before moving to the next task.
```

## Remember
- Exact file paths always
- Complete code in the plan (not "add validation")
- Exact commands with expected output
- DRY and YAGNI

## Commit Policy
- Do not include executable `git commit` steps by default
- If the user explicitly wants commit guidance, provide a suggested commit message as an optional checkpoint note

## Stop Conditions
- If requirements are ambiguous, ask questions before writing the plan
- If a task depends on unknown files or architecture, say what must be inspected first
- If the work is small enough to implement directly, say so instead of inflating the plan

## Fallbacks
- If only partial requirements are known, produce a phased plan with assumptions called out explicitly
- If there is no test suite, replace test commands with the strongest available verification steps

## Execution Handoff

After presenting the plan:

**"Plan complete. You can execute it with `/execute-plan`, or ask me to implement it directly."**
