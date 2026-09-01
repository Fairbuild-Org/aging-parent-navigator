import { promises as fs } from "node:fs";
import path from "node:path";
import {
  NavigatorSchema,
  ConcernCheckSchema,
  ScoringSchema,
  EmergencyTriggersSchema,
  SituationSchema,
  GuidanceSchema,
  type ContentPack,
  type Guidance,
  type Situation,
} from "./schema";

/**
 * Content lives at the repo root in `data/`, alongside the Next app.
 * Override with CONTENT_DIR (e.g. in a deploy where content sits elsewhere).
 */
export const CONTENT_DIR = process.env.CONTENT_DIR
  ? path.resolve(process.env.CONTENT_DIR)
  : path.resolve(process.cwd(), "data");

async function readJson(file: string): Promise<unknown> {
  const raw = await fs.readFile(file, "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON in ${file}: ${(e as Error).message}`);
  }
}

/** Load and validate a full navigator content pack, with cross-reference checks. */
export async function loadNavigatorPack(navId: string): Promise<ContentPack> {
  const base = path.join(CONTENT_DIR, "navigators", navId);

  const navigator = NavigatorSchema.parse(await readJson(path.join(base, "navigator.json")));
  const concernCheck = ConcernCheckSchema.parse(await readJson(path.join(base, navigator.concernCheck)));
  const scoring = ScoringSchema.parse(await readJson(path.join(base, navigator.scoring)));
  const emergencyTriggers = EmergencyTriggersSchema.parse(
    await readJson(path.join(base, navigator.emergencyTriggers)),
  );

  const situations: Situation[] = [];
  for (const sid of navigator.situations) {
    situations.push(SituationSchema.parse(await readJson(path.join(base, "situations", `${sid}.json`))));
  }

  const guidance: Record<string, Guidance> = {};
  for (const [bandId, file] of Object.entries(scoring.guidanceByBand)) {
    guidance[bandId] = GuidanceSchema.parse(await readJson(path.join(base, file)));
  }

  const guidanceOverrides: Record<string, Record<string, Guidance>> = {};
  for (const s of situations) {
    if (!s.guidanceOverrides) continue;
    guidanceOverrides[s.id] = {};
    for (const [bandId, file] of Object.entries(s.guidanceOverrides)) {
      guidanceOverrides[s.id][bandId] = GuidanceSchema.parse(await readJson(path.join(base, file)));
    }
  }

  const pack: ContentPack = {
    navigator,
    concernCheck,
    scoring,
    emergencyTriggers,
    situations,
    guidance,
    guidanceOverrides,
  };
  assertConsistent(pack);
  return pack;
}

/** Cross-reference integrity checks beyond per-file shape validation. */
function assertConsistent(pack: ContentPack): void {
  const errors: string[] = [];
  const questionIds = new Set(pack.concernCheck.questions.map((q) => q.id));
  const bandIds = new Set(pack.scoring.bands.map((b) => b.id));

  for (const s of pack.situations) {
    for (const q of s.questions) {
      if (!questionIds.has(q)) errors.push(`situation "${s.id}" references unknown question "${q}"`);
    }
  }
  for (const b of pack.scoring.bands) {
    if (!pack.guidance[b.id]) errors.push(`band "${b.id}" has no guidance file`);
  }
  for (const s of pack.situations) {
    for (const bandId of Object.keys(s.guidanceOverrides ?? {})) {
      if (!bandIds.has(bandId)) {
        errors.push(`situation "${s.id}" guidanceOverrides references unknown band "${bandId}"`);
      }
    }
  }
  for (const t of pack.emergencyTriggers.triggers) {
    for (const cond of [t.when, t.and]) {
      if (cond?.questionId && !questionIds.has(cond.questionId)) {
        errors.push(`trigger "${t.id}" references unknown question "${cond.questionId}"`);
      }
    }
    if (!bandIds.has(t.band)) errors.push(`trigger "${t.id}" references unknown band "${t.band}"`);
  }

  if (errors.length) {
    throw new Error(`Content pack "${pack.navigator.id}" is inconsistent:\n - ${errors.join("\n - ")}`);
  }
}

/** List navigator ids available under data/navigators. */
export async function listNavigators(): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, "navigators");
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}
