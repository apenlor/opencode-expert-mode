---
name: completing-work
description: Use when about to claim work is complete or before committing - enforces verification and proposes a commit
license: MIT
compatibility: opencode
---

# Completing Work

## Overview
Evidence before claims. Verify before committing. Run the verification, read the output, then propose a commit.

**Core principle:** No completion claims without fresh verification evidence.

## When to Use
Before making ANY claim of success, completion, or readiness — including finishing a task, proposing a commit, or moving to the next plan item.

## The Gate

1. **Identify** what command proves the claim (test suite, build, linter)
2. **Run** the full command fresh — do not rely on a previous run
3. **Read** the output — check exit code, count failures
4. **If PASS:** propose a commit with message and changed files
5. **If FAIL:** state the actual status with evidence, fix first

## Propose, Don't Execute

After verification passes, propose the commit in your response:

```
Verification passed (42 tests, 0 failures).

Suggested commit:
  git add <files>
  git commit -m "feat: add user validation endpoint"
```

Let the user decide whether to commit. Do not run `git commit` automatically.

## Red Flags

These all mean: stop, run verification first.

- Using "should pass", "probably works", "looks correct"
- Expressing satisfaction before running verification
- Trusting a subagent's success report without checking
- Relying on a previous run instead of a fresh one
- Thinking "just this once" about skipping

| Claim | Requires | Not Sufficient |
|-------|----------|----------------|
| Tests pass | Fresh output: 0 failures | Previous run, assumption |
| Build succeeds | Build command: exit 0 | Linter passing |
| Bug fixed | Original symptom now passes | "Code changed" |
| Requirements met | Line-by-line checklist | "Tests pass" |
