import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Sidebar call-to-action.
 *
 * Was a client component whose only interactivity was a `window.open` inside
 * an `onClick`, plus a `<style jsx global>` block redefining a keyframe that
 * already exists in the theme. It is a link behind a hairline now.
 */
export function ShowcaseCard() {
  return (
    <div className="border bg-card p-5">
      <h3 className="font-display text-sm font-semibold tracking-tight">
        Built something?
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        We&apos;d love to feature what you made with Frameora in the showcase.
      </p>
      <Link
        href="https://forms.gle/eVBGbBEyG1ELqDMv6"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
      >
        Submit your site
        <ArrowUpRight className="size-3" />
      </Link>
    </div>
  );
}
