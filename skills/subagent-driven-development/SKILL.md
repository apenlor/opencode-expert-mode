---
name: subagent-driven-development
description: Use when executing implementation plans with independent tasks in the current session
license: MIT
compatibility: opencode
metadata:
  workflow: sdd
  phase: execution
---

# Subagent-Driven Development

Execute plan by dispatching fresh subagent per task, with two-stage review after each: spec compliance review first, then code quality review.

**Core principle:** Fresh subagent per task + two-stage review (spec then quality) = high quality, fast iteration

## When to Use

Use this skill if you answer "yes" to all of the following:
- Do you have a written implementation plan?
- Are the tasks in the plan mostly independent?
- Do you want to execute the plan in the current session?

If you prefer a parallel session, use the `executing-plans` skill instead.

**vs. Executing Plans (parallel session):**
- Same session (no context switch)
- Fresh subagent per task (no context pollution)
- Two-stage review after each task: spec compliance first, then code quality
- Faster iteration (no human-in-loop between tasks)

## The Process

1.  **Setup**: Read the plan, extract all tasks, and create a `todowrite` list.
2.  **Per Task Loop**:
    a. **Implement**: Invoke `@implementer` with the task description and context. Answer any questions it has. The implementer will write code, test, commit, and self-review.
    b. **Spec Review**: Invoke `@spec-reviewer` to ensure the implementation matches the spec. If not, the implementer fixes the gaps and you re-run this review.
    c. **Quality Review**: Once spec-compliant, invoke `@code-quality-reviewer`. If issues are found, the implementer fixes them and you re-run this review.
    d. **Complete**: Once both reviews pass, mark the task complete.
3.  **Loop**: Repeat step 2 until all tasks are done.
4.  **Finalize**: Invoke a final `@code_reviewer` for a holistic review, then use `finishing-a-development-branch` to complete the work.

## How to Invoke Subagents

To dispatch a subagent, you will use the `@<agent-name>` syntax. The general workflow for each dispatch is:
1.  **Read the appropriate prompt template** from the list below using the `read` tool.
2.  **Construct the full prompt** by replacing the placeholders in the template with the required information (task description, context, SHAs, etc.).
3.  **Invoke the agent** by creating a message that starts with the agent's name (e.g., `@implementer`) followed by the fully constructed prompt.

## Prompt Templates

-   `skills/subagent-driven-development/implementer-prompt.md` - The prompt for the `@implementer` agent.
-   `skills/subagent-driven-development/spec-reviewer-prompt.md` - The prompt for the `@spec-reviewer` agent.
-   `skills/subagent-driven-development/code-quality-reviewer-prompt.md` - The prompt for the `@code-quality-reviewer` agent.

## Example Workflow

```
You: I'm using Subagent-Driven Development to execute this plan.

[Read plan file once, extract tasks, create todowrite]

---
**Task 1: Hook installation script**
---

You:
@implementer
[Construct and provide the full prompt for the implementer]

---
Implementer: [Asks clarifying questions, then implements, tests, and commits]
---

You:
@spec-reviewer
[Construct and provide the full prompt for the spec reviewer]

---
Spec reviewer: ✅ Spec compliant.
---

You:
@code-quality-reviewer
[Construct and provide the full prompt for the code quality reviewer]

---
Code reviewer: ✅ Approved.
---

[Mark Task 1 complete and move to Task 2]
```

## Advantages

- **Quality**: Fresh context per task and two-stage reviews catch issues early.
- **Efficiency**: Continuous, in-session progress with no context switching. Subagents get complete information upfront.
- **Cost**: More invocations, but cheaper than debugging later.

## Red Flags

**Never:**
- Skip spec or quality reviews.
- Proceed with unfixed issues.
- Dispatch multiple implementation subagents in parallel.
- Make a subagent read the plan file (provide full text instead).
- Start code quality review before spec compliance is ✅.

**If a reviewer finds issues:** The implementer fixes them, and you **must** re-run the review until it passes.

## Integration

- **Upstream**: `writing-plans` creates the plan this skill executes.
- **Downstream**: `finishing-a-development-branch` completes the work.
- **Subagents Use**: `test-driven-development`.
- **Alternative**: `executing-plans` for parallel session execution.
