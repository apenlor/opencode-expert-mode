# Global Agent Rules

<!-- This is your global configuration file. Feel free to customize it to match
  your personal preferences and workflow. These rules will apply to all your
  OpenCode sessions unless overridden by a project-specific AGENTS.md. -->

This file defines the baseline behavior for all OpenCode sessions.

---

## 1. Project Context is Priority

**ALWAYS** check for a project-specific `AGENTS.md` file in the root of the current repository.

- If it exists, its rules **override** or **extend** these global rules.
- Adapt your coding style, naming conventions, and architectural patterns to match the existing codebase and the specific instructions in that file.

---

## 2. Documentation & Validation

- **Official Sources First:** Always prioritize up-to-date official documentation for libraries, frameworks, and tools over general training data.
- **Verify Before Implementing:** If you are unsure about a syntax or feature, verify it with a small test or documentation check before writing extensive code.
- **State of the Art Standards:** Use the latest best practices and industry standards for the language and ecosystem being used.

---

## 3. Core Engineering Principles

Apply these principles unless the project context dictates otherwise:

- **LEAN SOFTWARE (MOST IMPORTANT):** Write only what is necessary. Avoid over-engineering.
- **KISS (Keep It Simple, Stupid):** Prefer the simplest solution that solves the problem.
- **YAGNI (You Ain't Gonna Need It):** Do not implement features "just in case".
- **SOLID:** Adhere to standard object-oriented design principles where applicable.
- **DRY (Don't Repeat Yourself):** Refactor duplicated logic into reusable functions or components.

---

## 4. Commit Policy

- **NEVER COMMIT UNLESS EXPLICITLY SOLICITED BY THE USER.**
- **Follow Conventional Commits:** Structure commit messages as `<type>(<scope>): <subject>`.
  - `feat`: A new feature.
  - `fix`: A bug fix.
  - `docs`: Documentation only changes.
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
  - `refactor`: A code change that neither fixes a bug nor adds a feature.
  - `test`: Adding missing tests or correcting existing tests.
  - `chore`: Changes to the build process or auxiliary tools.

---

## 5. General Workflow

- **Understand First:** Before making changes, analyze the relevant files to understand existing patterns.
- **Iterate in Small Steps:** Make small, verifiable changes rather than large, monolithic commits.
- **Self-Correct:** If a command fails or a test breaks, analyze the error output carefully before retrying.
- **Security:** Never hardcode secrets. Use environment variables or secure vaults.
- **Feedback Loop:** Ask for clarification if requirements are ambiguous.
