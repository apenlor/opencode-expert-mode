---
name: writing-skills
description: Use when creating new skills, editing existing skills, or verifying skills work before deployment
compatibility: opencode
license: MIT
---

# Writing Skills

## Overview
Writing skills is **Test-Driven Development (TDD) applied to process documentation**. You write pressure scenarios, watch agents fail (RED), write the skill (GREEN), and close loopholes (REFACTOR).

**Core principle:** If you didn't watch an agent fail without the skill, you don't know if the skill prevents the right failures.

**REQUIRED BACKGROUND:** Use `test-driven-development` (RED-GREEN-REFACTOR cycle).

## When to Use
Use this skill when creating or modifying any expert workflow. It ensures that the documentation is effective, unambiguous, and resistant to agent rationalization.

## The Process (RED-GREEN-REFACTOR)

### 1. RED: Baseline Testing
- **Create pressure scenarios**: Combine 3+ pressures (time, sunk cost, authority, exhaustion).
- **Run WITHOUT skill**: Document exact agent choices and rationalizations verbatim.
- **Identify patterns**: Note which excuses appear repeatedly.

### 2. GREEN: Write Minimal Skill
- **Address failures**: Write just enough content to prevent the specific failures observed in RED.
- **Run WITH skill**: Verify the agent now complies under the same pressure.

### 3. REFACTOR: Close Loopholes
- **Capture new excuses**: If the agent still finds ways to bypass rules, document the new rationalizations.
- **Add explicit counters**: Update the skill with specific negations (e.g., "No exceptions for X").
- **Re-verify**: Test until the skill is bulletproof.

## SKILL.md Structure
- **Frontmatter**: `name` (hyphenated) and `description` (third-person, "Use when...", no workflow summary).
- **H1 Title**: The skill name.
- **Overview**: Core principle in 1-2 sentences.
- **When to Use**: Symptoms and triggering conditions.
- **Core Pattern**: Before/after code or clear steps.
- **Checklist/Reference**: For scanning common operations.

## Token Efficiency Rules
- **Concise is key**: Assume the agent is smart. Only add context it doesn't have.
- **Word counts**: Aim for <200 words for frequently loaded skills, <500 for others.
- **Cross-reference**: Use `**REQUIRED SUB-SKILL:** [name]` instead of repeating details.
- **Diagrams**: Use flowcharts ONLY for non-obvious decision points. Prefer text lists.

## The Iron Law
`NO SKILL WITHOUT A FAILING TEST FIRST`
This applies to NEW skills and EDITS. If you skip RED, delete and start over.

## Skill Creation Checklist
- [ ] Pressure scenarios created (3+ pressures).
- [ ] Baseline run WITHOUT skill documented verbatim.
- [ ] YAML frontmatter follows ASO rules (no workflow summary).
- [ ] Clear overview and "When to Use" triggers.
- [ ] Loopholes closed with explicit negations.
- [ ] One excellent, runnable example.
- [ ] Verified GREEN under maximum pressure.
- [ ] Common mistakes section included.

## Supporting Tools
- **Visualizing**: Use `skills/writing-skills/graphviz-conventions.dot` for style rules.
- **Rendering**: Use `skills/writing-skills/render-graphs.js` to render flowcharts to SVG.
- **Best Practices**: See `skills/writing-skills/skill-authoring-best-practices-prompt.md` for deep-dive patterns.
