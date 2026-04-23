# Changelog

All notable changes to this project will be documented in this file.

The format is loosely inspired by Keep a Changelog and organized by tagged releases.

## [2.1.0] - 2026-04-23

### Changed
- Refined Expert Mode orchestration so skills are required for substantive work, while trivial acknowledgements and short clarifications can be handled directly.
- Updated the core workflow skills to include clearer stop conditions and fallback guidance.
- Reworked planning and execution guidance to avoid embedding executable commit steps by default.
- Shifted review checkpoints from fixed cadence to risk-based triggers.
- Tightened subagent behavior and permissions, especially for `code-reviewer` and `implementer`.
- Refreshed the example provider configs to better reflect current GitHub Copilot, GPT-5.4, GPT-5.3-Codex, and Gemini usage patterns.
- Updated the README to better explain normal usage, optional shortcuts, and the current command set.

### Added
- Added `/debug` as a first-class shortcut for the `systematic-debugging` workflow.
- Added `/review` as a shortcut for isolated review using `code-reviewer`.
- Added auxiliary reference material for large skills:
  - `skills/systematic-debugging/reference.md`
  - `skills/test-driven-development/examples.md`

## [2.0.0] - 2026-03-26

### Changed
- Simplified and leaned out the Expert Mode configuration.
- Optimized skills, agents, and rules for better clarity and lower token overhead.
- Migrated Expert Mode behavior from plugin-driven setup toward rule-based setup.
- Standardized the Gemini 3.1 Pro example configuration instead of relying on the customtools variant.
- Updated configuration examples to better align with OpenCode best practices and newer provider/model behavior.
- Improved planning-oriented configuration and agent behavior.

### Added
- Added Context7 support for up-to-date library and framework documentation lookup.

### Fixed
- Improved templates and supporting configuration around the rule-based Expert Mode setup.

## [1.0.1] - 2026-01-30

### Added
- Added support for multiple example `opencode` configurations.
- Added support for GitHub Copilot-based configuration examples.
- Added MCP example configuration.
- Added title, summary, and compaction model examples.
- Added mixed-provider example support for GitHub Copilot and Gemini.

### Changed
- Refined the code review workflow and reviewer skill.
- Reduced token usage in Expert Mode injection and systematic debugging.
- Removed the write-plan-to-disk behavior.
- Changed commit strategy from execution to suggestion.
- Migrated example configs toward Gemini 3 models.
- Relaxed constraints to make subagent-driven and holistic validation workflows more practical.
- Simplified agent usage and definitions.
- Continued standardization and cleanup across skills and links.
- Updated README and documentation to reflect the expanding configuration options.

## [1.0.0] - 2026-01-20

### Added
- Initial OpenCode Expert Mode release.
- Core Expert Mode skills and agents.
- OpenCode tools and configuration scaffolding.
- Structured workflows for planning, execution, debugging, review, and test-driven development.
- Brainstorming and subagent-driven development support.
- Reviewer and implementer agent improvements.
- Plugin, compaction, and configuration support for OpenCode workflows.
- Initial README, documentation, badges, and onboarding guidance.

### Changed
- Migrated from older Gemini setup toward Gemini Flash preview usage.
- Migrated tool-oriented workflows toward command-based workflows.
- Standardized and optimized several skills, especially around debugging and planning.
- Cleaned up project structure, plugin paths, and naming consistency.

### Fixed
- Fixed plugin folder and skills folder naming issues.
- Fixed task tool usage issues in earlier workflow definitions.
- Disabled inappropriate execute-plan behavior for the planning agent.
