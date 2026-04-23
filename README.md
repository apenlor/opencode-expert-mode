[![Codacy Badge](https://app.codacy.com/project/badge/Grade/228a9a530e5f4f7fafd9cad5e66d2413)](https://app.codacy.com/gh/apenlor/opencode-expert-mode/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Latest Tag](https://img.shields.io/github/v/tag/apenlor/opencode-expert-mode)](https://github.com/apenlor/opencode-expert-mode/releases/latest)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# OpenCode Expert Mode

This repository provides an advanced agent configuration for OpenCode, designed to create a powerful and reliable software engineering assistant.

## Table of Contents
- [Global Installation](#global-installation)
- [Verify Installation](#verify-installation)
- [Basic Workflow](#basic-workflow)
- [Core Philosophy](#core-philosophy)
- [Components](#components)
  - [Agents](#agents)
  - [Skills](#skills)
  - [Commands](#commands)
  - [Rules](#rules)
- [Directory Structure](#directory-structure)

## Global Installation

This configuration is intended to be installed globally by cloning it directly into your OpenCode configuration directory. This makes the tools and skills available across all your projects.

### Prerequisites
- [OpenCode CLI](https://opencode.ai) installed and available in your PATH.

### 1. Back Up Your Existing Configuration
**IMPORTANT**: This will prevent you from overwriting any custom setups you may have.
```bash
mv ~/.config/opencode ~/.config/opencode.bak
```

### 2. Clone the Repository
Clone this repository directly into the `~/.config/opencode` directory.
```bash
git clone git@github.com:apenlor/opencode-expert-mode.git ~/.config/opencode
```

### 3. Set Up Your Local Configuration
This repository provides different example configuration files. Choose the one that best fits your environment and copy it to `opencode.json`.

```bash
cd ~/.config/opencode
# Choose one of the following:
# cp opencode.geminicli.example.json opencode.json   # For Google Gemini
# cp opencode.github.example.json opencode.json    # For GitHub Copilot
cp opencode.hybrid.example.json opencode.json     # For mixed-provider setups

# Also copy the agents configuration template
cp AGENTS.example.md AGENTS.md
```
You can now safely customize `opencode.json` and `AGENTS.md` without creating conflicts with future updates from this repository.

## Verify Installation

To ensure the configuration is correctly loaded:

1.  **Start a new OpenCode session:**
    ```bash
    opencode
    ```
2.  **Ask the agent about its mode:**
    > What mode are you in?

    It should confirm that it is in "Expert Mode." This verifies the rules are loading correctly.

3.  **Test a Command:** Ask the agent to plan a simple task using a command.
    ```
    /write-plan "create a hello world script in python"
    ```
4.  **Confirm Behavior:** The agent should respond with a structured implementation plan. This verifies that the commands and skills are working together correctly.

## Basic Workflow

This configuration enables a structured, expert-guided development lifecycle using the provided commands.

**Note:** While these commands are convenient shortcuts, the skills are the true core of this configuration. They are designed to be used by *any* agent, enhancing its ability to reason and execute tasks effectively, regardless of how it's invoked.

1.  **Design (`/brainstorm`):** Start by exploring an idea to solidify requirements.
    ```
    /brainstorm "a web server that returns the current time"
    ```
2.  **Plan (`/write-plan`):** Generate a detailed, step-by-step implementation plan in the chat.
    ```
    /write-plan "a simple python flask server with one endpoint /time"
    ```
3.  **Execute (`/execute-plan`):** Instruct the agent to begin implementing the plan from the chat context.
    ```
    /execute-plan
    ```
4.  **Debug (`/debug`):** Instruct the agent to begin debugging some feature or change.
    ```
    /debug "failing login test after auth refactor"
    ```
5.  **Review (`/review`):** Instruct the agent to review the code for a specific feature or change by using the `code-reviewer` subagent.
    ```
    /review "flask server implementation"
    ```
6.  **Review (`@code-reviewer`):** After work is complete, call the specialized code reviewer for feedback.
    ```
    @code-reviewer Please review the flask server implementation.
    ```

## Core Philosophy

The central idea of Expert Mode is a **"Skill-as-Core"** architecture.

-   **Skills (`skills/`)**: The heart of the project. They contain expert workflows that enhance any agent's ability to perform complex tasks.
-   **Commands (`commands/`)**: A user-facing "control panel" that provides convenient shortcuts to directly invoke specific skills.
-   **The Agent**: The agent is empowered by this ecosystem. Whether responding to a general prompt or a specific command, it can use its available skills and subagents to access these expert workflows when needed.

## Components

This configuration is composed of several key components that work together.

### Agents
- **`code-reviewer`**: A subagent for in-depth code and spec-compliance reviews. Invoke with `@code-reviewer`.
- **`implementer`**: Implements a single, well-defined task from a plan.

### Skills
A collection of expert workflows in the `skills/` directory:
- **`brainstorming`**: A structured process for exploring ideas and refining them into concrete designs (presented in-chat).
- **`completing-work`**: Verifies work is done and proposes a commit message before marking tasks complete.
- **`context7-mcp`**: Fetches up-to-date library and framework documentation via the Context7 MCP tool.
- **`executing-plans`**: A systematic way to execute implementation plans.
- **`systematic-debugging`**: A disciplined process for identifying and resolving bugs root-cause-first.
- **`test-driven-development`**: A guide for writing tests before implementation code.
- **`using-expert-mode`**: Establishes how to find and use skills (this is the core skill loaded on session start).
- **`writing-plans`**: Creates detailed, bite-sized implementation plans (presented in-chat).

### Commands
User-facing shortcuts in the `commands/` directory that invoke skills.
- **`/brainstorm`**: Kicks off the `brainstorming` skill.
- **`/write-plan`**: Starts the `writing-plans` skill.
- **`/execute-plan`**: Begins the `executing-plans` skill.
- **`/debug`**: Starts the `systematic-debugging` skill.
- **`/review`**: Runs an isolated review using the `code-reviewer` agent.

### Rules
Always-active instruction files in the `rules/` directory provide constant guidance to the agent.

- **`expert-mode.md`**: Establishes the Expert Mode identity, requiring explicit workflow guidance for substantive work.
- **`context7.md`**: Nudges the agent to use Context7 for up-to-date library and framework documentation when external APIs or frameworks matter.

## Directory Structure

This repository's root is designed to be your OpenCode configuration directory.
```
.
├── AGENTS.example.md                  # A template for your local agent rules.
├── agents/                            # Definitions for specialized subagents (e.g., code-reviewer).
├── commands/                          # User-facing slash commands that invoke skills.
├── opencode.geminicli.example.json    # Gemini-only provider config example.
├── opencode.github.example.json       # GitHub Copilot provider config example.
├── opencode.hybrid.example.json       # Mixed provider config example (e.g., Gemini + GitHub Copilot).
├── rules/                             # Always-active instruction files (e.g., Expert Mode, Context7).
├── skills/                            # The core skills that define expert workflows.
└── tui.json                           # TUI-specific settings.
```
