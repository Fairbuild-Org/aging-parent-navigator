import { z } from "zod";

/**
 * Zod schemas for Aging Parent Navigator content packs.
 * These mirror the format documented in `content/README.md`.
 * Unknown keys (e.g. the `_note` placeholder markers) are stripped on parse.
 */

export const AreaEnum = z.enum([
  "physical",
  "cognition",
  "home-safety",
  "daily-living",
  "nutrition",
  "medication",
  "mood",
  "social",
  "behavior",
  "caregiver",
]);

export const OptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  weight: z.number(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  area: AreaEnum,
  prompt: z.string(),
  help: z.string().optional(),
  type: z.enum(["single", "multi", "scale"]),
  options: z.array(OptionSchema).min(1),
});

export const ConcernCheckSchema = z.object({
  status: z.string().optional(),
  version: z.string().optional(),
  length: z.object({ min: z.number(), max: z.number() }).optional(),
  questions: z.array(QuestionSchema).min(1),
});

export const RoadmapSchema = z.object({
  whatsHappeningNow: z.string(),
  whatMayComeNext: z.array(z.string()),
  changesToWatchFor: z.array(z.string()),
  howToPrepare: z.array(z.string()),
});

export const SituationSchema = z.object({
  id: z.string(),
  status: z.string().optional(),
  title: z.string(),
  shortLabel: z.string(),
  intro: z.string(),
  reassurance: z.string(),
  emphasizeAreas: z.array(AreaEnum),
  questions: z.array(z.string()),
  roadmap: RoadmapSchema,
});

export const BandSchema = z.object({
  id: z.string(),
  label: z.string(),
  tier: z.string(),
  min: z.number(),
  max: z.number(),
});

export const ScoringSchema = z.object({
  status: z.string().optional(),
  version: z.string().optional(),
  method: z.string(),
  perArea: z.boolean().optional(),
  bands: z.array(BandSchema).min(1),
  guidanceByBand: z.record(z.string(), z.string()),
});

export const ResourceSchema = z.object({
  title: z.string(),
  type: z.string(),
  href: z.string(),
});

export const ConversationGuidanceSchema = z.object({
  withYourParent: z.array(z.string()),
  withFamily: z.array(z.string()),
});

export const GuidanceSchema = z.object({
  band: z.string(),
  status: z.string().optional(),
  version: z.string().optional(),
  headline: z.string(),
  whatWeNoticed: z.string(),
  whatDeservesAttentionFirst: z.string(),
  helpfulObservationsToMonitor: z.array(z.string()),
  todayThisWeek: z.array(z.string()),
  commonMistakesToAvoid: z.array(z.string()),
  conversationGuidance: ConversationGuidanceSchema,
  questionsForHealthcareTeam: z.array(z.string()),
  whatMayBeComingNext: z.array(z.string()),
  howToPrepare: z.array(z.string()),
  whatThisDoesNotMean: z.array(z.string()),
  suggestedNextSteps: z.array(z.string()),
  resources: z.array(ResourceSchema),
});

export const ConditionSchema = z.object({
  questionId: z.string().optional(),
  valueIn: z.array(z.string()).optional(),
  area: AreaEnum.optional(),
  minAreaScore: z.number().optional(),
});

export const TriggerSchema = z.object({
  id: z.string(),
  when: ConditionSchema,
  and: ConditionSchema.optional(),
  band: z.string(),
  message: z.string(),
});

export const EmergencyTriggersSchema = z.object({
  status: z.string().optional(),
  version: z.string().optional(),
  triggers: z.array(TriggerSchema),
});

export const NavigatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  status: z.string(),
  approvedBy: z.string().nullable(),
  approvedAt: z.string().nullable(),
  updatedAt: z.string(),
  locale: z.string(),
  disclaimer: z.string(),
  situations: z.array(z.string()),
  concernCheck: z.string(),
  scoring: z.string(),
  emergencyTriggers: z.string(),
});

export type Area = z.infer<typeof AreaEnum>;
export type Option = z.infer<typeof OptionSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type ConcernCheck = z.infer<typeof ConcernCheckSchema>;
export type Situation = z.infer<typeof SituationSchema>;
export type Band = z.infer<typeof BandSchema>;
export type Scoring = z.infer<typeof ScoringSchema>;
export type Guidance = z.infer<typeof GuidanceSchema>;
export type EmergencyTrigger = z.infer<typeof TriggerSchema>;
export type EmergencyTriggers = z.infer<typeof EmergencyTriggersSchema>;
export type Navigator = z.infer<typeof NavigatorSchema>;

export interface ContentPack {
  navigator: Navigator;
  concernCheck: ConcernCheck;
  scoring: Scoring;
  emergencyTriggers: EmergencyTriggers;
  situations: Situation[];
  guidance: Record<string, Guidance>;
}
