# Aging Parent Navigator — Status Report

---

## 1. What has been completed

- **The core engine.** Situations, questions, scoring, and guidance all live as structured, versioned
  content rather than hardcoded into the site — this is what lets a new pathway get built without
  touching the underlying system each time.
- **The full family-facing experience**: homepage, the Concern Check flow (a calm opening, one
  question at a time, a progress indicator, support for select-all-that-apply questions), and the
  results page. Built and refined through several rounds of Sharon's direct feedback on tone, pacing,
  and wording.
- **A two-layer scoring system**: a numeric risk score plus independent red-flag overrides, with a
  severity-ranked resolution so a lower-priority signal can never downgrade or hide a real emergency.
  This is reusable engineering, not something that has to be rebuilt for each new pathway.
- **The Falls & Mobility pathway is content-complete** — real clinical questions, real scoring, and a
  two-tier emergency response (a red "Call 911" result and a separate amber "get medical care today"
  result), reached after many rounds of Sharon's direct clinical review.
- **Live and verified.** The site is deployed and publicly reachable. The Falls pathway was tested
  directly against the live production site, not just locally: 9 questions, both tiers show the
  correct label and wording, zero console or page errors.

## 2. What remains before the project is complete and ready to publish

**This depends on which "complete" Sharon means, and it's worth her confirming directly rather than
us assuming:**

- **Option A — the phased pilot scope**, which is what was discussed and agreed a few messages ago:
  Falls (done) plus the "Not Sure" pathway, optionally Caregiver Overwhelm, with the other four
  pathways fully hidden, basic functionality (saved assessments, working email), and privacy/terms in
  place, before inviting a small group of families.
- **Option B — the full original seven-pathway site**, all situations reviewed to the same depth as
  Falls, every integration live, before anyone outside the team sees it.

**Remaining work common to both options:**

- A privacy notice and terms of use (none exist today beyond a one-line disclaimer).
- The "educational, not medical advice" disclaimer shown explicitly at the start of the Concern Check,
  not just in the footer.
- A database so a completed assessment is actually saved, and a working "email my summary" button —
  neither exists yet; right now nothing persists anywhere.
- An attorney's review of the privacy notice and terms before real families participate.

**Additional for Option A:** the "Not Sure" pathway fully reviewed (it's still on original placeholder
content), and the four unused pathways hidden from the homepage. Caregiver Overwhelm only if time
allows.

**Additional for Option B:** all six remaining pathways fully reviewed to the same depth as Falls, plus
every integration (analytics, scheduling) built out, not just the minimum.

## 3. Estimate of additional time needed

**Engineering work, independent of which option Sharon picks** — this part I can estimate with
confidence:

| Item                                                 | Estimate                 |
| ---------------------------------------------------- | ------------------------ |
| Hide the four unready pathways                       | ~1 day                   |
| In-flow disclaimer on the Concern Check              | ~1 day                   |
| Privacy notice & terms — drafting (not legal review) | ~1–2 days                |
| Database + saved assessments + working email         | ~4–6 days                |
| **Subtotal**                                         | **~7–10 developer-days** |

## 4. Realistic completion timeline, including a target publication date

Suggested milestones once the date is set, so there's a visible path rather than one date at the end:

1. Sharon tests and formally approves Falls (no engineering work blocking this — her pace).
2. Privacy notice, terms, and in-flow disclaimer drafted; attorney engaged for review.
3. Database and working email live; four unready pathways hidden.
4. "Not Sure" pathway content review begins, using the same process as Falls.
5. Legal review clears; "Not Sure" approved; small group of families invited.
6. _(If Option B)_ remaining five pathways move through the same review process, one at a time.

## 5. What we need from Sharon to finish the remaining work

- **Confirm which option in §2** she means by "complete."
- **Keep a steady review cadence** on the remaining pathway content — this has consistently been the
  actual pace-setter for the project, more than engineering time.
- **Engage an attorney soon** for the privacy notice and terms review, since that timeline isn't
  something we control.
- Her own testing pass and formal approval of the live Falls pathway, whenever she's able to.

---

## Appendix A — Data & privacy (answers to her earlier four questions)

**What information will we actually collect and store?** Only what's needed to show a result and,
if offered, follow up: which situation was selected, the answers given (selected options, not free
text), and the resulting risk level and any alert that fired. An email address only if the family
chooses to enter one — nothing is stored if they skip it. Nothing else. The parent is never asked for
their name anywhere in the current design, by original design, not a new addition for this round.

**Where will it be stored, and how will it be protected?** A managed Postgres database (Neon),
encrypted in transit and at rest. Credentials stored only as environment variables, never in the
codebase. No public-facing way to read stored data back out — the live site can only write a new
record, nothing lists or exposes existing ones. Honest limitation: this is a standard secure setup, not
a formal HIPAA business-associate arrangement; our understanding is that HIPAA likely doesn't apply
here since this is educational rather than Sharon acting as a covered entity, but that's worth her
attorney confirming directly rather than taking our word for it.

**Will users be able to request deletion of their information?** Yes, handled manually for this phase
rather than a self-service feature: the privacy notice states that anyone can email to request
deletion, handled by hand within a stated number of days. A self-service option is reasonable to build
later if the user base grows beyond a small, known pilot group.

**How much additional development will this functionality require?** Covered in the ~4–6 day estimate
in §4 above — database setup, connecting the Concern Check to save a completed assessment, and wiring
the existing Brevo account to actually send the summary email.

## Appendix B — What explicitly waits regardless of which option is chosen

- Accounts, the full Comprehensive Assessment, and the downloadable Care Plan (original Phase 2).
- The Trusted Provider Network (original Phase 3).
- Consultation/scheduling booking — stays "Coming soon."
- The willingness-to-pay test — premature before there's real usage to learn from.
- The multi-concern follow-up prompt and the printable Observation Journal.
- The original Phase 1 success-criteria numbers (500 visitors, specific conversion percentages) were
  sized for a public validation launch, not this phase, and should be replaced with simpler
  pilot-appropriate questions rather than carried forward as-is.
- A dedicated feedback-collection feature — direct conversations with a small, known group instead.
