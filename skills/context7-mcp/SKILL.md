---
name: context7-mcp
description: Fetch current library and framework documentation from Context7 instead of relying on training data
license: MIT
compatibility: opencode
---

# Context7 Documentation Lookup

## Overview
Use Context7 MCP to fetch current, accurate documentation for any library, framework, or API. Always prefer this over training data for code generation, setup questions, and API references.

## The Process
1. **Resolve:** Call `resolve-library-id` with the library name and the user's question.
2. **Select:** Pick the best match — prefer exact names, higher benchmark scores, and version-specific IDs when a version is mentioned.
3. **Fetch:** Call `query-docs` with the selected library ID and the user's question.
4. **Answer:** Use the fetched docs — include code examples and cite the version.

## Guidelines
- Pass the user's full question as the query for better relevance
- When users mention versions (e.g., "Next.js 15"), use version-specific library IDs
- Prefer official/primary packages over community forks

## When Not to Use
- Purely repo-local questions that do not depend on external APIs
- Cases where the user explicitly wants a best-effort answer without documentation lookup

## Fallbacks
- If the library cannot be resolved confidently, ask the user to confirm the library rather than guessing
- If multiple results are plausible, present the best match and say why it was chosen
- If Context7 is unavailable, state that clearly and fall back to official docs already available in context or clearly labeled best-effort knowledge
- If the task depends on runtime behavior you still cannot verify, say what remains uncertain
