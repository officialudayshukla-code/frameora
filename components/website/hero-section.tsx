"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";
import { CopyButton } from "@/components/website/copy-button";
import { Marquee } from "@/components/demo/component/marquee";
import { siteConfig } from "@/lib/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export interface HeroComponentLink {
  title: string;
  href: string;
}

interface HeroSectionProps {
  componentCount: number;
  latestComponent?: string;
  latestHref?: string;
  /** Every component, for the ticker along the bottom of the hero. */
  components: HeroComponentLink[];
}

/**
 * The opening spread.
 *
 * Set like a title page rather than a landing page: one left-aligned column,
 * a rule above the ticker, and no ambient motion behind the type. The library
 * itself is the only thing on the site allowed to glow, so the hero stays out
 * of its way.
 */
export function HeroSection({
  componentCount,
  latestComponent,
  latestHref,
  components,
}: HeroSectionProps) {
  const installCommand = `npx shadcn@latest add ${siteConfig.url}/r/border-beam.json`;

  return (
    <section className="relative border-b border-border">
      {/* A grid, faded out under the copy. Static, one paint, no blur cost. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent_82%)] opacity-[0.45]" />
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-(--breakpoint-2xl) px-4 pt-20 pb-16 md:px-8 md:pt-28 md:pb-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl">
          {latestComponent && latestHref ? (
            <motion.div variants={itemVariants}>
              <Link
                href={latestHref}
                className="group inline-flex items-center gap-2.5 border border-border bg-background py-1 pr-3 pl-1 transition-colors hover:border-foreground/40"
              >
                <span className="inline-flex items-center gap-1 bg-primary px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-primary-foreground uppercase">
                  <Sparkles className="size-2.5" />
                  New
                </span>
                <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  {latestComponent}
                </span>
                <ArrowRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ) : null}

          {/*
            The headline says what the thing is. "Supercharge your UI" is the
            brand line and it stays in the logo and the title tag, but as an
            <h1> it competed for a phrase nobody searches.
          */}
          <motion.h1
            variants={itemVariants}
            className="mt-10 text-[clamp(2.5rem,6.2vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance"
          >
            Animated React components{" "}
            <span className="text-muted-foreground">you own</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base text-muted-foreground md:text-lg"
          >
            {componentCount} components. Copy, paste, ship.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row"
          >
            <Button size="lg" asChild className="w-full sm:w-auto">
              {/* This was `target="_blank"` on an internal route, which opened
                  the docs in a new tab and dropped client-side navigation. */}
              <Link href="/docs/getting-started/introduction">
                Browse components
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full gap-2 sm:w-auto"
            >
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="size-4" />
                Star on GitHub
              </a>
            </Button>
          </motion.div>

          {/* The install command is the page's most important line, so it is
              the only thing in the hero with a border of its own. */}
          <motion.div
            variants={itemVariants}
            className="relative mt-10 w-full max-w-xl border border-border bg-card"
          >
            <div className="flex items-center gap-3 overflow-hidden py-3.5 pr-12 pl-4 text-left">
              <span
                aria-hidden="true"
                className="font-mono text-xs text-muted-foreground select-none"
              >
                $
              </span>
              <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground/80 sm:text-[13px]">
                npx shadcn@latest add {siteConfig.url}/r/border-beam.json
              </code>
            </div>
            <CopyButton
              value={installCommand}
              label="Copy install command"
              className="top-1/2 right-2 z-20 -translate-y-1/2"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Every component, ticking past. It shows the breadth of the library in
          one glance and puts a real link to each page at the top of the site. */}
      <div className="relative border-t border-border py-3">
        <Marquee speed={32} pauseOnHover fadeEdges>
          {components.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              className="mx-3 font-mono text-[11px] whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              {title}
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
