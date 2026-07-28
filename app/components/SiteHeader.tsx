import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-sand-200 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 font-serif text-lg text-white"
          >
            A
          </span>
          <span className="font-serif text-lg font-semibold text-brand-800">
            Aging Parent Navigator
          </span>
        </Link>
        <Link
          href="/#situations"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          Start Free Concern Check
        </Link>
      </div>
    </header>
  );
}
