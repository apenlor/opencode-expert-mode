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
- **Is the complexity high enough to warrant isolation?** (For simple/linear tasks, execute directly instead).

If you prefer a parallel session, use the `executing-plans` skill instead.

**vs. Executing Plans (parallel session):**
- Same session (no context switch)
- Fresh subagent per task (no context pollution)
- Two-stage review after each task: spec compliance first, then code quality
- Faster iteration (no human-in-loop between tasks)

## The Process

1.  **Setup**: Read the plan from chat context, extract all tasks, and create a `todowrite` list.
2.  **Per Task Loop**:
    a. **Implement**: Invoke `@implementer` with the task description and context. Answer any questions it has. The implementer will write code, test, suggest a commit, and self-review.
    b. **Spec Review**: Invoke `@spec-reviewer` to ensure the implementation matches the spec. If not, the implementer fixes the gaps and you re-run this review.
    c. **Quality Review**: Once spec-compliant, invoke `@code-reviewer` with the quality review prompt. If issues are found, the implementer fixes them and you re-run this review.
    d. **Complete**: Once both reviews pass, mark the task complete.
3.  **Loop**: Repeat step 2 until all tasks are done.
4.  **Finalize**: Invoke a final `@code-reviewer` for a holistic review (optional for simple/low-risk changes), then use `finishing-a-development-branch` to complete the work.

## How to Invoke Subagents

To dispatch a subagent, you will use the `@<agent-name>` syntax. The general workflow for each dispatch is:
1.  **Use the appropriate prompt template** embedded below.
2.  **Construct the full prompt** by replacing the placeholders in the template with the required information (task description, context, SHAs, etc.).
3.  **Invoke the agent** by creating a message that starts with the agent's name (e.g., `@implementer`) followed by the fully constructed prompt.

## Prompt Templates

### Implementer Prompt (`@implementer`)
```markdown
You are implementing Task N: [task name]

## Task Description
[FULL TEXT of task from plan - paste it here, don't make subagent read file]

## Context
[Scene-setting: where this fits, dependencies, architectural context]

## Execution Directives
- **Work Directory:** [directory]
- **Instructions:** Follow your internal TDD and Self-Review protocols strictly.
```

### Spec Reviewer Prompt (`@spec-reviewer`)
```markdown
You are reviewing whether an implementation matches its specification.

## The Requirements (The Truth)
[FULL TEXT of task requirements]

## The Implementer's Claims (The Hearsay)
[From implementer's report]

## Instructions
Verify the claims against the code. Apply your **Distrust Protocol** immediately.
```

### Code Quality Reviewer Prompt (`@code-reviewer`)
```markdown
You are reviewing code changes for quality, maintainability, and production readiness.

**Note:** Spec compliance has already been verified by a separate agent. Your focus is strictly on **how** the code is built, not **what** it does.

## The Implementation (The Hearsay)
[From implementer's report]

## The Task (The Goal)
[Task summary or full text]

## Git Range
**Base:** [commit before task]
**Head:** [current commit]

## Instructions
1. Review the changes using git diff:
```bash
git diff --stat [BASE_SHA]..[HEAD_SHA]
git diff [BASE_SHA]..[HEAD_SHA]
```
2. Check code quality, architecture, and testing using the checklist below.
3. Categorize issues by severity (Critical/Important/Minor).
4. Provide a clear assessment (Approved: Yes/No/With fixes).

## Review Checklist

**Code Quality:**
- Clean separation of concerns?
- Proper error handling?
- Type safety (if applicable)?
- DRY principle followed?
- Edge cases handled?

**Architecture:**
- Sound design decisions?
- Scalability considerations?
- Performance implications?
- Security concerns?

**Testing:**
- Tests actually test logic (not mocks)?
- Edge cases covered?
- Integration tests where needed?
- All tests passing?

## Output Format

### Strengths
[What's well done? Be specific.]

### Issues
#### Critical (Must Fix)
[Bugs, security issues, data loss risks, broken functionality]

#### Important (Should Fix)
[Architecture problems, poor error handling, test gaps]

#### Minor (Nice to Have)
[Code style, optimization opportunities, documentation improvements]

**For each issue:**
- File:line reference
- What's wrong
- Why it matters
- How to fix (if not obvious)

### Recommendations
[Improvements for code quality, architecture, or process]

### Assessment
**Approved?** [Yes/No/With fixes]
**Reasoning:** [Technical assessment in 1-2 sentences]
```

## Example Workflow

```
You: I'm using Subagent-Driven Development to execute this plan.

[Read plan from chat context, extract tasks, create todowrite]

---
**Task 1: Hook installation script**
---

You:
@implementer
[Construct and provide the full prompt for the implementer]

---
Implementer: [Asks clarifying questions, then implements, tests, and suggests a commit]
---

You:
@spec-reviewer
[Construct and provide the full prompt for the spec reviewer]

---
Spec reviewer: ✅ Spec compliant.
---

You:
@code-reviewer
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
- Make a subagent read the plan from context (provide full text instead).
- Start code quality review before spec compliance is ✅.

**If a reviewer finds issues:** The implementer fixes them, and you **must** re-run the review until it passes.

## Integration

- **Upstream**: `writing-plans` creates the plan this skill executes.
- **Downstream**: `finishing-a-development-branch` completes the work.
- **Subagents Use**: `test-driven-development`.
- **Alternative**: `executing-plans` for parallel session execution.
