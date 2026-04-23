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
- Review critically — raise concerns before starting
- Create a todowrite list from the plan's tasks when todo support is available; otherwise track progress explicitly in chat

### 2. Execute Tasks
For each task:
1. Mark as `in_progress`
2. Follow the plan's steps exactly
3. Run verifications as specified in the plan
4. Use `completing-work` skill before marking done
5. Mark as `completed`

### 3. When to Use Subagents
Use `@implementer` only when a task is:
- Large enough to benefit from fresh context (50+ lines of changes, or reading 5+ unfamiliar files)
- Independent (no shared state with your current session)
- Risky enough to warrant isolated execution with self-review

For simple or sequential tasks, execute directly. Most tasks should be direct.

### 4. Review Gates
Invoke `@code-reviewer` when the diff becomes risky enough to benefit from a fresh review, especially after:
- a risky refactor
- a security-sensitive change
- a public API or interface change
- a large cross-file diff
- completion of a coherent subsystem
- before a commit or PR workflow

### 5. Completion
After all tasks are done:
- Run the full test suite
- Use `completing-work` to verify status and optionally suggest commit messaging if the user asked for it
- Report: "Plan complete. All tasks implemented and verified."

## When to Stop

**Stop immediately when:**
- A blocker prevents progress (missing dependency, unclear instruction)
- Verification fails repeatedly
- You don't understand a task

Ask for clarification rather than guessing.

## Fallbacks
- If the plan is incomplete, stop and ask for clarification before improvising major missing sections
- If a task can be completed safely without a subagent, do it directly to preserve momentum
- If verification repeatedly fails, stop the plan flow and switch to `systematic-debugging`

## Red Flags

- Skipping plan verification steps
- Guessing when a task is unclear
- Using subagents for every task (overkill for most work)
- Proceeding past a failing verification
