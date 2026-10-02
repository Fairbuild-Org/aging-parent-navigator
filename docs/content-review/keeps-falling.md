# Content Review — Pilot Pathway: "My parent keeps falling or seems physically weaker"

> Situation id: `keeps-falling` · Status: **`draft`** (revised 2026-10-03 per your feedback) · Purpose:
> gold-standard pilot pathway — once this is genuinely strong end-to-end, we use it as the template
> for the other six.
>
> **§0 (the opening experience and question order) is SETTLED.** Revisions 1–3 (framing, falls-focused
> questions, lives-alone/found-on-floor, two-layer scoring, falls-specific guidance) remain unchanged
> and verified working.
>
> **§4 is now the item-by-item worksheet you asked for.** Every red flag is broken out on its own line
> with a checkbox for your decision, instead of being described in paragraphs. Two specific clinical
> questions are called out inline for your judgment (whether "hit their head" alone should really be
> Get Immediate Help, and whether the two severity tiers implied in the current message text should
> become two formal triggers). Nothing in this section is live or changed yet, it's a worksheet, not
> an implementation — I'll apply exactly what you decide once you've gone through it.

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

## 4. Red-flag / emergency triggers — item-by-item worksheet, per your request

You asked to go through this list very carefully, one item at a time, since this is the layer that
can tell a family to call 911. Below is every individual red flag currently in the system for this
pathway, broken out on its own line rather than bundled into paragraphs, with a column for your
decision. Nothing here is approved yet — this entire section stays in **draft** regardless of the
rest of the pathway's sign-off, exactly as you asked.

Three triggers exist in the system. Only two can actually fire on this pathway — see the note on
`acute-confusion` at the bottom before you spend review time on it.

### 4a. `fall-severe-symptoms` — fires Get Immediate Help

Source question: Q "Did any fall cause an injury, involve hitting their head, or leave them unable to
get up without help?" (multi-select — a family can check more than one). Currently **any single item
below, alone, fires the trigger** — there's no "two symptoms together" requirement.

| # | What the family sees | Weight | Currently fires Get Immediate Help? | Your call |
| --- | --- | --- | --- | --- |
| 1 | Couldn't get up without help | 4 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 2 | Passed out, blacked out, or lost consciousness, even briefly | 4 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 3 | Hit their head | 3 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 4 | Seemed more confused than usual afterward | 4 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 5 | Possible broken bone | 4 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 6 | Significant bleeding | 4 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 7 | Severe or worsening headache | 3 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 8 | Vomited more than once | 3 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 9 | Had a seizure | 4 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 10 | Unusually drowsy or hard to wake | 4 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 11 | New weakness, or trouble speaking, walking, or seeing | 4 | Yes | ☐ Keep ☐ Change ☐ Remove |
| — | No — they were not hurt and got up on their own | 0 | No | (does not fire, no action needed) |
| — | Not sure | 1 | No | (does not fire, no action needed) |

**Current shared message**, shown regardless of which item(s) above were selected:

> "One or more of these signs can indicate a serious injury or a medical emergency. If your parent
> lost consciousness, can't be woken easily, has a severe headache, repeated vomiting, a seizure, or
> sudden weakness/trouble speaking or seeing, call 911 now. For a possible fracture, inability to get
> up, or new confusion, seek urgent medical care today."

Two specific things I'd like your judgment on, rather than deciding myself:

- **Item 3, "Hit their head," alone.** Right now it fires the same Get Immediate Help result as a
  seizure or loss of consciousness. A head bump with no loss of consciousness, no confusion, no
  headache, and no vomiting is often not a 911-level event clinically. Should "hit their head" by
  itself (nothing else selected) produce a softer result, for example Take Action Soon with advice to
  monitor for 24 to 48 hours, and only escalate to Get Immediate Help when paired with another item
  like confusion, headache, or vomiting?
- **The message already splits into two tiers, but the trigger doesn't.** You can see it in the
  message text above: some items ("call 911 now") read as more urgent than others ("seek urgent care
  today"). Right now that split only exists in the sentence, not in the system. Would you rather the
  architecture formally recognize two severity tiers here, true emergency items that say call 911, and
  urgent-but-not-911 items that say seek care today, each with their own message, instead of one
  combined trigger and one combined message? I can build that if you want it. It is a small change on
  top of what already exists, not a rebuild.

### 4b. `found-on-floor-concern` — fires Take Action Soon (not Get Immediate Help)

Source question: Q "Was your parent found on the floor after a fall?" (multi-select).

| # | What the family sees | Weight | Currently fires Take Action Soon? | Your call |
| --- | --- | --- | --- | --- |
| 1 | Yes, and they could not call or reach anyone for help | 3 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 2 | Yes, and they could not get up without help | 3 | Yes | ☐ Keep ☐ Change ☐ Remove |
| 3 | Yes, and they may have been on the floor for a while (not sure how long) | 4 | Yes | ☐ Keep ☐ Change ☐ Remove |
| — | No — they didn't end up on the floor, or got up right away | 0 | No | (does not fire) |
| — | Yes, but they were found quickly and were okay | 1 | No | (does not fire) |
| — | Not sure | 1 | No | (does not fire) |

**Current message:**

> "Being found on the floor, especially unable to get up, unable to call for help, or for an unknown
> length of time, is a meaningful safety signal even without other symptoms. It deserves prompt
> follow-up with their doctor this week."

This one is deliberately calibrated to never reach 911 on its own, per your instruction, it targets
Take Action Soon only. If any item from 4a is *also* selected, 4a wins and the result becomes Get
Immediate Help instead (verified, see §3) — found-on-floor can raise concern but can never soften or
hide a real emergency.

### 4c. `acute-confusion` — does not apply to this pathway

This trigger exists in the shared trigger file but checks a question (`memory-change`) that
**`keeps-falling` never asks**. It cannot fire here and has no effect on this pathway one way or the
other. It belongs to the `memory-changes` and `something-feels-different` pathways, which haven't been
revised yet, so it's included below only so the list is complete, not because it needs your review
right now:

> "A sudden, clear change in confusion or alertness can signal an urgent medical issue (such as
> infection or medication reaction). Contact their doctor promptly, or seek urgent care."

We'll bring this back for review when we get to those pathways.

**This entire section stays in draft** until you've gone through it. Once you have, I'll apply exactly
the changes you call out, line by line, and bring back an updated version for a final pass before
anything moves to approved.

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
