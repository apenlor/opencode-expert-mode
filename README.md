# OpenCode Expert Mode

This repository provides an advanced agent configuration for OpenCode, designed to create a powerful and reliable software engineering assistant. It is a native OpenCode adaptation of the original [Superpowers for Claude](https://github.com/obra/superpowers) project by @obra.

## Table of Contents
- [Global Installation](#global-installation)
- [Verify Installation](#verify-installation)
- [Basic Workflow](#basic-workflow)
- [Core Philosophy](#core-philosophy)
- [Components](#components)
- [Directory Structure](#directory-structure)
- [How It Works: The Bootstrap Process](#how-it-works-the-bootstrap-process)

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
This repository provides example configuration files. Copy them to create your own local, untracked configuration.
```bash
cd ~/.config/opencode
cp opencode.example.json opencode.json
cp AGENTS.example.md AGENTS.md
```
You can now safely customize `opencode.json` and `AGENTS.md` without creating conflicts with future updates from this repository.

## Verify Installation

To ensure the configuration is correctly loaded:

1.  **Start a new OpenCode session:**
    ```bash
    opencode
    ```
2.  **Check for the Bootstrap Message:** At the start of the session, the agent receives a hidden system prompt from the plugin, putting it into "Expert Mode."
3.  **Test a Command:** Ask the agent to plan a simple task using a command.
    ```
    /write-plan "create a hello world script in python"
    ```
4.  **Confirm Behavior:** The agent should respond by confirming it is using the `writing-plans` skill to create the plan. This verifies that the commands, skills, and plugin are all working together correctly.

## Basic Workflow

This configuration enables a structured, expert-guided development lifecycle using the provided commands.

1.  **Design (`/brainstorm`):** Start by exploring an idea to solidify requirements.
    ```
    /brainstorm "a web server that returns the current time"
    ```
2.  **Plan (`/write-plan`):** Generate a detailed, step-by-step implementation plan.
    ```
    /write-plan "a simple python flask server with one endpoint /time"
    ```
3.  **Execute (`/execute-plan`):** Instruct the agent to begin implementing the generated plan.
    ```
    /execute-plan
    ```
4.  **Review (`@code-reviewer`):** After work is complete, call the specialized code reviewer for feedback.
    ```
    @code-reviewer Please review the flask server implementation.
    ```

**Note:** While these commands provide convenient shortcuts, the skills themselves enhance *all* agents. You can still use the built-in `plan` and `build` agents for any task, and they will automatically leverage these expert skills when appropriate.

## Core Philosophy

The central idea of Expert Mode is a **"Skill-as-Core"** architecture.

-   **Skills (`skill/`)**: The heart of the project. They contain expert workflows that enhance any agent's ability to perform complex tasks.
-   **Commands (`commands/`)**: A user-facing "control panel" that provides convenient shortcuts to directly invoke specific skills.
-   **The Agent**: The agent is empowered by this ecosystem. Whether responding to a general prompt or a specific command, it can use its `skill` tool to access these expert workflows at any time.

## Components

This configuration is composed of several key components that work together.

### Agents
- **`code-reviewer`**: A subagent designed for detailed code reviews. Invoke with `@code-reviewer`.

### Skills
A collection of expert workflows in the `skill/` directory. Key skills include:
- **`brainstorming`**: A structured process for exploring ideas and refining them into concrete designs.
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
- **`writing-plans`**: A TDD-centric approach to creating detailed, bite-sized implementation plans.
- **`writing-skills`**: For creating, editing, and verifying new skills.

### Commands
User-facing shortcuts in the `commands/` directory that invoke skills.
- **`/brainstorm`**: Kicks off the `brainstorming` skill.
- **`/write-plan`**: Starts the `writing-plans` skill.
- **`/execute-plan`**: Begins the `executing-plans` skill.

### Plugins (Hooks)
A plugin in `plugins/hooks.ts` that automatically bootstraps every session into Expert Mode.
- **`session.created`**: Injects the `using-expert-mode` skill at the start.
- **`session.compacted`**: Injects a short reminder after context is summarized to ensure the agent's identity persists.

## Directory Structure

This repository's root is designed to be your OpenCode configuration directory.
```
.
├── AGENTS.example.md   # A template for your local agent rules.
├── agent/              # Definitions for specialized subagents (e.g., code-reviewer).
├── commands/           # User-facing slash commands that invoke skills.
├── opencode.example.json # An example configuration for user-specific settings (e.g., models).
├── plugins/             # OpenCode plugins that extend core behavior (e.g., session hooks).
└── skill/              # The core skills that define expert workflows.
```

## How It Works: The Bootstrap Process

A plugin (`plugins/hooks.ts`) automatically bootstraps every new session into Expert Mode.
1.  **On `session.created`**: The plugin injects the `using-expert-mode` skill into the agent's context.
2.  **On `session.compacted`**: If a conversation gets too long, the plugin injects a short reminder prompt.
