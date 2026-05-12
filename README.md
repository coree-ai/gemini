# Coree Gemini Extension

[Coree](https://github.com/coree-ai/coree) provides persistent memory and code intelligence for AI agents. This extension integrates Coree into the Gemini CLI.

## Features

- **Persistent Memory**: Stores decisions, architectural discoveries, and gotchas across sessions.
- **Code Intelligence**: Hybrid search over source code and git history.
- **Session Injection**: Automatically injects relevant context into your session using lifecycle hooks.

## Installation

```bash
gemini extension install github:coree-ai/gemini
```

## Usage

Once installed, Coree provides several MCP tools. You can ask Gemini to search your codebase or memories:

```
search for how the indexing works
```

See [GEMINI.md](./GEMINI.md) for more detailed usage guidelines.
