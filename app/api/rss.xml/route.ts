import { generateRssFeed } from "@/lib/rss";
import { NextResponse } from "next/server";

// The feed is generated from local content, so it can be prerendered. Required
// by `output: "export"`, where every route handler has to be static.
export const dynamic = "force-static";

export async function GET() {
  const feed = await generateRssFeed();
  return new NextResponse(feed.rss2(), {
    headers: { "Content-Type": "application/xml" },
  });
}
