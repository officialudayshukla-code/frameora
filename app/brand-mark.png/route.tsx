import { brandWordmarkImage } from "@/lib/brand-image";

/**
 * The logo at a stable URL, for consumers that cannot read an inline image or
 * a hashed Next icon route: the RSS channel avatar and the `publisher.logo` in
 * blog JSON-LD.
 *
 * A route handler rather than a file in `public/` so the mark has exactly one
 * definition. 512px wide because feed readers and search-result logos both
 * scale down from something larger, and Google's structured-data guidance
 * wants a logo at least 112px on its shortest side.
 */
export const dynamic = "force-static";

export function GET() {
  return brandWordmarkImage(512);
}
