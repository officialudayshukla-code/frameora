import Link from "next/link";
import { ArrowRight, Bot, SlidersHorizontal } from "lucide-react";
import { CodeBlock } from "@/components/website/code-block";

/**
 * The two things nobody else in this category ships.
 *
 * The landing page argued the library was well built, which every component
 * library claims, and said nothing about the only two features that are
 * genuinely hard to copy: the catalogue being installable from inside a coding
 * agent, and every component being tunable before you take the code. Both were
 * reachable only by already being deep in the docs.
 */
export function BuiltForYourWorkflow() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-20 md:px-8 md:py-24">
        <div className="section-head">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
            Pick it with your agent. Tune it before you copy.
          </h2>
          <p className="label-mono">Built for how you build</p>
        </div>

        <div className="mt-6 grid gap-px bg-border md:grid-cols-2">
          <div className="flex min-w-0 flex-col bg-background p-6 sm:p-8">
            <span className="flex size-9 items-center justify-center border border-border text-foreground">
              <Bot className="size-4" />
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              Your agent knows the catalogue
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Add the MCP server once. Claude Code, Cursor and Windsurf can then
              search the components, read the real props and install one without
              opening this site.
            </p>

            <div className="mt-6">
              <CodeBlock
                code="claude mcp add uibeats -- npx -y @uibeats/mcp"
                language="bash"
                className="my-0"
              />
            </div>

            <Link
              href="/docs/getting-started/mcp"
              className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Set up the MCP server
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex min-w-0 flex-col bg-background p-6 sm:p-8">
            <span className="flex size-9 items-center justify-center border border-border text-foreground">
              <SlidersHorizontal className="size-4" />
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              Every prop is a dial
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Drag a control, watch it change, copy the snippet. It carries only
              what you changed. Motion Studio goes further: shape the easing
              curve or tune the spring, then take the transition.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-px border border-border bg-border text-sm">
              <div className="bg-background px-4 py-3">
                <dt className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                  Controls from
                </dt>
                <dd className="mt-1 font-medium">the props table</dd>
              </div>
              <div className="bg-background px-4 py-3">
                <dt className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                  Springs are
                </dt>
                <dd className="mt-1 font-medium">simulated, not faked</dd>
              </div>
            </dl>

            <Link
              href="/motion-studio"
              className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Open Motion Studio
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
