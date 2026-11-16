import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

/**
 * Closing call to action.
 *
 * Flat and framed by a single rule. The beam that used to run around this card
 * is a component in the catalogue; on the page that sells the catalogue it was
 * competing with the type rather than serving it.
 */
export function FinalCta({ componentCount }: { componentCount: number }) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl border border-border px-6 py-16 text-center sm:px-12">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-[2.75rem] sm:leading-[1.05]">
            Start with one component
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-balance text-muted-foreground">
            Install it, read it, change it. If it does not fit, delete it. It is
            only a file, and there are {componentCount} to pick from.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/docs/getting-started/installation">
                Get started
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
          </div>
        </div>
      </div>
    </section>
  );
}
