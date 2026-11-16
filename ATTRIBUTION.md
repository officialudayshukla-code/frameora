# Attribution

Frameora is a rebranded distribution of an existing open-source project. The
design, layout, components, animations, playground, registry architecture and
site structure are the work of the original authors, not of Frameora.

## Original project

- **UI Beats** — <https://github.com/nikhils4/ui-beats>
- Live site: <https://uibeats.com>
- Author: Nikhil Singh — <https://nikhils4.vercel.app>
- License: MIT

## What Frameora changed

Only branding and identity: the name, logo, favicon, wordmark, page metadata,
Open Graph and social metadata, README, public-facing copy and the deployment
target. The MIT copyright notice in [LICENSE.md](LICENSE.md) is unchanged.

## What Frameora did not create

- The component library and every component in it
- The page layouts, navigation, animations and visual design
- The playground, registry and CLI integration
- Any third-party dependency listed in `package.json`

Third-party dependencies retain their own licenses and notices.

## External identifiers kept as-is

Some upstream identifiers are functional rather than cosmetic and were kept so
that existing install commands and agent integrations keep working:

- the npm package `@uibeats/mcp` and the `UIBEATS_URL` environment variable
- the shadcn registry name `ui-beats` and the MCP server name `com.uibeats/mcp`
- the `claude mcp add uibeats` command
- the `ui-beats` package name in `package.json` (it matches the workspace entry
  in `yarn.lock`)

Blog posts keep their original bylines.
