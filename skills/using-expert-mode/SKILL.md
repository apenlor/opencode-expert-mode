---
name: using-expert-mode
description: Use when starting substantive work to choose the right workflow skill without adding unnecessary ceremony to trivial interactions
compatibility: opencode
license: MIT
---

# Using Expert Mode

## Purpose
Choose the smallest correct workflow for the user's request. Use skills to structure substantive work, not to add ceremony to trivial interactions.

## Core Rule
Before substantive work, follow this flow:

1. Identify whether the request starts a workflow
2. Load the most relevant skill
3. Follow that skill until you reach a natural handoff or completion point

For trivial interactions, respond directly.

## What Counts as Substantive Work
Load a skill before:
- planning or design work
- implementing a feature or refactor
- debugging a bug or failing test
- reviewing completed work
- using external libraries, frameworks, or APIs where current docs matter

Usually respond directly for:
- short acknowledgements
- one-off clarification questions
- simple factual answers that do not begin a workflow

## Skill Selection
- `brainstorming`: explore a design before implementation
- `writing-plans`: turn approved requirements into an implementation plan
- `executing-plans`: carry out an existing plan task by task
- `systematic-debugging`: investigate bugs or failing tests root-cause-first
- `test-driven-development`: implement behavior starting from a failing test
- `completing-work`: verify status before claiming success
- `context7-mcp`: fetch current official documentation

Load only what you need now. If the task changes shape, load the next relevant skill at that point.

## Stop Conditions
- If requirements are still unclear, ask the clarifying question before loading more skills
- If a workflow is already in progress, do not reload the same skill just to continue normal execution
- If invoking a skill would add no value, do not do it

## Red Flags
- Loading a skill just to ask a one-line clarification
- Re-invoking the same skill every turn
- Treating skills as ritual rather than guidance
- Starting implementation, debugging, or review work without selecting a workflow
