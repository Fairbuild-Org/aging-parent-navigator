"use server";

import { getPack } from "@/lib/content/pack";
import { evaluate, type Answers, type GuidanceResult } from "@/lib/scoring";

/**
 * Scores a completed Concern Check on the server and returns the Family Guidance
 * Summary content. Invoked from the client flow via an event handler.
 */
export async function scoreConcernCheck(
  situationId: string,
  answers: Answers,
): Promise<GuidanceResult> {
  const pack = await getPack();
  return evaluate(pack, situationId, answers);
}
