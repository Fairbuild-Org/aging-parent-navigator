import type { ContentPack, Guidance, Situation } from "./content/schema";

export type Answers = Record<string, string>;

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

function bandForScore(pack: ContentPack, total: number) {
  return (
    pack.scoring.bands.find((b) => total >= b.min && total <= b.max) ??
    pack.scoring.bands[pack.scoring.bands.length - 1]
  );
}

function conditionMet(cond: Condition, answers: Answers): boolean {
  if (cond.questionId) {
    const value = answers[cond.questionId];
    if (value === undefined) return false;
    if (cond.valueIn && !cond.valueIn.includes(value)) return false;
    return true;
  }
  // area / minAreaScore conditions are reserved for future use
  return false;
}

/**
 * Server-side scoring. Kept out of client bundles so the recommendation logic
 * (core IP) never ships to the browser.
 */
export function evaluate(pack: ContentPack, situationId: string, answers: Answers): GuidanceResult {
  const situation = pack.situations.find((s) => s.id === situationId);
  if (!situation) throw new Error(`Unknown situation: ${situationId}`);

  let total = 0;
  for (const qid of situation.questions) {
    const question = pack.concernCheck.questions.find((q) => q.id === qid);
    const value = answers[qid];
    if (!question || value === undefined) continue;
    const option = question.options.find((o) => o.value === value);
    if (option) total += option.weight;
  }

  let band = bandForScore(pack, total);
  const emergencyMessages: string[] = [];
  let emergency = false;

  for (const trigger of pack.emergencyTriggers.triggers) {
    const whenOk = conditionMet(trigger.when, answers);
    const andOk = trigger.and ? conditionMet(trigger.and, answers) : true;
    if (whenOk && andOk) {
      emergency = true;
      emergencyMessages.push(trigger.message);
      const forced = pack.scoring.bands.find((b) => b.id === trigger.band);
      if (forced) band = forced;
    }
  }

  return {
    situationId,
    situationTitle: situation.title,
    band: { id: band.id, label: band.label, tier: band.tier },
    emergency,
    emergencyMessages,
    total,
    guidance: pack.guidance[band.id],
    roadmap: situation.roadmap,
    disclaimer: pack.navigator.disclaimer,
  };
}
