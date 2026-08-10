import Link from "next/link";
import { getPack } from "@/lib/content/pack";
import { AboutSharon } from "@/components/AboutSharon";

const STEPS = [
  {
    n: "1",
    t: "Tell us what you're seeing",
    d: "Answer a few gentle questions about your parent — and about how you're doing, too.",
  },
  {
    n: "2",
    t: "Get a Family Guidance Summary",
    d: "Understand what deserves attention, what to do this week, and what to watch for next.",
  },
  {
    n: "3",
    t: "Take confident next steps",
    d: "Practical actions, questions for the doctor, and help with difficult conversations.",
  },
];

export default async function Home() {
  const pack = await getPack();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-background">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="mb-4 inline-block rounded-full bg-calm-100 px-3 py-1 text-sm font-medium text-calm-800">
            Helping Families Navigate the Journey of Aging
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl">
            What&apos;s happening with your loved one?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-brand-800 sm:text-2xl">
            You don&apos;t have to know exactly what&apos;s wrong. Start with what you&apos;ve
            noticed, and we&apos;ll help guide you one step at a time.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/70">
            You&apos;re not alone — we&apos;re here to help.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#situations"
              className="rounded-full bg-brand-600 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-700"
            >
              Start the Free Concern Check
            </Link>
            <a
              href="#consult"
              className="rounded-full border border-brand-200 bg-white px-6 py-3 font-medium text-brand-800 transition-colors hover:bg-brand-50"
            >
              Schedule a Consultation
            </a>
          </div>
          <p className="mt-4 text-sm text-foreground/50">Free · About 5 minutes · No account needed</p>
        </div>
      </section>

      {/* Situations */}
      <section id="situations" className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-semibold text-brand-900">
            Start with what you&apos;re noticing
          </h2>
          <p className="mt-2 text-foreground/70">
            Choose the situation that feels closest. There are no wrong answers.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {pack.situations.map((s) => (
            <Link
              key={s.id}
              href={`/check/${s.id}`}
              className="group rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
            >
              <h3 className="font-serif text-xl font-semibold text-brand-800 group-hover:text-brand-700">
                {s.title}
              </h3>
              <p className="mt-2 text-foreground/70">{s.intro}</p>
              <span className="mt-4 inline-block text-sm font-medium text-brand-600">Start here →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-sand-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="mb-8 text-center font-serif text-3xl font-semibold text-brand-900">
            How it works
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((c) => (
              <div key={c.n} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-calm-100 font-serif text-lg font-semibold text-calm-700">
                  {c.n}
                </span>
                <h3 className="mt-4 font-semibold text-brand-800">{c.t}</h3>
                <p className="mt-2 text-sm text-foreground/70">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutSharon />

      {/* Consult (placeholder) */}
      <section id="consult" className="bg-brand-50">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="font-serif text-3xl font-semibold text-brand-900">
            Talk with someone who understands
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-foreground/75">
            A 30-minute consultation for personalized guidance on your family&apos;s concerns,
            priorities, and next steps.
          </p>
          <span className="mt-6 inline-block rounded-full border border-brand-200 bg-white px-6 py-3 font-medium text-foreground/50">
            Scheduling coming soon
          </span>
        </div>
      </section>
    </div>
  );
}
