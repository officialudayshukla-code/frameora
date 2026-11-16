import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DocsPageHeaderProps {
  /** Small line above the title, usually the category the page sits under. */
  eyebrow?: ReactNode;
  title: string;
  /** Rendered next to the title, e.g. a "New" badge. */
  badge?: ReactNode;
  description?: ReactNode;
  /** Metadata strip under the description: dependencies, counts, licence. */
  children?: ReactNode;
  className?: string;
}

/**
 * The masthead shared by every docs page.
 *
 * Component pages, category pages and the getting-started guides each had their
 * own heading markup: three different `h1` sizes, three container widths, three
 * vertical rhythms. Moving between them felt like moving between sites. One
 * component keeps them in step.
 */
export function DocsPageHeader({
  eyebrow,
  title,
  badge,
  description,
  children,
  className,
}: DocsPageHeaderProps) {
  return (
    <header className={cn("mt-8 border-b border-border pb-8", className)}>
      {eyebrow ? <div className="mb-4">{eyebrow}</div> : null}

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
          {title}
        </h1>
        {badge}
      </div>

      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-balance text-muted-foreground">
          {description}
        </p>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}
    </header>
  );
}
