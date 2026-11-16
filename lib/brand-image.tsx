import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * A raster version of the Frameora wordmark, for the one slot that needs a PNG
 * rather than the inline image used in the site chrome: the stable
 * `/brand-mark.png` route that feed readers and `publisher.logo` in blog
 * JSON-LD point at.
 *
 * The artwork lives in `public/` as the cropped wordmark, so the raster
 * surface and the header are the same picture by construction. The favicon and
 * the apple touch icon are static files in `public/` rather than generated
 * routes: in a static export Next writes their `<link href>` without
 * `basePath`, so on a project site they 404.
 */
const WORDMARK_ASSET = "frameora-wordmark.png";

/** Intrinsic aspect of the cropped wordmark (122 x 28 pixels). */
const WORDMARK_ASPECT = 122 / 28;

const dataUrls = new Map<string, string>();

/** Read a public asset once per process and inline it for Satori. */
function assetDataUrl(asset: string): string {
  const cached = dataUrls.get(asset);
  if (cached) return cached;
  const file = path.join(process.cwd(), "public", asset);
  const url = `data:image/png;base64,${readFileSync(file).toString("base64")}`;
  dataUrls.set(asset, url);
  return url;
}

/** The full wordmark, sized by width so the aspect never distorts. */
export function brandWordmarkImage(
  width: number,
  { background }: { background?: string } = {},
): ImageResponse {
  const height = Math.round(width / WORDMARK_ASPECT);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...(background ? { background } : {}),
      }}
    >
      <img
        src={assetDataUrl(WORDMARK_ASSET)}
        alt=""
        width={width}
        height={height}
        style={{ width, height }}
      />
    </div>,
    { width, height },
  );
}
