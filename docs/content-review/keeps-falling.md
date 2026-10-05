# Content Review — Pilot Pathway: "My parent keeps falling or seems physically weaker"

> Situation id: `keeps-falling` · Status: **`draft`** (revised 2026-10-05 per your feedback) · Purpose:
> gold-standard pilot pathway — once this is genuinely strong end-to-end, we use it as the template
> for the other six.
>
> **§0 (the opening experience and question order) is SETTLED.** Revisions 1–3 (framing, falls-focused
> questions, lives-alone/found-on-floor, two-layer scoring, falls-specific guidance) remain unchanged
> and verified working.
>
> **§4 is updated again, reflecting your two-tier decision.** Still nothing built, this is a revised
> worksheet, not an implementation. It proposes a concrete split into Tier 1 (Get Emergency Help Now /
> Call 911) and Tier 2 (Get Medical Care Today), maps every original item into one of the two, proposes
> a new blood-thinner question for the head-injury escalation you asked for, clarifies that new
> confusion is already covered, and checks whether the found-on-floor logic already does what you
> described. Several items are explicitly flagged for your yes/no since you said "etc." rather than
> naming every item. Nothing moves to approved until you've been through all of §4.

---

## 0. The opening experience — first pass, per your brief

This section is new. Your brief asked for a short reassuring transition, plain language, easy
questions first, a simple non-alarming progress indicator, and a clear sense that this isn't a test.
Applied here, and in the shared screen components so every future pathway gets the same treatment
automatically:

- **Intro screen rewritten.** Below the situation's own reassurance line, a new block states plainly:
  about 5 minutes, no rush, you don't need all the answers, you can go back and change anything, your
  answers stay private, and "this isn't a test." Screenshot: `09-new-intro.png`.
- **Question order changed** from Falls → *Fall severity (red-flag checklist)* → Found on floor →
  Mobility → Balance → Hazards → Lives alone → Caregiver, to: **Falls → Mobility → Balance → Home
  hazards → Lives alone → Fall severity → Found on floor → Caregiver.** The two heaviest questions
  (the red-flag checklist and found-on-floor) now come after five light, observational questions
  instead of appearing second. Nothing about scoring or triggers changed, only the order things are
  asked in — order doesn't affect the sum or which triggers can fire. Screenshot: `10-question-1-new-
  order.png` confirms Q1 is still the easy "have they fallen" question.
- **Progress indicator simplified.** Dropped the percentage number (e.g. "25%"), kept only "Question X
  of Y" and the visual bar. A percentage ticking up can read like a countdown or a test score; a plain
  step count feels calmer.
- **Softened the help text on the two heaviest questions.** Fall severity now adds "Take your time,
  there's no need to get this perfectly right." Found-on-floor now adds "Answer as best you can, even
  if you're not entirely sure."
- **One suggestion I did NOT implement, flagging for your reaction:** the fall-severity option "Lost
  consciousness, even briefly" reads a little clinical. A softer everyday phrasing could be "Passed
  out or blacked out, even briefly." I didn't change it myself since it's part of the emergency-trigger
  content you specifically want a dedicated review pass on — just flagging it as a concrete example of
  the "everyday language" pass, for you to accept, reject, or reword.
- **Already true, confirmed rather than changed:** the heavier questions don't get any alarming visual
  treatment (no red, no warning icons) — they look exactly like every other question. The actual
  urgency only shows up afterward, in the result, which is where it belongs.

Verified live in the browser: new intro renders correctly, Question 1 of 8 is still the falls-count
question, no percentage text appears anywhere near the progress bar, zero console errors.

---

## 1. Situation framing — updated to your text

| Field | Content |
| --- | --- |
| Intro | "A fall, new unsteadiness, or noticeable weakness is worth paying attention to. Sometimes the cause is simple and fixable; other times it can signal a change in strength, balance, medications, vision, or health." |
| Reassurance | "You don't have to wait for a serious injury to start looking into what's changed. Noticing the pattern now gives you more options to help your parent stay safe and independent." |

---

## 2. Questions — content and rationale for each

> **Note on numbering:** the Q1–Q8 labels below describe *content*, not the live display order — the
> actual on-screen order was changed in Revision 4 (§0) to ease in with lighter questions first. See
> §0 for the current order: Falls → Mobility → Balance → Home hazards → Lives alone → Fall severity →
> Found on floor → Caregiver.

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

## 4. Red-flag / emergency triggers — revised worksheet, reflecting your last decisions

**Status check: nothing below is built yet.** Per your closing instruction, this is the worksheet
updated to reflect what you decided, so you can review the individual items again before anything
gets implemented. Once you confirm (or mark up further), I'll build exactly this and bring back a
final version, still in draft, for your sign-off.

### 4a. The two-tier architecture — one proposal, one open question for you

You asked for two real, separate responses instead of one blended one:

1. **Get Emergency Help Now / Call 911** — true emergencies.
2. **Get Medical Care Today** — needs prompt evaluation, not automatically 911.

Here's how I'd build that without disturbing the four shared bands you locked in earlier (Keep
Watching / Plan a Conversation / Take Action Soon / Get Immediate Help):

**Proposed approach.** Both tiers still land the family on the "Get Immediate Help" band underneath
(so the surrounding guidance content, common mistakes, conversation starters, healthcare questions,
stays the serious/urgent version, not the calmer "Take Action Soon" version). What changes is the
**alert on top of it**: Tier 1 shows a red "Get Emergency Help Now — Call 911" callout, Tier 2 shows a
visually distinct but less alarming amber "Get Medical Care Today" callout. Different heading,
different color, different message, same underlying band.

**The alternative I didn't pick, flagging in case you prefer it:** route Tier 2 to the existing "Take
Action Soon" band instead of "Get Immediate Help." The trade-off is that Take Action Soon's current
guidance content is written around a "this week" timeframe, which would need rewriting to say "today"
wherever Tier 2 triggers it, and it would show the calmer Take Action Soon framing underneath an
urgent "today" headline, a slight mismatch. I'd recommend the first approach, but it's your call since
it affects how urgent the full page feels, not just the headline.

### 4b. Tier 1 — Get Emergency Help Now / Call 911

Your message named loss of consciousness, seizure, significant new confusion, repeated vomiting, new
weakness/numbness, slurred speech, and inability to stay awake explicitly. Mapped to the existing
checklist items, plus two I've kept here from the original list that weren't in your examples, flagged
for your explicit yes/no since "etc." could reasonably include or exclude them:

| What the family sees | In your list? | Proposed tier |
| --- | --- | --- |
| Passed out, blacked out, or lost consciousness, even briefly | Yes, explicit | Tier 1 |
| Had a seizure | Yes, explicit | Tier 1 |
| Seemed more confused than usual afterward | Yes, explicit ("significant new confusion") | Tier 1 |
| Vomited more than once | Yes, explicit ("repeated vomiting") | Tier 1 |
| New weakness, or trouble speaking, walking, or seeing | Yes, explicit (weakness/numbness, slurred speech) | Tier 1 |
| Unusually drowsy or hard to wake | Yes, explicit ("inability to stay awake") | Tier 1 |
| Severe or worsening headache | **Not in your list — my proposal to keep it Tier 1.** A new or worsening headache after a fall is a classic warning sign for bleeding around the brain, especially in older adults. ☐ Confirm Tier 1 ☐ Move to Tier 2 |
| Significant bleeding | **Not in your list — my proposal to keep it Tier 1.** Uncontrolled bleeding is generally a 911-level concern on its own. ☐ Confirm Tier 1 ☐ Move to Tier 2 |

### 4c. Tier 2 — Get Medical Care Today

The remaining three items from the original list, none of which you named as Tier 1:

| What the family sees | Proposed tier | Notes |
| --- | --- | --- |
| Couldn't get up without help | Tier 2 | Matches the original message's own "seek urgent care today" grouping |
| Possible broken bone | Tier 2 | Same |
| Hit their head — **alone**, nothing else selected | Tier 2 | See §4d — this one has a specific escalation rule |

### 4d. "Hit their head" — the compound rule you asked for

Per your instruction: alone, it's Tier 2 (prompt/same-day care, not monitor-at-home and not 911).
Combined with a blood thinner, or combined with any other concerning symptom, it escalates.

**The "combined with another symptom" half is already true by design**, nothing new to build. If
someone selects "Hit their head" *and* any Tier 1 item, the Tier 1 trigger fires on its own and wins
(the most-severe-result rule already in place, see §3), so head injury plus confusion or headache
already reaches Tier 1 automatically.

**The "combined with a blood thinner" half needs one new question**, since nothing currently asks
about blood thinners. Proposed, asked as a normal question in the sequence (not a pop-up or branch,
the system doesn't support conditional branching yet, so this would be asked to everyone, not just
people who selected head injury):

> **Does your parent take a blood thinner (such as warfarin, Eliquis, Xarelto, Plavix, or daily
> aspirin prescribed by a doctor)?** Yes / No / Not sure.

It would not be scored (asked but excluded from the risk score, the same treatment as "lives alone"),
and used only to decide: head injury + blood thinner = Tier 1, with its own message explaining that
blood thinners raise the risk of bleeding inside the skull that isn't obvious right away. Head injury
without a blood thinner and without any other symptom stays Tier 2.

☐ Approve this question as worded ☐ Reword ☐ Don't add it, handle blood thinner use a different way

### 4e. New confusion — already in the system, confirming placement

This one doesn't need a new question. "Seemed more confused than usual afterward" has been part of
the fall-severity checklist since Revision 3, it's option 4 in §4b above, and your message places it
in Tier 1. The old `acute-confusion` trigger you were reacting to is a *different*, unrelated trigger
built for other pathways (see §4g), falls has its own confusion coverage already.

One question for you: right now confusion is one single item, present or not. Your message said
"significant new confusion," which implies there might be a *milder* version that shouldn't be Tier 1.
Do you want two confusion options (something like "seemed a little confused or 'off'" vs. "seemed
significantly confused or disoriented"), with only the significant one in Tier 1, or is one item fine?

### 4f. Found on the floor — checking whether this already does what you're asking

You asked that the logic consider whether they could get up, how long they may have been down,
whether they were injured, and whether they seemed confused or unwell. The first two are already
asked directly in the found-on-floor question. The second two (injured, confused) are already asked
in the fall-severity question, and already combine with found-on-floor correctly through the
most-severe-result rule in §3, if someone was found on the floor *and* had an actual injury or
confusion, the Tier 1 (or Tier 2) trigger from §4b/4c fires and wins. Found-on-floor by itself,
with no injury or confusion present, stays at its own level, Take Action Soon, not Get Medical Care
Today or 911.

So structurally, I believe this is already built. The one place it could be more precise is "how long
they may have been on the floor," which is currently one vague option ("a while, not sure how long").
Would you like real time ranges instead (for example, under 30 minutes / 30 minutes to a few hours /
longer or unknown), or is the current single option sufficient?

### 4g. `acute-confusion` — unrelated trigger, unchanged

This is the dormant trigger from the original worksheet, built for `memory-change`, a question falls
never asks. It's unrelated to the new confusion coverage in §4e (different question, different
pathway). No action needed here for falls, it stays as-is for when we get to the memory-changes
pathway.

**Still nothing implemented.** Once you've gone through 4a through 4f, I'll build exactly what you
confirm, state assumptions back clearly wherever you left something open, and bring back a final
version before anything moves out of draft.

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
