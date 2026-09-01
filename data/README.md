# Aging Parent Navigator — Content Packs

This folder is the **heart of the platform**: the situations, questions, scoring, guidance, and safety
triggers that families experience. It is **version-controlled data, not code** — the whole point is
that Sharon (and the team) can refine the guidance without a developer changing application code.

> ⚠️ **Everything currently in here is PLACEHOLDER** — illustrative structure only, authored to show
> the format. It is **not clinical guidance**. Real content must be authored and approved by
> **Sharon Collins, RN** before any pack's `status` becomes `approved` (see Governance below).

---

## The golden rule: content is data

The app **reads these JSON files** to build the experience. To change a question, reword guidance,
adjust a score threshold, or add an emergency trigger, you **edit the JSON and redeploy** — no code
change. A validation step (`npm run validate:content`, added with the app) checks every pack against
the schema in CI, so malformed or incomplete content can't ship. A Phase 3 admin UI will later edit
this same data through a form; the shape stays identical.

---

## Folder map

```
data/
  README.md                         ← this file (the authoritative spec)
  navigators/
    aging-parent/                   ← one navigator = one versioned content pack
      navigator.json                ← pack meta, version, approval, situation list, disclaimer
      concern-check.json            ← the question pool (areas, options, weights) incl. ≥1 caregiver item
      scoring.json                  ← score → internal tier → user-facing band; band→guidance map
      emergency-triggers.json       ← answer patterns that force "Get Immediate Help"
      situations/
        keeps-falling.json          ← one file per situation (incl. forward-looking roadmap)
        ...                         ← 6 more (stubs to be authored)
      guidance/
        plan-a-conversation.json    ← one file per band (the Family Guidance Summary template)
        ...                         ← keep-watching / take-action-soon / get-immediate-help
```

Future Life Navigators (caregiving, dementia, …) are **new folders under `navigators/`** — new data,
not new code.

---

## Governance & versioning (required)

- **Status lifecycle:** `placeholder` → `draft` → `in_review` → `approved`. Nothing reaches families
  until `approved`.
- **Approval fields** on `navigator.json`: `version`, `status`, `approvedBy`, `approvedAt`. The RN is
  the clinical authority; **emergency triggers get a separate, explicit review pass.**
- **Versioning:** any change bumps `version` (semver-ish, e.g. `1.0.0` → `1.0.1`). Content is
  versioned in git, so every change is diffable and revertible.
- **Traceability:** every stored assessment records the **`contentVersion`** it was taken against, so
  results stay interpretable after content changes.

---

## Content model (field reference)

**navigator.json** — `id`, `name`, `version`, `status`, `approvedBy`, `approvedAt`, `updatedAt`,
`locale`, `situations[]` (ids), `disclaimer`, and pointers to `concernCheck` / `scoring` /
`emergencyTriggers`.

**Question** (in `concern-check.json`) — `id`, `area` (`physical` | `cognition` | `home-safety` |
`daily-living` | `mood` | `social` | `behavior` | `caregiver` | `nutrition` | `medication`),
`prompt`, optional `help`, `type` (`single` | `multi` | `scale`), and `options[]` each with `value`,
`label`, and numeric `weight`. Most observational questions offer a **"Not sure"** option — families
are often uncertain, and that itself is useful signal.

**Situation** (in `situations/*.json`) — `id`, `status`, `title`, `shortLabel`, `intro`,
`reassurance`, `emphasizeAreas[]`, `questions[]` (ids drawn from the pool), and a **`roadmap`** object:
`whatsHappeningNow`, `whatMayComeNext[]`, `changesToWatchFor[]`, `howToPrepare[]`. The roadmap is what
makes each pathway *forward-looking*, not a one-time snapshot.

**Scoring** (`scoring.json`) — `method` (`sum-of-weights`), `perArea` (bool), `bands[]` each with
`id`, `label` (family-facing), `tier` (internal), and `min`/`max` cut points, plus `guidanceByBand`
(band id → guidance file).

**Band guidance** (`guidance/*.json`) — the **Family Guidance Summary** template for a band:
`headline`, `whatWeNoticed`, `whatDeservesAttentionFirst`, `helpfulObservationsToMonitor[]`,
`todayThisWeek[]`, `commonMistakesToAvoid[]`, `conversationGuidance` (`withYourParent[]`,
`withFamily[]`), `questionsForHealthcareTeam[]`, `whatMayBeComingNext[]`, `howToPrepare[]`,
`whatThisDoesNotMean[]`, `suggestedNextSteps[]`, `resources[]`.

### Situation-specific guidance overrides (optional)

By default every situation uses the *shared*
band guidance above — e.g. every situation that lands in "Plan a Conversation" shows the same
`guidance/plan-a-conversation.json` content. A situation can override this per band by adding a
`guidanceOverrides` map to its file:

```json
"guidanceOverrides": {
  "plan-a-conversation": "guidance/keeps-falling/plan-a-conversation.json"
}
```

The override file uses the exact same shape as a normal guidance file. Only bands listed in
`guidanceOverrides` are overridden — any band left out still falls back to the shared file. This is
intentional: **V1 ships with shared guidance everywhere** (per Sharon's decision), and situations can
graduate to their own guidance one band at a time later, purely by adding a JSON file and one line —
no code change, no re-architecture.

**Emergency triggers** (`emergency-triggers.json`) — `triggers[]`, each a declarative rule that forces
the `get-immediate-help` band regardless of score. Condition mini-language (so new triggers need no
code):

```
condition := { "questionId": "<id>", "valueIn": ["<option value>", ...] }
           | { "area": "<area>", "minAreaScore": <number> }
rule       := { "id", "when": <condition>, "and"?: <condition>, "band", "message" }
```

---

## Authoring workflow (for Sharon + Dennis)

1. Copy an existing file as a template; set `status: "draft"`.
2. Write/refine content; keep language plain, reassuring, non-diagnostic.
3. Move to `in_review`; RN reviews (emergency triggers reviewed separately).
4. On approval, set `status: "approved"`, fill `approvedBy` / `approvedAt`, bump `version`.
5. `npm run validate:content` must pass before merge/deploy.
