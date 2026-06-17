# MCP Tools Used

> Concept — tooling leveraged during development. Synthesized from `.mcp.json`, `CLAUDE.md`, `slides/pitch.md`

## MCP Servers Configured

From `.mcp.json` in the project root:

### Filesystem Server
- **Purpose**: Read/write access to project files
- **Usage**: Read `CLAUDE.md` and `llm-wiki.md` as knowledge sources; write source files (`index.html`, `style.css`, `main.js`, `vercel.json`, `README.md`)
- **Context**: Every agent needed filesystem access to read the schema and write their deliverables

### Fetch Server
- **Purpose**: HTTP requests to external resources
- **Usage**: Load the **UI UX Pro Max Skill** from its remote source
- **Context**: The skill is described as a Claude Code plugin — fetch loaded it into the agent's context

### UI UX Pro Max Skill (Plugin)
- **Purpose**: Design system guidance — tokens, spacing rules, typography, component patterns
- **Usage**: Applied to every UI decision: color palette (`#0f0f0f`, `#1a1a2e`), font choices (Inter, JetBrains Mono), spacing, button design, animation style
- **Output**: The Lofi / Minimal / Calm aesthetic visible in the final product
- **Context**: Specified in `CLAUDE.md` as "already loaded" — no additional fetching needed beyond the initial skill load

## MCP in the Build Process

From `slides/pitch.md` (slide 4):
> **MCP:** filesystem (read CLAUDE.md + llm-wiki.md) · fetch (load UI UX Pro Max Skill)

The MCP layer provided:
1. **Knowledge source access** — reading `CLAUDE.md` and `llm-wiki.md` as persistent instructions
2. **Design system injection** — loading and applying the UI UX Pro Max Skill's design tokens
3. **File output** — writing the deliverables to disk

## Relationship to llm-wiki.md

The `llm-wiki.md` methodology (see [[source-llm-wiki]]) describes a pattern where the LLM reads raw sources and builds a structured wiki. MCP tools were the mechanism by which the LLM:
- Read the raw sources (filesystem MCP)
- Could have written the wiki (filesystem MCP)
- Loaded external guidance (fetch MCP → UI UX Pro Max Skill)

The current wiki build (this directory) follows the same pattern — the LLM reads source files via filesystem MCP and writes synthesized wiki pages.

## Related Pages
- [[agent-workflow]] — how agents used these tools in the build sequence
- [[design-decisions]] — UI decisions influenced by the UI UX Pro Max Skill
- [[source-CLAUDE-md]] — specifies which MCP tools to use and how
- [[source-llm-wiki]] — the methodology that the MCP workflow implements
