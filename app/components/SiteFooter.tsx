export function SiteFooter() {
  return (
    <footer className="border-t border-sand-200 bg-sand-50">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-foreground/70">
        <p className="mb-2 font-medium text-foreground/80">You&apos;re not alone — we&apos;re here to help.</p>
        <p className="max-w-2xl">
          Aging Parent Navigator is educational and is not medical advice, diagnosis, or treatment. It
          does not replace evaluation by a qualified professional. In an emergency, call 911.
        </p>
        <p className="mt-4 text-foreground/50">© {new Date().getFullYear()} Aging Parent Navigator</p>
      </div>
    </footer>
  );
}
