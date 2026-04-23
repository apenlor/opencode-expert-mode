---
name: test-driven-development
description: Use when implementing any feature or bugfix, before writing implementation code
license: MIT
compatibility: opencode
metadata:
  category: "development-process"
  workflow: tdd
---

# Test-Driven Development (TDD)

## Overview

Write the test first. Watch it fail. Write minimal code to pass.

**Core principle:** If you didn't watch the test fail, you don't know if it tests the right thing.

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write code before the test? Delete it. Start over. Do not keep it as "reference" — delete means delete.

## Red-Green-Refactor

### 1. RED
- Write one minimal test for one behavior
- Prefer real behavior over mock choreography
- Name the test after the behavior, not the implementation

### 2. Verify RED
- Run the test and watch it fail for the expected reason
- If it passes immediately, the test is not proving the new behavior

### 3. GREEN
- Write the smallest production change that makes the test pass
- Do not add adjacent behavior while the test is still red

### 4. Verify GREEN
- Re-run the focused test
- Re-run the relevant surrounding suite
- Confirm no new warnings or errors were introduced

### 5. REFACTOR
- Clean up only after green
- Improve names, remove duplication, and keep behavior unchanged

## Stop Conditions
- If you cannot write a focused failing test, the design is probably still unclear
- If the test setup is huge, simplify the interface before implementing more code
- If you are tempted to keep pre-written implementation code as a reference, delete it and restart from the test

## Red Flags — Stop and Start Over

| Rationalization | Reality |
|---|---|
| "Too simple to test" | Simple code breaks too. Test takes 30 seconds. |
| "I'll write tests after" | Tests passing immediately prove nothing. |
| "Already manually tested" | Ad-hoc ≠ systematic. You can't re-run it. |
| "Deleting X hours is wasteful" | Sunk cost. Keeping unverified code is technical debt. |
| "TDD will slow me down" | TDD is faster than debugging. |
| "Keep as reference, write tests first" | You'll adapt it. That's testing after. Delete means delete. |

Any of these? Delete code. Start over with TDD.

## Fallbacks
- If the codebase has no meaningful automated tests, say so and explain the nearest viable safety net
- If the task is documentation-only or configuration-only and TDD does not fit, say why and do not force fake tests
- For extended examples and troubleshooting patterns, read `skills/test-driven-development/examples.md` only when needed
