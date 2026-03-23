---
name: executing-plans
description: Use when you have a written implementation plan to execute - direct execution by default, subagents for complex tasks
license: MIT
compatibility: opencode
---

# Executing Plans

## Overview
Read the plan. Execute tasks one by one. Verify after each. Report progress.

**Core principle:** Direct execution by default. Use subagents only when task complexity warrants isolation.

## When to Use
Use when you have a written implementation plan (from `writing-plans` or provided by the user) and are ready to implement it.

## The Process

### 1. Load Plan
- Read the plan from chat context or ask the user to provide it
- Review critically - raise concerns before starting
- Create a todowrite list from the plan's tasks

### 2. Execute Tasks
For each task:
1. Mark as `in_progress`
2. Follow the plan's steps exactly
3. Run verifications as specified in the plan
4. Use `completing-work` skill before marking done
5. Mark as `completed`

### 3. When to Use Subagents
Use `@implementer` only when a task is:
- Complex enough to benefit from fresh context
- Independent (won't need information from your current session)
- Risky enough to warrant isolated execution with self-review

For simple or sequential tasks, execute directly. Most tasks should be direct.

### 4. Review Gates
After significant milestones (every 3-5 tasks, or after a major component), optionally invoke `@code-reviewer` with the git diff range to catch issues before they compound.

### 5. Completion
After all tasks are done:
- Run the full test suite
- Use `completing-work` to verify and propose a final commit (or squash)
- Report: "Plan complete. All tasks implemented and verified."

## When to Stop

**STOP executing immediately when:**
- A blocker prevents progress (missing dependency, unclear instruction)
- Verification fails repeatedly
- You don't understand a task

Ask for clarification rather than guessing.

## Red Flags

**Never:**
- Skip the plan's verification steps
- Guess when a task is unclear
- Use subagents for every task (overkill for most work)
- Proceed past a failing verification

**Always:**
- Follow plan steps exactly
- Verify after each task
- Track progress with todowrite
- Stop and ask when blocked
