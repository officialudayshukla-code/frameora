/**
 * Single source of truth for anything that used to be a hardcoded URL string.
 *
 * The old code spelled the origin six different ways: the apex in the
 * canonicals but `www.` in the sitemap, which split ranking signals between
 * two hosts. Everything now derives from `siteConfig.url`.
 */
export const siteConfig = {
  name: "Frameora",
  title: "Frameora · Animated React components you own",
  description:
    "Beautifully designed, animated React components built with React, TypeScript, Tailwind CSS and Motion. Copy, paste, or install with the shadcn CLI.",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://officialudayshukla-code.github.io/frameora"
  ).replace(/\/$/, ""),
  /*
   * The generated root card (`app/opengraph-image.tsx`), not a file in
   * `public/`. This is the inherited fallback for routes with no
   * `opengraph-image` of their own, and it used to be a checked-in PNG that
   * nobody re-exported when the wordmark changed, so the fallback drifted
   * off-brand while every generated card stayed current. Pointing at the
   * route means there is one definition of the card and no binary to keep in
   * sync. The hashless URL is stable; Next only adds `?<hash>` for caching.
   */
  ogImage: "/opengraph-image",
  author: {
    name: "Frameora",
    url: "https://github.com/officialudayshukla-code",
  },
  links: {
    github: "https://github.com/officialudayshukla-code/frameora",
    issues: "https://github.com/officialudayshukla-code/frameora/issues",
    newIssue:
      "https://github.com/officialudayshukla-code/frameora/issues/new?template=bug_report.md",
    newFeature:
      "https://github.com/officialudayshukla-code/frameora/issues/new?template=feature_request.md",
  },
  /*
   * Opt-in: an empty id means no analytics script is rendered.
   *
   * The inherited default was the original project's Google Analytics
   * property, which would have reported Frameora's traffic to somebody else.
   * Set `NEXT_PUBLIC_GA_ID` to a property you own to switch it back on.
   */
  analyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;

export type SiteConfig = typeof siteConfig;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Prefix a file in `public/` with the site's base path.
 *
 * GitHub Pages serves a project site from `/<repo>`, and `next/image` does not
 * apply `basePath` to a string `src` — only `next/link` and `_next/` assets get
 * it automatically — so the logo files are the one place the prefix has to be
 * added by hand. `next.config.mjs` publishes the value as
 * `NEXT_PUBLIC_BASE_PATH`, derived from the same constant it passes to Next, so
 * `yarn dev` stays at the root and an export build gets `/frameora`.
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
