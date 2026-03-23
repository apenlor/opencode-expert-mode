---
name: completing-work
description: Use when about to claim work is complete or before committing - enforces verification and proposes a commit
license: MIT
compatibility: opencode
---

# Completing Work

## Overview
Evidence before claims. Verify before committing. This skill enforces a simple gate: run the verification, read the output, then propose a commit.

**Core principle:** No completion claims without fresh verification evidence.

## When to Use
Use before making ANY claim of success, completion, or readiness. This includes finishing a task, proposing a commit, or moving to the next item in a plan.

## The Gate

```
BEFORE claiming completion:

1. IDENTIFY what command proves the claim (test suite, build, linter)
2. RUN the full command
3. READ the output - check exit code, count failures
4. If PASS: propose a commit with message and changed files
5. If FAIL: state actual status with evidence, fix first
```

## Propose, Don't Execute

After verification passes, propose the commit in your response text:

```
Verification passed (42 tests, 0 failures).

Suggested commit:
  git add <files>
  git commit -m "feat: add user validation endpoint"
```

Let the user decide whether to commit. Do not run `git commit` automatically.

## Red Flags

- Using "should pass", "probably works", "looks correct"
- Expressing satisfaction before running verification
- Trusting a subagent's success report without checking
- Relying on a previous run instead of a fresh one
- Thinking "just this once" about skipping verification

## Common Failures

| Claim | Requires | Not Sufficient |
|-------|----------|----------------|
| Tests pass | Fresh test output: 0 failures | Previous run, assumption |
| Build succeeds | Build command: exit 0 | Linter passing |
| Bug fixed | Reproduce original symptom: passes | "Code changed" |
| Requirements met | Line-by-line checklist | "Tests pass" |
