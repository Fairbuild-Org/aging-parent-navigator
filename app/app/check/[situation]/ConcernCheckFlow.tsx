"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import type { Question, Situation } from "@/lib/content/schema";
import type { GuidanceResult } from "@/lib/scoring";
import { useConcernCheck } from "@/lib/store/concern-check";
import { scoreConcernCheck } from "@/app/actions";
import { FamilyGuidanceSummary } from "@/components/FamilyGuidanceSummary";

type Phase = "intro" | "questions" | "loading" | "results";

export function ConcernCheckFlow({
  situation,
  questions,
}: {
  situation: Situation;
  questions: Question[];
}) {
  const { index, answers, start, setAnswer, next, back } = useConcernCheck();
  const [phase, setPhase] = useState<Phase>("intro");
  const [result, setResult] = useState<GuidanceResult | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    start(situation.id);
  }, [situation.id, start]);

  const total = questions.length;
  const current = questions[index];
  const selected = current ? answers[current.id] : undefined;
  const progress = Math.round(((index + (selected ? 1 : 0)) / total) * 100);

  function handleContinue() {
    if (index < total - 1) {
      next();
      return;
    }
    setPhase("loading");
    startTransition(async () => {
      const r = await scoreConcernCheck(situation.id, answers);
      setResult(r);
      setPhase("results");
    });
  }

  if (phase === "results" && result) {
    return <FamilyGuidanceSummary result={result} />;
  }

  if (phase === "loading" || isPending) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center text-foreground/60">
        Preparing your Family Guidance Summary…
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link href="/#situations" className="text-sm text-brand-600 hover:underline">
          ← All situations
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-brand-900">{situation.title}</h1>
        <p className="mt-4 text-lg text-foreground/75">{situation.intro}</p>
        <p className="mt-4 rounded-xl bg-calm-50 p-4 text-calm-800">{situation.reassurance}</p>
        <p className="mt-6 text-sm text-foreground/60">
          A few gentle questions · about 5 minutes · your answers stay private.
        </p>
        <button
          onClick={() => setPhase("questions")}
          className="mt-6 rounded-full bg-brand-600 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-700"
        >
          Begin the Concern Check
        </button>
      </div>
    );
  }

  // questions
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm text-foreground/60">
          <span>
            Question {index + 1} of {total}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-sand-200">
          <div
            className="h-2 rounded-full bg-calm-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {current && (
        <div>
          <h2 className="font-serif text-2xl font-semibold text-brand-900">{current.prompt}</h2>
          {current.help && <p className="mt-2 text-foreground/60">{current.help}</p>}

          <div className="mt-6 space-y-3">
            {current.options.map((o) => {
              const active = selected === o.value;
              return (
                <button
                  key={o.value}
                  onClick={() => setAnswer(current.id, o.value)}
                  className={`w-full rounded-xl border px-5 py-4 text-left transition-all ${
                    active
                      ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
                      : "border-sand-200 bg-white hover:border-brand-300"
                  }`}
                >
                  <span className={`font-medium ${active ? "text-brand-800" : "text-foreground/80"}`}>
                    {o.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => (index === 0 ? setPhase("intro") : back())}
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              ← Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!selected}
              className="rounded-full bg-brand-600 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {index < total - 1 ? "Continue" : "See my guidance"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
