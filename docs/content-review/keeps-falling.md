# Content Review — Pilot Pathway: "My parent keeps falling or seems physically weaker"

> Situation id: `keeps-falling` · Status: **`draft`** (revised 2026-09-06 per your feedback) · Purpose:
> gold-standard pilot pathway — once this is genuinely strong end-to-end, we use it as the template
> for the other six.
>
> **Revision 3.** Adds the "lives alone" / "found on the floor" distinction from your last message —
> see §2 and §4. Everything from Revision 2 (rewritten framing, falls-focused questions,
> caregiver-overwhelm asked-but-not-scored, situation-specific score bands, falls-specific guidance
> for all four bands) still stands. All of it is live in the app and verified — both by running the
> actual scoring function directly against test scenarios, and by driving the live UI in a browser.
> **Status is still `draft`, not `approved`** — and per your instruction, the emergency-trigger
> portion stays in draft pending your dedicated review even once the rest of the pathway is signed off.

---

## 1. Situation framing — updated to your text

| Field | Content |
| --- | --- |
| Intro | "A fall, new unsteadiness, or noticeable weakness is worth paying attention to. Sometimes the cause is simple and fixable; other times it can signal a change in strength, balance, medications, vision, or health." |
| Reassurance | "You don't have to wait for a serious injury to start looking into what's changed. Noticing the pattern now gives you more options to help your parent stay safe and independent." |

---

## 2. Questions — now 8, in this order

Your 5 falls-focused areas, plus **2 new questions from this round** (found-on-floor, lives-alone),
plus caregiver-overwhelm (asked but excluded from scoring — see §3).

**Q1 — Falls (past 12 months).** "Has your parent fallen in the past 12 months?" No / Once / More
than once / Not sure.

**Q2 — Fall severity (multi-select red-flag checklist).** "Did any fall cause an injury, involve
hitting their head, or leave them unable to get up without help? *Select all that apply.*"
Couldn't get up without help · Lost consciousness, even briefly · Hit their head · Seemed more
confused than usual afterward · Possible broken bone · Significant bleeding · Severe or worsening
headache · Vomited more than once · Had a seizure · Unusually drowsy or hard to wake · New weakness,
or trouble speaking, walking, or seeing · Not sure · *No — they were not hurt and got up on their own.*

This one question does double duty: it feeds the numeric score (see §3) **and** the red-flag trigger
layer (see §4) — merging your "fall severity" area with your full red-flag symptom list into one
checklist, so the pathway doesn't need a separate "tell us more" step. Flag if you'd rather split
these into two questions.

**Q3 — Found on the floor (new, multi-select).** "Was your parent found on the floor after a fall?"
*Help: "This is about how the fall was discovered — the questions above already cover how they're
doing physically."* No, they didn't end up on the floor / got up right away · Yes, but found quickly
and were okay · Not sure · Yes, and could not call or reach anyone for help · Yes, and could not get
up without help · Yes, and may have been on the floor for a while (not sure how long).

Deliberately a **separate question from Q2** — per your instruction to distinguish "lives alone" from
"was found on the floor." Q2 is about physical/medical symptoms; this is about the *discovery
circumstances*. Both feed the numeric score; only Q2 can independently trigger Get Immediate Help —
see §4.

**Q4 — Mobility change.** "Has your parent become noticeably weaker, slower, or less steady when
standing or walking?" No / Somewhat / Yes, clearly / Not sure.

**Q5 — Balance / fear of falling.** "Are they holding onto furniture or walls, appearing unsteady, or
avoiding activities because they're afraid of falling?" No / Somewhat / Yes, clearly / Not sure.

**Q6 — Fall-specific home hazards.** "Are there fall-specific hazards in the home — loose rugs, poor
lighting, difficult stairs, cluttered walking paths, or lack of bathroom support (grab bars, non-slip
mats)?" No / Some / Several / Not sure.

**Q7 — Lives alone (new).** "Does your parent live alone?" Yes / No — someone else is usually home /
Not sure. **Pure context — excluded from scoring and referenced by no trigger.** Per your instruction
("important context... but I do not want living alone by itself to trigger an emergency
recommendation"), this cannot move the band on its own, in combination, or at all in the current
build. If you'd later like it to matter as a *modifier* (e.g. found-on-floor carrying more weight
specifically when living alone), that's a natural refinement for your dedicated trigger review — not
built yet, flagging so it's a conscious choice rather than an oversight.

**Q8 — Caregiver overwhelm.** (unchanged wording) Asked as part of this pathway, **does not
contribute to the fall-risk score** — see §3.

The old general "home management" question (clutter/mail/spoiled food) is removed from this pathway,
as requested — it's still used by other situations (`unsafe-alone`, `moving-in`, `refuses-help`) that
haven't been revised yet, so I left it untouched there rather than deleting it.

**Now 8 questions** (was 6) — approaching the top of the "5–10 questions, ~5 minutes" range. Both new
questions are quick (a Yes/No/Not-sure and a checklist), but flagging the count in case you'd rather
fold "lives alone" into an existing question's help text instead of a standalone question.

**Still open:** exact weights per answer are placeholder (same 0/2/4/1-ish pattern as before) — flag
if any should be reweighted once you see the full picture.

---

## 3. Scoring — now two independent layers, as you described

**Layer 1 — situation risk score.** Determines the band *only when no red-flag trigger fires.*
Questions 1, 4, 5, 6 use their single selected answer's weight as before. Questions 2 and 3
(multi-select) are each scored as the **worst single selected item, not the sum** of everything
checked — selecting three moderate flags together doesn't stack into a worse score than the worst one
alone. Caregiver-overwhelm (Q8) and lives-alone (Q7) are asked and stored, but **both are excluded
from this sum entirely** — verified directly against the real scoring function: a test run with every
scored answer at minimum, caregiver-overwhelm at "almost constantly," and lives-alone at "yes" still
produces a total score of **0**.

**Layer 2 — red-flag override.** Independent of the score. There are now two triggers that can fire,
targeting *different* bands — see §4. When a trigger fires, it can only ever **raise** the band, never
lower one that's already been raised by a more severe trigger. This mattered as soon as a second,
less-severe trigger (found-on-floor) was introduced: I found and fixed a real bug where a trigger
evaluated later could have silently overwritten and downgraded a more severe result. Verified directly:
"found on the floor, couldn't get up" *plus* "lost consciousness" together still correctly resolves to
Get Immediate Help, regardless of which trigger is checked first.

**Situation-specific score bands**, widened for the new 6-scored-question max of 24 (was 20 with 5):

| Band | Score range | Max possible for this pathway |
| --- | --- | --- |
| Keep Watching | 0–3 | — |
| Plan a Conversation | 4–9 | — |
| Take Action Soon | 10–16 | — |
| Get Immediate Help | 17+ | max 24 (4×6 — each of the 6 scored questions tops out at 4) |

These cut points are a first proposal, not a clinical judgment — please sanity-check them.

**Architecture note:** the "shared universal scale" limitation from Revision 1 is resolved. Any
situation can now declare its own thresholds; situations that don't will keep using the shared scale.
No other pathway has been touched.

---

## 4. Red-flag / emergency triggers — rebuilt, still pending your dedicated sign-off

The old rule (required **multiple** falls **and** a separate yes/no injury question) is gone. Per your
direction that one serious fall can be enough, the new trigger fires on **any single selected item**
from the Q2 checklist except "none" / "not-sure":

> Couldn't get up without help · Lost consciousness · Hit their head · New confusion afterward ·
> Suspected fracture · Significant bleeding · Severe/worsening headache · Repeated vomiting · Seizure ·
> Unusual drowsiness · New weakness/trouble speaking, walking, or seeing

Every one of these is now something the falls pathway actually asks — this closes the exact gap you
flagged earlier (the old `acute-confusion` trigger checking a question this pathway never asked).
Verified live in the browser: selecting "Hit their head" + "Severe or worsening headache" together
correctly produces the "Get Immediate Help" summary with the falls-specific emergency guidance, not
the generic shared text.

**New this round — a second trigger, targeting a different band.** Per your last message, found-on-floor
now has its own trigger, `found-on-floor-concern`, firing when any of *couldn't get up*, *couldn't call
for help*, or *may have been down for a while* is selected. It targets **Take Action Soon, not Get
Immediate Help** — it raises the level of concern without asserting a medical emergency, exactly as you
described. It cannot fire from "lives alone" — that question isn't referenced by any trigger at all.

If a real Q2 red flag is *also* present, `fall-severe-symptoms` fires too and wins (see the severity
note in §3) — so "found on the floor" can never suppress or soften a genuine emergency; it can only add
concern when nothing more severe is present.

Both triggers, side by side:

| Trigger | Fires on | Targets |
| --- | --- | --- |
| `fall-severe-symptoms` | Any real symptom from the Q2 checklist | Get Immediate Help |
| `found-on-floor-concern` | Couldn't get up / couldn't call for help / extended time down (Q3) | Take Action Soon |

Verified live in the browser and via direct scoring tests: found-on-floor alone (no Q2 symptoms) lands
on Take Action Soon with **no** urgent "please read this first" banner; found-on-floor combined with a
real Q2 symptom still correctly lands on Get Immediate Help, with the banner.

**This is still draft, not approved** — per your instruction, these triggers need your dedicated
clinical review pass before anything ships, independent of the rest of the content review.

---

## 5. The road ahead — updated per your edit

`whatMayComeNext` now opens with your exact sentence: *"A previous fall increases the chance of
another fall, especially if the underlying cause hasn't been identified or addressed."*

`howToPrepare` now includes all six of your additions: medication review, vision check, blood pressure
lying-down-vs-standing, footwear/foot problems, PT/OT referral consideration, plus the original
home-safety review and stumble log.

---

## 6. Band guidance — now falls-specific for all four bands

This was shared generic text in Revision 1. All four bands now have falls-specific overrides (via the
`guidanceOverrides` mechanism), each mentioning what you asked for: falls-risk evaluation, medication
review, strength/balance evaluation, PT/OT when appropriate, and pathway-specific warning signs.

- **Keep Watching** — prevention framing: stumble log, home walk-through, footwear check.
- **Plan a Conversation** — explicitly asks about a falls-risk assessment, medications affecting
  balance, vision, and PT/OT for strength/balance.
- **Take Action Soon** — same, with more urgency: schedule this week, explicit PT/OT referral
  question, home-hazard fixes now.
- **Get Immediate Help** — mirrors the trigger message: what to call 911 for vs. what needs urgent (not
  emergency) care, kept consistent in tone with the trigger's own message.

Full text is in `data/navigators/aging-parent/guidance/keeps-falling/*.json` — happy to paste it here
too if reviewing in this doc is easier than opening the JSON.

---

## Next step

This is ready for your review pass. Once you confirm (or mark up further), I'll move `keeps-falling`'s
status from `draft` to `approved` (with `approvedBy`/`approvedAt` filled in) and we start the same
process on the next situation.
