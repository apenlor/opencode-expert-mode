# OpenCode Superpowers Configuration

This repository contains a native OpenCode configuration migrated from the original "Superpowers" Claude plugin. It provides a suite of expert-level agents, skills, and tools designed to streamline and enhance your development workflow within the OpenCode environment.

The primary purpose of this configuration is to leverage the full potential of OpenCode by providing structured, repeatable, and expert-driven processes for common software engineering tasks such as brainstorming, planning, implementation, and debugging.

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
git clone https://github.com/your-username/opencode-superpowers.git ~/.config/opencode
```

### 3. Set Up Your Local Configuration

This repository provides example configuration files. Copy them to create your own local, untracked configuration.

```bash
cd ~/.config/opencode
cp opencode.example.json opencode.json
cp AGENTS.example.md AGENTS.md
```

You can now safely customize `opencode.json` and `AGENTS.md` without creating conflicts with future updates from this repository (which you can get by running `git pull`).

## Components

This configuration is composed of several key components that work together to provide an enhanced development experience.

### Agents

-   **`code-reviewer`**: A subagent designed to perform detailed code reviews. It checks for alignment with project plans, code quality, architectural principles, and documentation standards.
    -   **Usage:** Invoke with `@code-reviewer` in your prompt.
    -   **Guiding Principles**:
        -   **Plan Alignment**: Verifies that the implementation adheres to the original plan and requirements.
        -   **Code Quality**: Assesses code for best practices, error handling, and maintainability.
        -   **Architectural Integrity**: Ensures the code follows established design patterns and SOLID principles.
        -   **Constructive Feedback**: Provides clear, actionable recommendations categorized by severity.

### Skills

A collection of expert workflows for various development tasks, located in the `skill` directory. These skills guide the AI through complex processes, ensuring consistency and high-quality output.

-   **`brainstorming`**: A structured process for exploring ideas and refining them into concrete designs.
-   **`dispatching-parallel-agents`**: For tackling multiple independent tasks at once.
-   **`executing-plans`**: A systematic way to execute implementation plans with review checkpoints.
-   **`finishing-a-development-branch`**: For guiding the completion and integration of development work.
-   **`receiving-code-review`**: For processing and implementing feedback from a code review.
-   **`requesting-code-review`**: For verifying work meets requirements before merging.
-   **`subagent-driven-development`**: For executing implementation plans with independent tasks.
-   **`systematic-debugging`**: A disciplined process for identifying and resolving bugs.
-   **`test-driven-development`**: A guide for writing tests before implementation code.
-   **`using-git-worktrees`**: For creating isolated git worktrees for feature work.
-   **`using-superpowers`**: Establishes how to find and use skills (this is the core skill loaded on session start).
-   **`verification-before-completion`**: For running verification checks before claiming work is complete.
-   **`writing-plans`**: A TDD-centric approach to creating detailed, bite-sized implementation plans.
-   **`writing-skills`**: For creating, editing, and verifying new skills.

### Tools

Custom tools are defined in the `tool` directory to integrate seamlessly with the skills. These tools act as entry points to the expert workflows defined in the skills.

-   **`brainstorm`**: Kicks off the brainstorming process by invoking the `brainstorming` skill.
-   **`write-plan`**: Starts the planning process by invoking the `writing-plans` skill.
-   **`execute-plan`**: Begins the implementation process by invoking the `executing-plans` skill.

#### How to Use the Tools

The tools are designed to be invoked directly by you in the OpenCode prompt. They function as commands that you can run to initiate a specific workflow. For example, to start a brainstorming session, you would type:

```
/brainstorm
```

The AI will then load the corresponding skill and guide you through the process. The AI will not use these top-level tools on its own; they are your entry points into the "superpowers" workflows.

### Hooks (Plugins)

A session-start hook is implemented as a plugin in `plugin/hooks.ts`.

-   **`session.created`**: This hook fires when a new session is created. It injects the `using-superpowers` skill into the initial context, providing the AI with the necessary instructions on how to use all the available skills.

### Rules

-   **`AGENTS.md`**: A global rules file. You can add your own personal, global rules here.
