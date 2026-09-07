import type { Band, ContentPack, Guidance, Situation } from "./content/schema";

export type Answers = Record<string, string | string[]>;

export interface GuidanceResult {
  situationId: string;
  situationTitle: string;
  band: { id: string; label: string; tier: string };
  emergency: boolean;
  emergencyMessages: string[];
  total: number;
  guidance: Guidance;
  roadmap: Situation["roadmap"];
  disclaimer: string;
}

interface Condition {
  questionId?: string;
  valueIn?: string[];
  area?: string;
  minAreaScore?: number;
}

/** Normalizes a single- or multi-select answer to an array for uniform handling. */
function asArray(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Resolves the effective bands for a situation: the shared taxonomy
 * (id/label/tier) with min/max overridden per-situation where the situation
 * declares its own scoreBands. Bands not overridden fall back to the shared
 * cut points — this is what lets situations move off one universal numeric
 * scale without duplicating the whole band taxonomy.
 */
function effectiveBands(pack: ContentPack, situation: Situation): Band[] {
  if (!situation.scoreBands?.length) return pack.scoring.bands;
  const overrides = new Map(situation.scoreBands.map((b) => [b.bandId, b]));
  return pack.scoring.bands.map((b) => {
    const o = overrides.get(b.id);
    return o ? { ...b, min: o.min, max: o.max } : b;
  });
}

function bandForScore(bands: Band[], total: number): Band {
  return bands.find((b) => total >= b.min && total <= b.max) ?? bands[bands.length - 1];
}

function conditionMet(cond: Condition, answers: Answers): boolean {
  if (cond.questionId) {
    const values = asArray(answers[cond.questionId]);
    if (values.length === 0) return false;
    if (cond.valueIn) return values.some((v) => cond.valueIn!.includes(v));
    return true;
  }
  // area / minAreaScore conditions are reserved for future use
  return false;
}

/**
 * Server-side scoring. Kept out of client bundles so the recommendation logic
 * (core IP) never ships to the browser.
 *
 * Two independent layers, per product decision: (1) the numeric situation risk
 * score below determines the band ONLY when no red-flag trigger fires; (2)
 * emergency triggers can force a band regardless of score, and a low score can
 * never suppress a trigger. Questions in `questions` but not in
 * `scoringQuestions` (e.g. a caregiver-wellbeing check-in) are answered and
 * available to triggers, but never move the score.
 */
export function evaluate(pack: ContentPack, situationId: string, answers: Answers): GuidanceResult {
  const situation = pack.situations.find((s) => s.id === situationId);
  if (!situation) throw new Error(`Unknown situation: ${situationId}`);

  const scoringQuestionIds = situation.scoringQuestions ?? situation.questions;

  let total = 0;
  for (const qid of scoringQuestionIds) {
    const question = pack.concernCheck.questions.find((q) => q.id === qid);
    if (!question) continue;
    const selected = asArray(answers[qid]);
    if (selected.length === 0) continue;

    const weights = selected
      .map((value) => question.options.find((o) => o.value === value)?.weight)
      .filter((w): w is number => w !== undefined);
    if (weights.length === 0) continue;

    // Multi-select questions (e.g. a red-flag symptom checklist) contribute
    // their WORST selected item, not the sum — the score should reflect "how
    // bad is the worst thing reported," not "how many boxes were checked."
    // Single-select questions have exactly one weight either way.
    total += question.type === "multi" ? Math.max(...weights) : weights[0];
  }

  const bands = effectiveBands(pack, situation);
  let band = bandForScore(bands, total);
  const emergencyMessages: string[] = [];
  let emergency = false;

  for (const trigger of pack.emergencyTriggers.triggers) {
    const whenOk = conditionMet(trigger.when, answers);
    const andOk = trigger.and ? conditionMet(trigger.and, answers) : true;
    if (whenOk && andOk) {
      emergency = true;
      emergencyMessages.push(trigger.message);
      const forced = bands.find((b) => b.id === trigger.band);
      if (forced) band = forced;
    }
  }

  // A situation-specific override for this band wins; otherwise fall back to
  // the shared band guidance. This lets a situation "graduate" to its own
  // guidance one band at a time, with no change to this resolution logic.
  const guidance = pack.guidanceOverrides[situationId]?.[band.id] ?? pack.guidance[band.id];

  return {
    situationId,
    situationTitle: situation.title,
    band: { id: band.id, label: band.label, tier: band.tier },
    emergency,
    emergencyMessages,
    total,
    guidance,
    roadmap: situation.roadmap,
    disclaimer: pack.navigator.disclaimer,
  };
}
