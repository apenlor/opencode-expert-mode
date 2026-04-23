---
name: brainstorming
description: Explore ideas and create designs before implementation
license: MIT
compatibility: opencode
metadata:
  category: "design-and-planning"
  audience: "user-facing"
---

# Brainstorming Ideas Into Designs

## Overview
Turn ideas into fully formed designs through collaborative dialogue. Understand the project context, ask clarifying questions, explore approaches, and present a validated design before any implementation begins.

## When to Use
Use before starting any creative or significant work: new features, building components, adding functionality, or modifying existing behavior.

## The Process

**1. Understand the idea:**
- Check the current project state (files, docs, recent commits)
- Ask questions one at a time, preferring multiple-choice where possible
- Focus on purpose, constraints, and success criteria

**2. Explore approaches:**
- Propose 2–3 different approaches with trade-offs
- Lead with a recommendation and explain the reasoning

**3. Present the design:**
- Present in small sections (200–300 words each)
- Ask for feedback after each section
- Cover: architecture, components, data flow, error handling, testing strategy
- **Present the design in the chat. Do not create files.**

## After the Design

- Present the final validated design in the chat
- Ask: "Ready to create an implementation plan?"
- If yes, use the `writing-plans` skill

## Stop Conditions
- If the user already wants implementation instead of design exploration, switch to `writing-plans` or direct execution as appropriate
- If key requirements are unknown, ask the minimum clarifying question before proposing approaches
- If the codebase or context is missing, state what is missing and ask for it instead of inventing details

## Fallbacks
- If there is not enough context for a full design, produce only the assumptions, options, and questions that can be justified
- If the user wants a quick recommendation rather than a full design session, provide a concise recommended approach with trade-offs

## Key Principles
- **One question at a time** — avoid overwhelming
- **Multiple choice preferred** — make answering easier
- **YAGNI ruthlessly** — challenge any feature that doesn't seem necessary
- **Explore alternatives** — always propose and evaluate several approaches
- **Incremental validation** — confirm each part of the design together
- **Revisit earlier decisions** — when new information changes the picture, go back
