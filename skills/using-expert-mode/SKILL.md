---
name: using-expert-mode
description: Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions
compatibility: opencode
license: MIT
---

# Using Expert Mode

## Overview
This skill establishes the core protocol for finding and using expert workflows. It ensures that the agent always operates with the highest level of discipline and consistency.

## When to Use
**Invoke this skill at the start of every session.** It is mandatory and non-negotiable.

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. This is not optional. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## How to Access Skills

**In OpenCode:** Use the native `skill` tool. When you invoke a skill, its content is loaded and presented to you—follow it directly. Never use the `read` tool on skill files.

# Using Skills

## The Rule

**Invoke relevant skills BEFORE any response or action.** The flow is simple: **Check for skills -> Invoke Skill -> Follow Skill**.

## Red Flags

These thoughts mean STOP—you're rationalizing: "This is just a simple question", "I need more context first", "Let me explore the codebase first", "I can check git/files quickly", "Let me gather information first", "This doesn't need a formal skill", "I remember this skill", "This doesn't count as a task", "The skill is overkill", "I'll just do this one thing first", "This feels productive", "I know what that means".

## Skill Priority

Process skills first (brainstorming, debugging), then implementation skills.

## Skill Types

**Rigid** (TDD, debugging): Follow exactly. **Flexible** (patterns): Adapt to context.

## User Instructions

Instructions say WHAT, not HOW. "Add X" or "Fix Y" doesn't mean skip workflows.
