import Link from "next/link";
import { ArrowUpRight, Blocks } from "lucide-react";
import { getComponentsByCategory } from "@/lib/registry";

/**
 * The lead sentence of `whenToUse`.
 *
 * `whenToUse` is written as one or two sentences for the docs page, where
 * there is room for both. Here three of them sit side by side under a dense
 * tile grid, and the second sentence is what turns a light row into a
 * paragraph. Clamping by line count would cut mid-word instead.
 */
function lead(text: string | undefined) {
  if (!text) return null;
  return `${(text.split(". ")[0] ?? text).replace(/\.$/, "")}.`;
}

/**
 * Blocks, on the home page.
 *
 * Deliberately not tiles like the component showcase above it. A block is a
 * whole page section, and a section shrunk into a 12rem card is a screenshot
 * of a layout rather than the layout, which is exactly the complaint the
 * dedicated `/preview` route exists to answer. So this sells them in words and
 * sends people to see the real thing at full width.
 *
 * Words, though, do not need card chrome. Hairline rules, one sentence each,
 * and the parts named in a single quiet line. That last line is the part worth
 * saying out loud: installing a block installs everything it is built from.
 */
export function BlocksShowcase() {
  const blocks = getComponentsByCategory("block");
  if (blocks.length === 0) return null;

  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-20 md:px-8 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-mono inline-flex items-center gap-2">
              <Blocks className="size-3.5" />
              Blocks
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
              Whole sections, not just parts
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Install a block and it brings every component it is built from
              with it. One command, a finished section, and a file you own.
            </p>
          </div>
          <Link
            href="/docs/block/hero"
            className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            All {blocks.length} blocks
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-x-10 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block) => (
            <li key={block.name}>
              <Link
                href={block.href}
                className="group flex h-full flex-col border-b border-border py-6 transition-colors hover:bg-foreground/[0.02] md:border-b-0"
              >
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  {block.title}
                  <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </p>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {lead(block.whenToUse)}
                </p>

                {/* What it pulls in, named rather than badged. This is the
                    whole pitch, so it stays here rather than a click away. */}
                {block.beatsDependencies.length ? (
                  <p className="mt-4 font-mono text-[11px] text-muted-foreground/80">
                    {block.beatsDependencies.join(" · ")}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
