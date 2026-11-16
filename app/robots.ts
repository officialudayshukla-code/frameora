import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Required by `output: "export"`: metadata routes must be static.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
