[![Codacy Badge](https://app.codacy.com/project/badge/Grade/228a9a530e5f4f7fafd9cad5e66d2413)](https://app.codacy.com/gh/apenlor/opencode-expert-mode/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Latest Tag](https://img.shields.io/github/v/tag/apenlor/opencode-expert-mode)](https://github.com/apenlor/opencode-expert-mode/releases/latest)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# OpenCode Expert Mode

This repository provides an advanced agent configuration for OpenCode, designed to create a powerful and reliable software engineering assistant. It is a native OpenCode adaptation of the original [Superpowers for Claude](https://github.com/obra/superpowers) project by @obra.

## Table of Contents
- [Global Installation](#global-installation)
- [Verify Installation](#verify-installation)
- [Development](#development)
- [Basic Workflow](#basic-workflow)
- [Core Philosophy](#core-philosophy)
- [Components](#components)
  - [Agents](#agents)
  - [Skills](#skills)
  - [Commands](#commands)
  - [Plugins](#plugins)
- [Directory Structure](#directory-structure)

## Global Installation

This configuration is intended to be installed globally by cloning it directly into your OpenCode configuration directory. This makes the tools and skills available across all your projects.

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
This repository provides different example configuration files. Copy one of them to create your own local, untracked configuration.
```bash
cd ~/.config/opencode
cp opencode.geminicli.example.json opencode.json
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

    It should confirm that it is in "Expert Mode." This verifies the plugin is loading the core skill.

3.  **Test a Command:** Ask the agent to plan a simple task using a command.
    ```
    /write-plan "create a hello world script in python"
    ```
4.  **Confirm Behavior:** The agent should respond by confirming it is using the `writing-plans` skill to create the plan. This verifies that the commands and skills are working together correctly.

## Development

### Debugging the Plugin
The core plugin (`plugins/expert-mode-plugin.ts`) includes a detailed logging mechanism for development. By default, these logs are sent to the main OpenCode log files.

To get a dedicated, clean log file in the project root, you can enable a special debug mode by setting an environment variable before launching OpenCode:

```bash
export EXPERT_MODE_DEBUG=1
opencode
```

When enabled, a `plugin-debug.log` file will be created in the root folder where you're executing opencode. This file contains detailed logs from the Expert Mode plugin only, making it much easier to trace its behavior during development.

## Basic Workflow

This configuration enables a structured, expert-guided development lifecycle using the provided commands.

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
4.  **Review (`@code-reviewer`):** After work is complete, call the specialized code reviewer for feedback.
    ```
    @code-reviewer Please review the flask server implementation.
    ```

**Note:** While these commands are convenient shortcuts, the skills are the true core of this configuration. They are designed to be used by *any* agent, enhancing its ability to reason and execute tasks effectively, regardless of how it's invoked.

## Core Philosophy

The central idea of Expert Mode is a **"Skill-as-Core"** architecture.

-   **Skills (`skills/`)**: The heart of the project. They contain expert workflows that enhance any agent's ability to perform complex tasks.
-   **Commands (`commands/`)**: A user-facing "control panel" that provides convenient shortcuts to directly invoke specific skills.
-   **The Agent**: The agent is empowered by this ecosystem. Whether responding to a general prompt or a specific command, it can use its `skill` tool to access these expert workflows at any time.

## Components

This configuration is composed of several key components that work together.

### Agents
- **`code-reviewer`**: A subagent designed for in-deep code reviews. Invoke with `@code-reviewer`.
- **`spec-reviewer`**: Reviews an implementation against a specification.
- **`code-quality-reviewer`**: A lighter `code-reviewer` version, with focus on quality & maintainability. Used by the subagent driven development.
- **`implementer`**: Implements a single, well-defined task from a plan.

### Skills
A collection of expert workflows in the `skills/` directory. Key skills include:
- **`brainstorming`**: A structured process for exploring ideas and refining them into concrete designs (presented in-chat).
- **`dispatching-parallel-agents`**: For tackling multiple independent tasks at once.
- **`executing-plans`**: A systematic way to execute implementation plans with review checkpoints.
- **`finishing-a-development-branch`**: For guiding the completion and integration of development work.
- **`receiving-code-review`**: For processing and implementing feedback from a code review.
- **`requesting-code-review`**: For verifying work meets requirements before merging.
- **`subagent-driven-development`**: For executing implementation plans with independent tasks.
- **`systematic-debugging`**: A disciplined process for identifying and resolving bugs.
- **`test-driven-development`**: A guide for writing tests before implementation code.
- **`using-git-worktrees`**: For creating isolated git worktrees for feature work.
- **`using-expert-mode`**: Establishes how to find and use skills (this is the core skill loaded on session start).
- **`verification-before-completion`**: For running verification checks before claiming work is complete.
- **`writing-plans`**: A TDD-centric approach to creating detailed, bite-sized implementation plans (presented in-chat).
- **`writing-skills`**: For creating, editing, and verifying new skills.

### Commands
User-facing shortcuts in the `commands/` directory that invoke skills.
- **`/brainstorm`**: Kicks off the `brainstorming` skill.
- **`/write-plan`**: Starts the `writing-plans` skill.
- **`/execute-plan`**: Begins the `executing-plans` skill.

### Plugins
The plugin in `plugins/expert-mode-plugin.ts` is the entry point that bootstraps the agent into Expert Mode. It uses modern OpenCode hooks to ensure the agent's core identity is always present.

- **`experimental.chat.system.transform`**: On every chat turn, this hook injects the `using-expert-mode` skill directly into the system prompt. This makes the agent's expert identity impossible to forget.
- **`experimental.session.compacting`**: When a long conversation is summarized, this hook adds a flag to the summary, ensuring the "Expert Mode" state persists across context compactions.

## Directory Structure

This repository's root is designed to be your OpenCode configuration directory.
```
.
├── AGENTS.example.md   # A template for your local agent rules.
├── agents/             # Definitions for specialized subagents (e.g., code-reviewer).
├── commands/           # User-facing slash commands that invoke skills.
├── opencode.example.json # An example configuration for user-specific settings (e.g., models).
├── plugins/             # OpenCode plugins that extend core behavior (e.g., session hooks).
└── skills/              # The core skills that define expert workflows.
```
