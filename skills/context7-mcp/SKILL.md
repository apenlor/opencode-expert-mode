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
