# Content Review — Pilot Pathway: "My parent keeps falling or seems physically weaker"

> Situation id: `keeps-falling` · Status: **`draft`** (revised 2026-09-06 per your feedback) · Purpose:
> gold-standard pilot pathway — once this is genuinely strong end-to-end, we use it as the template
> for the other six.
>
> **Revision 2.** Everything below reflects your feedback: rewritten framing, a falls-focused
> question set, caregiver-overwhelm asked-but-not-scored, situation-specific score bands, a rebuilt
> red-flag layer, the updated road-ahead sentence, and falls-specific guidance for all four bands
> (replacing the shared generic text via the `guidanceOverrides` mechanism). All of it is live in the
> app and verified working — not just written. **Status is `draft`, not `approved`** — this is ready
> for your final review, not yet ready to ship to families.

---

## 1. Situation framing — updated to your text

| Field | Content |
| --- | --- |
| Intro | "A fall, new unsteadiness, or noticeable weakness is worth paying attention to. Sometimes the cause is simple and fixable; other times it can signal a change in strength, balance, medications, vision, or health." |
| Reassurance | "You don't have to wait for a serious injury to start looking into what's changed. Noticing the pattern now gives you more options to help your parent stay safe and independent." |

---

## 2. Questions — revised to your 5 areas + caregiver check-in

Now **6 questions**: your 5 falls-focused areas, plus caregiver-overwhelm (asked but excluded from
scoring — see §3).

**Q1 — Falls (past 12 months).** "Has your parent fallen in the past 12 months?" No / Once / More
than once / Not sure.

**Q2 — Fall severity (multi-select red-flag checklist).** "Did any fall cause an injury, involve
hitting their head, or leave them unable to get up without help? *Select all that apply.*"
Couldn't get up without help · Lost consciousness, even briefly · Hit their head · Seemed more
confused than usual afterward · Possible broken bone · Significant bleeding · Severe or worsening
headache · Vomited more than once · Had a seizure · Unusually drowsy or hard to wake · New weakness,
or trouble speaking, walking, or seeing · Not sure · *No — they were not hurt and got up on their own.*

This one question now does double duty: it feeds the numeric score (see §3) **and** the red-flag
trigger layer (see §4) — merging your "fall severity" area with your full red-flag symptom list into
one checklist, so the pathway doesn't need a separate 6th "tell us more" question. Flag if you'd
rather split these into two steps.

**Q3 — Mobility change.** "Has your parent become noticeably weaker, slower, or less steady when
standing or walking?" No / Somewhat / Yes, clearly / Not sure.

**Q4 — Balance / fear of falling.** "Are they holding onto furniture or walls, appearing unsteady, or
avoiding activities because they're afraid of falling?" No / Somewhat / Yes, clearly / Not sure.

**Q5 — Fall-specific home hazards.** "Are there fall-specific hazards in the home — loose rugs, poor
lighting, difficult stairs, cluttered walking paths, or lack of bathroom support (grab bars, non-slip
mats)?" No / Some / Several / Not sure.

**Q6 — Caregiver overwhelm.** (unchanged wording) Asked as part of this pathway, **does not
contribute to the fall-risk score** — see §3.

The old general "home management" question (clutter/mail/spoiled food) is removed from this pathway,
as requested — it's still used by other situations (`unsafe-alone`, `moving-in`, `refuses-help`) that
haven't been revised yet, so I left it untouched there rather than deleting it.

**Still open:** exact weights per answer are placeholder (same 0/2/4/1-ish pattern as before) — flag
if any should be reweighted once you see the full picture.

---

## 3. Scoring — now two independent layers, as you described

**Layer 1 — situation risk score.** Determines the band *only when no red-flag trigger fires.*
Questions 1, 3, 4, 5 use their single selected answer's weight as before. Question 2 (multi-select) is
scored as the **worst single selected item, not the sum** of everything checked — selecting three
moderate flags together doesn't stack into a worse score than the worst one alone. Caregiver-overwhelm
(Q6) is asked and stored, but **is excluded from this sum entirely** — verified directly: a test run
with every scored answer at minimum and caregiver-overwhelm set to "almost constantly" still produces
a total score of 0.

**Layer 2 — red-flag override.** Independent of the score. If it fires, it sets the band directly and
cannot be suppressed by a low score — verified: a run with only "lost consciousness" selected and
everything else minimal still lands on Get Immediate Help, even though the raw score alone would
otherwise be low.

**Situation-specific score bands** (no longer the same 0–3/4–7/8–12/13+ scale used everywhere else):

| Band | Score range | Max possible for this pathway |
| --- | --- | --- |
| Keep Watching | 0–3 | — |
| Plan a Conversation | 4–8 | — |
| Take Action Soon | 9–14 | — |
| Get Immediate Help | 15+ | max 20 (4+4+4+4+4 — each of the 5 scored questions tops out at 4) |

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

**Deliberately not built yet:** "living alone" / "found on floor" as their own trigger. You noted this
should raise concern but not automatically mean 911, with context mattering — that's a genuinely
different kind of signal (a *context* modifier, not a symptom), and there's no question capturing it
yet in this pathway. Rather than guess at how to weight it, I left it out. **Question for you:** do you
want a "does your parent live alone?" data point added to this pathway now, or is that better suited
to a later pathway/comprehensive assessment?

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
