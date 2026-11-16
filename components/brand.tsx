import Image from "next/image";
import { assetPath } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Brand assets, cropped from the supplied Frameora wordmark.
 *
 * The wordmark is "Frame", the lens "o", then "ra"; the lens alone is the mark
 * and doubles as the favicon and the apple touch icon, while the full wordmark
 * is the feed logo, so every surface shows the same drawing rather than an
 * approximation of it.
 *
 * Both PNGs are white glyphs on transparency because the site's default theme
 * is dark. `invert dark:invert-0` turns them black under the light theme with
 * no JavaScript and no second asset.
 */
const MARK_SRC = assetPath("/frameora-mark.png");
const WORDMARK_SRC = assetPath("/frameora-wordmark.png");

/** Intrinsic size of the cropped source files, in pixels. */
const MARK_SIZE = 24;
const WORDMARK_WIDTH = 122;
const WORDMARK_HEIGHT = 28;

interface BrandMarkProps {
  className?: string;
}

/**
 * The common logo, used bare where space is tight (the collapsed sidebar).
 *
 * The bars that used to animate on hover are gone with the old brand; the
 * mark is a static image now, so there is no transition to carry.
 */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <Image
      src={MARK_SRC}
      alt=""
      aria-hidden="true"
      width={MARK_SIZE}
      height={MARK_SIZE}
      className={cn("size-7 invert dark:invert-0", className)}
    />
  );
}

interface BrandLockupProps {
  className?: string;
  /** Hide the wordmark, e.g. where space is tight. */
  markOnly?: boolean;
}

/**
 * Mark plus wordmark, as used in the header and the expanded sidebar.
 *
 * The wordmark is the supplied logo, so the lockup is the artwork itself; the
 * accessible name comes from the `sr-only` label on the link that wraps it.
 */
export function BrandLockup({ className, markOnly = false }: BrandLockupProps) {
  return (
    <span className={cn("flex shrink-0 items-center", className)}>
      {markOnly ? (
        <BrandMark className="size-7" />
      ) : (
        <Image
          src={WORDMARK_SRC}
          alt=""
          aria-hidden="true"
          width={WORDMARK_WIDTH}
          height={WORDMARK_HEIGHT}
          priority
          className="h-5 w-auto invert dark:invert-0"
        />
      )}
    </span>
  );
}
