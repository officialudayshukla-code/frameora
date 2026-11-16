/**
 * The six component categories, as a path-matching alternation.
 *
 * `getting-started` is deliberately excluded: those five pages have no markdown
 * twin (`app/md/[category]/[component]` generates params from the registry
 * only), so matching them would advertise an alternate that 404s and
 * content-negotiate onto a dead route. `tests/seo.test.ts` fails if this drifts
 * from the registry's real categories.
 */
const COMPONENT_CATEGORIES =
  "animation|background|block|button|card|component|text";

/**
 * The canonical origin, and the `www.` variant that must fold into it.
 *
 * Both hosts served a full 200 for every page, so the site existed twice as far
 * as a crawler was concerned. The canonical tags already pointed at the apex,
 * but a canonical is a hint a search engine may ignore and a 301 is a fact it
 * cannot. Derived rather than hardcoded so a preview deployment does not
 * redirect itself at production.
 *
 * `WWW_HOST` is null when the configured origin is already a `www.` host or a
 * bare hostname with no apex to fold into, which drops the rule entirely
 * instead of emitting one that would loop.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://officialudayshukla-code.github.io/frameora";

const SITE_HOST = new URL(SITE_URL).host;
const WWW_HOST = SITE_HOST.startsWith("www.") ? null : `www.${SITE_HOST}`;

/**
 * GitHub Pages only serves static files, and a project site lives under
 * `/<repo>`. Both are opt-in at build time — `NEXT_OUTPUT=export yarn build` —
 * so a host that can run Next (Vercel, Node) keeps the headers, rewrites and
 * redirects below, and the export build drops them instead of failing.
 */
const STATIC_EXPORT = process.env.NEXT_OUTPUT === "export";
const BASE_PATH = STATIC_EXPORT
  ? new URL(SITE_URL).pathname.replace(/\/$/, "")
  : "";

/*
 * `next/image` does not apply `basePath` to a string `src`, so the two logo
 * files in `public/` go through `assetPath()` and the value has to reach the
 * bundle. Publishing it as a `NEXT_PUBLIC_` variable here keeps it derived from
 * `BASE_PATH` instead of being computed a second time, and leaves local `dev`
 * at the root where it is actually served.
 */
process.env.NEXT_PUBLIC_BASE_PATH = BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The project site on GitHub Pages is served from `/<repo>`, so every link
  // and asset has to be prefixed. `trailingSlash` turns each route into a
  // directory with an `index.html`, which is what Pages resolves.
  ...(BASE_PATH ? { basePath: BASE_PATH, trailingSlash: true } : {}),
  ...(STATIC_EXPORT
    ? { output: "export", images: { unoptimized: true } }
    : { images: { formats: ["image/avif", "image/webp"] } }),
  // The docs pages read component source off disk at build time, so keep the
  // MDX/registry content out of the client bundle trace.
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  // `headers`, `rewrites` and `redirects` do not exist in a static export;
  // passing them through is a build error, so they are dropped there rather
  // than rewritten.
  headers: STATIC_EXPORT
    ? undefined
    : async () => {
        return [
          {
            source: "/:path*",
            headers: [
              { key: "X-Content-Type-Options", value: "nosniff" },
              {
                key: "Referrer-Policy",
                value: "strict-origin-when-cross-origin",
              },
              { key: "X-Frame-Options", value: "SAMEORIGIN" },
              {
                key: "Permissions-Policy",
                value: "camera=(), microphone=(), geolocation=()",
              },
            ],
          },
          {
            source: "/r/:path*.json",
            headers: [
              { key: "Access-Control-Allow-Origin", value: "*" },
              {
                key: "Cache-Control",
                value: "public, max-age=0, s-maxage=3600",
              },
            ],
          },
          {
            /*
             * Point agents at the markdown twin of a component page.
             *
             * An agent that fetches the HTML gets told, in the response itself,
             * that a clean markdown version exists, without having to know the
             * `.md` convention or spend a second request finding out.
             *
             * A relative URI so this stays correct on localhost and preview
             * deployments, where an absolute one would send agents to production.
             */
            source: `/docs/:category(${COMPONENT_CATEGORIES})/:component`,
            headers: [
              {
                key: "Link",
                value:
                  '</docs/:category/:component.md>; rel="alternate"; type="text/markdown"',
              },
            ],
          },
          {
            // Agents discover the MCP server here rather than from the README.
            source: "/.well-known/mcp.json",
            headers: [
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Content-Type", value: "application/json; charset=utf-8" },
              {
                key: "Cache-Control",
                value: "public, max-age=0, s-maxage=3600",
              },
            ],
          },
        ];
      },
  rewrites: STATIC_EXPORT
    ? undefined
    : async () => {
        /*
         * No `Accept: text/markdown` negotiation here, deliberately.
         *
         * Serving markdown from the HTML URL needs `Vary: Accept` so a cache keeps
         * the two representations apart. Next owns the `Vary` header on page routes
         * and overwrites it with its own RSC list, verified via both `headers()`
         * and a `proxy.ts`, neither of which survives. Negotiating without that
         * guard risks a shared CDN entry handing markdown to a human visitor, so
         * the `Link: rel="alternate"` header above advertises the markdown twin
         * instead, which needs no cache guarantees.
         */
        return [
          // Agent-facing markdown. `/docs/card/flip-card.md` cannot be a route
          // segment of its own (`[component]/page.tsx` already occupies that
          // level) so the extension is matched here and mapped onto the handler
          // at `app/md/[category]/[component]/route.ts`.
          {
            source: "/docs/:category/:component.md",
            destination: "/md/:category/:component",
          },
        ];
      },
  redirects: STATIC_EXPORT
    ? undefined
    : async () => {
        return [
          // The RSS feed used to emit /blog/<slug> while the route was /blogs/<slug>,
          // so every link in the feed 404'd. Feed URLs are fixed at the source; this
          // keeps any already-syndicated links working.
          {
            source: "/blog/:slug",
            destination: "/blogs/:slug",
            permanent: true,
          },
          { source: "/blog", destination: "/blogs", permanent: true },
          /*
           * Fold `www.` into the apex, permanently.
           *
           * Matching on `has: [{ type: "host" }]` rather than in a proxy keeps this
           * at the CDN edge, where a redirect costs nothing to serve. The
           * destination is absolute because a relative one would keep the request
           * on `www.` and loop.
           */
          ...(WWW_HOST
            ? [
                {
                  source: "/:path*",
                  has: [{ type: "host", value: WWW_HOST }],
                  destination: `https://${SITE_HOST}/:path*`,
                  permanent: true,
                },
              ]
            : []),
        ];
      },
};

export default nextConfig;
