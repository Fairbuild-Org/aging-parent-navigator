# Aging Parent Navigator — Status Report

> Written to answer Sharon's six numbered questions directly, in order. One field is marked
> `[DENNIS: fill in]` — total hours — since I have no way to generate that number myself. Everything
> else, including a concrete proposed publication date, is answered as fully as I can answer it.

---

## 1. Development history and time invested

**When work began and what happened, by actual date** (from the project's own records, not memory):

| Date                    | Milestone                                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 2026-06-18              | Project first discussed — validation-first concept and lean MVP direction                                                   |
| 2026-06-19 – 2026-07-23 | Direction-setting phase: situation-first platform concept, architecture, phased roadmap agreed, before any code was written |
| 2026-07-24              | First commit — architecture and platform direction documented                                                               |
| 2026-07-24 – 2026-07-28 | App scaffolded, initial pages and content structure built                                                                   |
| 2026-08-01              | Project structure finalized                                                                                                 |
| 2026-08-11 – 2026-08-14 | Homepage refined per Sharon's direct feedback (warmth, copy, situation cards)                                               |
| 2026-08-20 – 2026-09-02 | Falls pathway selected as the pilot; first content-review round                                                             |
| 2026-09-07 – 2026-09-15 | Two-layer scoring system built; Falls pathway revised through several rounds                                                |
| 2026-09-24 – 2026-10-08 | Opening-experience redesign; two-tier emergency response (red/amber) built and finalized                                    |
| 2026-10-21 – 2026-10-28 | Status reporting, phased-launch planning, and today's fix confirming unreviewed pathways are no longer publicly reachable   |

So: **roughly one month of direction and planning before any code existed**, then **about three months
of active building**, from the end of July through today.

**Approximate hours, and how they broke down across development, revisions, testing, and time spent
waiting on feedback:**

`[DENNIS: fill in — the date ranges above should make this much faster to estimate than starting from
scratch, since each block of calendar time is already identified]`

---

## 2. Firm publication timeline

**Target: 2–3 weeks from today — Wednesday, November 11 at the earliest, Wednesday, November 18 at
the latest.** Two weeks is the fast path, both tracks below moving in parallel without delay. Three
weeks is the realistic path if either one needs an extra round. Either way, this is tighter than the
original proposal because the schedule below runs the content review and the legal/engineering track
genuinely in parallel from day one, not with legal starting only after content finishes.

| Dates                    | Milestone                                                                                    | Active dev, or awaiting feedback?                                               |
| ------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Oct 28 (today)           | Unreviewed pathways confirmed hidden from public access (done, verified live)                | Active dev                                                                      |
| Oct 28 – Oct 30          | Privacy notice & terms drafted; in-flow disclaimer added; attorney engaged same day          | Active dev                                                                      |
| Oct 28 – Nov 3           | Database + saved assessments + working "email my summary" built                              | Active dev                                                                      |
| Oct 28 – [Sharon's pace] | Sharon tests and formally approves the live Falls pathway                                    | **Awaiting feedback**                                                           |
| Oct 29 – Nov 7           | "Not Sure" pathway: questions, scoring, and guidance drafted and reviewed in rounds (see §3) | Alternates: active dev while drafting, **awaiting feedback** between each round |
| Oct 30 – Nov 11          | Attorney review of privacy notice & terms, running alongside content review, not after it    | **Awaiting feedback** (external)                                                |
| Nov 10 – Nov 14          | Final integration testing across both pathways; "Not Sure" approved                          | Active dev + final sign-off                                                     |
| **Nov 11–18**            | **Target: invite the first small group of families**                                         | —                                                                               |

**What has to hold for the fast end (Nov 11) rather than the realistic end (Nov 18):**

- "Not Sure" content review stays on a tight, near-daily cadence for about a week and a half, rather
  than the week-plus gaps between rounds that happened earlier in the project.
- An attorney is engaged **today or tomorrow** and turns around review within about two weeks,
  running the same two weeks as content review rather than starting after it.
- Caregiver Overwhelm stays **outside** this date entirely (see §3) — it never holds up publication
  either way.

If both move at that pace, November 11 is real. If either needs one more round, November 18 is the
realistic fallback, not a slip, it's already built into the range. If something pushes past both, I'll
flag it the moment it's clear rather than let the date pass quietly.

---

## 3. Remaining pathway work

**"Not Sure" (`something-feels-different`)** — currently on its original placeholder content, never
reviewed. What's left, using the same process Falls went through:

- Confirm or revise its framing and the specific questions it asks (it currently pulls a loose mix
  touching memory, mood, weight, and falls — worth a real decision on whether that's the right set for
  a catch-all pathway, not just inherited as-is).
- Scoring and cut points.
- A deliberate decision on emergency triggers — this is the only other pathway besides Falls that asks
  about memory changes, so it's the first place the existing-but-unused confusion trigger could
  actually become relevant, worth discussing specifically rather than assuming.
- Guidance content for each result level.

Expect this to move faster than Falls did — the question format, the two-tier trigger pattern, and the
review process are now established rather than being built for the first time — but it still requires
real rounds of Sharon's judgment, not just engineering time.

**Caregiver Overwhelm** — realistically, this should be treated as **separate from the publication
date above, not a dependency of it.** The honest answer to whether it can be included without delay:
only if its review happens in parallel and finishes early — it should never be allowed to push the
November date. If it's ready in time, it ships alongside the other two. If not, it ships right after,
without having held anything up.

---

## 4. Privacy and data handling

Three specific things to clarify, and one real decision worth Sharon's explicit confirmation before
it's built:

**Will assessments be saved when no email is given?** Recommending **yes, with one addition**: every
completed assessment, whether or not an email is given, gets saved with a short, random, non-identifying
reference code shown on screen at the end. This is what makes the next question answerable — without
it, an anonymous completion has no way to ever be found again, not even by the person who completed it.
With it, someone can request deletion by quoting that code, with or without having given an email.

**How would records be identified for deletion requests?** By email, for anyone who gave one. By the
on-screen reference code, for anyone who didn't. Either way, a request is handled manually for this
pilot — someone emails asking for their information to be removed, and it's deleted by hand within a
stated number of days. No self-service deletion feature yet; that's reasonable to build later if the
group using this grows beyond a small, known pilot.

**What's necessary to retain for the pilot?** The situation selected, the specific answers given,
the resulting risk level and any alert shown, the content version (so a result stays interpretable
later even as content changes), a timestamp, the reference code, and an email only if offered. Nothing
else — no name, no identifying detail about the parent, no device or location information collected at
the application level.

**This is a recommendation, not something already built** — worth Sharon's explicit yes before it's
implemented, since she's been clear this needs real care.

---

## 5. Launch readiness — what must be true before any family is invited

- [x] **Unreviewed pathways are not publicly reachable.** Done today, verified directly against the
      live site: all six unapproved pathways return a not-found page, even by direct URL. Only Falls is
      currently public.
- [ ] Sharon has tested and formally approved the live Falls pathway.
- [ ] "Not Sure" content reviewed and approved the same way.
- [ ] Privacy notice and terms of use published, after attorney review.
- [ ] The educational/not-medical-advice disclaimer shown explicitly at the start of the Concern Check,
      not just in the footer.
- [ ] Assessments are actually saved (per the design in §4), and "email my summary" sends for real.
- [ ] One more full verification pass across both live pathways, the same way Falls was checked today,
      before the first invitation goes out.

## 6. Current website accessibility

**Checked directly today, and now fixed and reverified:** until today, all seven pathways, including
the six still on unreviewed placeholder content, were publicly reachable from the homepage. That's
closed now. Only Falls & Mobility is visible or reachable, on the homepage or by direct URL — every
other pathway returns a not-found page, confirmed against the live production site just now, not
assumed from the code.

---

## Appendix A — What explicitly waits regardless of pace

- Accounts, the full Comprehensive Assessment, and the downloadable Care Plan (original Phase 2).
- The Trusted Provider Network (original Phase 3).
- Consultation/scheduling booking — stays "Coming soon."
- The willingness-to-pay test — premature before there's real usage to learn from.
- The multi-concern follow-up prompt and the printable Observation Journal.
- The original Phase 1 success-criteria numbers (500 visitors, specific conversion percentages) were
  sized for a public validation launch, not this phase, and should be replaced with simpler
  pilot-appropriate questions rather than carried forward as-is.
- A dedicated feedback-collection feature — direct conversations with a small, known group instead.
