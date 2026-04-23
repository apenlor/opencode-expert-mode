---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior — find root cause before proposing any fix
compatibility: opencode
license: MIT
---

# Systematic Debugging

## Overview
Random fixes waste time and mask underlying issues. **Core principle:** Find root cause before attempting any fix. Symptom fixes are failure.

## The Iron Law
```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

## When to Use
Use for ANY technical issue. **Especially** when under time pressure, when you've already tried multiple fixes, or when you don't fully understand the issue.

## The Four Phases

Complete each phase before proceeding.

### Phase 1: Root Cause Investigation
1. Read the exact error, symptom, and reproduction steps
2. Reproduce consistently
3. Check recent diffs, dependencies, and config changes
4. Trace the failing boundary and the data flow backward

### Phase 2: Pattern Analysis
1. Find a working comparison point
2. Compare working versus broken behavior directly
3. List the concrete differences

### Phase 3: Hypothesis and Testing
1. State one hypothesis
2. Make the smallest possible test or observation to validate it
3. If the hypothesis fails, discard it and form a new one

### Phase 4: Fix and Verify
1. Create the smallest failing reproduction you can
2. Implement one fix for the root cause
3. Verify the original symptom is gone and regressions are absent
4. If multiple fix attempts fail, stop and question the architecture

## Red Flags — Return to Phase 1
- "Quick fix for now"
- Adding multiple changes at once
- Proposing solutions before tracing data flow
- Each fix reveals a new problem elsewhere
- Skipping test creation

## Stop Conditions
- If you cannot reproduce the issue, do not claim a fix
- If you are stacking multiple speculative changes, return to Phase 1
- If three fix attempts fail, stop and reassess the architecture with the user

## Fallbacks
- If the environment does not let you run the failing path, gather the strongest available evidence and say what remains unverified
- If no automated test exists, create the smallest reproducible check you can
- For extended techniques and examples, read `skills/systematic-debugging/reference.md` only when needed

## Related Skills
- **test-driven-development** — for creating the failing test in Phase 4
- **completing-work** — verify fix worked before claiming success
