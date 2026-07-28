"use client";

import type { GuidanceResult } from "@/lib/scoring";

const BAND_STYLES: Record<string, { bg: string; text: string; ring: string }> = {
  "keep-watching": { bg: "bg-calm-50", text: "text-calm-800", ring: "ring-calm-300" },
  "plan-a-conversation": { bg: "bg-brand-50", text: "text-brand-800", ring: "ring-brand-300" },
  "take-action-soon": { bg: "bg-amber-50", text: "text-amber-800", ring: "ring-amber-300" },
  "get-immediate-help": { bg: "bg-rose-50", text: "text-rose-800", ring: "ring-rose-300" },
};

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-foreground/80">
          <span aria-hidden className="mt-1 text-brand-500">
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-sand-200 py-6">
      <h3 className="font-serif text-lg font-semibold text-brand-900">{title}</h3>
      {children}
    </div>
  );
}

export function FamilyGuidanceSummary({ result }: { result: GuidanceResult }) {
  const g = result.guidance;
  const style = BAND_STYLES[result.band.id] ?? BAND_STYLES["plan-a-conversation"];

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-sm text-foreground/60">Your Family Guidance Summary</p>
      <h1 className="mt-1 font-serif text-3xl font-semibold text-brand-900">{result.situationTitle}</h1>

      {result.emergency && (
        <div className="mt-6 rounded-xl bg-rose-50 p-5 ring-1 ring-rose-300">
          <p className="font-semibold text-rose-800">Please read this first</p>
          {result.emergencyMessages.map((m, i) => (
            <p key={i} className="mt-2 text-rose-800/90">
              {m}
            </p>
          ))}
        </div>
      )}

      <div className={`mt-6 rounded-2xl ${style.bg} p-6 ring-1 ${style.ring}`}>
        <p className={`text-sm font-semibold uppercase tracking-wide ${style.text}`}>
          {result.band.label}
        </p>
        <p className="mt-2 font-serif text-xl text-brand-900">{g.headline}</p>
        <p className="mt-2 text-foreground/80">{g.whatWeNoticed}</p>
      </div>

      <Section title="What deserves attention first">
        <p className="mt-2 text-foreground/80">{g.whatDeservesAttentionFirst}</p>
      </Section>
      <Section title="Helpful observations to monitor">
        <List items={g.helpfulObservationsToMonitor} />
      </Section>
      <Section title="What to do today or this week">
        <List items={g.todayThisWeek} />
      </Section>
      <Section title="Common mistakes to avoid">
        <List items={g.commonMistakesToAvoid} />
      </Section>
      <Section title="Starting difficult conversations">
        <p className="mt-2 text-sm font-medium text-foreground/70">With your parent</p>
        <List items={g.conversationGuidance.withYourParent} />
        <p className="mt-4 text-sm font-medium text-foreground/70">With family</p>
        <List items={g.conversationGuidance.withFamily} />
      </Section>
      <Section title="Questions to discuss with the healthcare team">
        <List items={g.questionsForHealthcareTeam} />
      </Section>

      {/* Forward-looking roadmap */}
      <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50/50 p-6">
        <h2 className="font-serif text-xl font-semibold text-brand-900">The road ahead</h2>
        <p className="mt-1 text-sm text-foreground/60">
          This isn&apos;t only about today — here&apos;s what may come next.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-brand-700">What may be coming next</p>
            <List items={result.roadmap.whatMayComeNext} />
          </div>
          <div>
            <p className="text-sm font-medium text-brand-700">Changes to watch for</p>
            <List items={result.roadmap.changesToWatchFor} />
          </div>
          <div>
            <p className="text-sm font-medium text-brand-700">How to prepare</p>
            <List items={result.roadmap.howToPrepare} />
          </div>
        </div>
      </div>

      <Section title="What this does not necessarily mean">
        <List items={g.whatThisDoesNotMean} />
      </Section>

      {/* Email capture (placeholder) */}
      <div className="mt-8 rounded-2xl bg-calm-50 p-6 ring-1 ring-calm-200">
        <h2 className="font-serif text-xl font-semibold text-brand-900">Get your full summary by email</h2>
        <p className="mt-1 text-sm text-foreground/70">
          We&apos;ll send a copy you can keep and share with family.
        </p>
        <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="you@email.com"
            className="flex-1 rounded-full border border-sand-300 bg-white px-5 py-3 outline-none focus:border-brand-400"
          />
          <button
            type="submit"
            className="rounded-full bg-brand-600 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-700"
          >
            Email my summary
          </button>
        </form>
        <p className="mt-2 text-xs text-foreground/50">
          [Placeholder — email delivery is wired up in a later step.]
        </p>
      </div>

      {/* Consultation CTA (placeholder) */}
      <div className="mt-6 rounded-2xl border border-brand-200 bg-white p-6 text-center">
        <h2 className="font-serif text-xl font-semibold text-brand-900">Want to talk it through?</h2>
        <p className="mt-1 text-foreground/70">Book a 30-minute consultation for personalized guidance.</p>
        <span className="mt-4 inline-block rounded-full border border-brand-200 bg-brand-50 px-6 py-3 font-medium text-foreground/50">
          Scheduling coming soon
        </span>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-foreground/50">{result.disclaimer}</p>
    </div>
  );
}
