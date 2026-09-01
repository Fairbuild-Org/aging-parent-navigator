# Aging Parent Navigator™ — Direction & Architecture (V1)

> **Purpose of this document:** one source of truth for the team before development begins. It
> captures the product direction, the emotional promise, the phased build plan (with validation
> gates), the navigator-agnostic architecture, the data model, content governance, and the decisions
> that must be locked before anyone writes code.
>
> Companion doc: [`VALIDATION_REVIEW.md`](./VALIDATION_REVIEW.md) (the lean-MVP review and stack rationale).
>
> **Status (2026-07-18):** Overall architecture and phased direction **approved by client.** Phase 1
> situations, results framing, and success-target ranges **locked** (below). Coding does **not** begin
> until the Free Concern Check content & decision logic are finalized (§14).

---

## 1. Why we exist — the emotional promise

Every day, someone becomes a caregiver for the first time. There is no instruction manual, no
roadmap, no training — only questions.

Families aren't just looking for information. They're looking for **understanding, confidence, and
guidance.** The Aging Parent Navigator™ exists to be **the trusted companion families turn to when
they don't know what to do next** — *The Ultimate Caregiver's Companion.*

> We can't walk every family's journey for them — but we can make sure they never walk it alone.

**Our north star:** *No family should ever have to face one of life's most difficult seasons
wondering what to do next.* This stays central to everything we build.

**The promise, concretely:** help families move **from fear, confusion, and guilt → to clarity,
confidence, and compassionate action.** Every screen should feel like calm guidance from someone who
understands what the family is facing — not a clinical questionnaire or an informational website.

---

## 2. Vision & core objective

Build a **situation-first navigation platform** — not an informational website — that helps families
**understand what's happening, know what to do next, and confidently navigate the aging journey one
step at a time.**

The entry point is a question, not a menu:

> **"What's happening with your loved one?"**

Everything is organized around the family's *situation*, not around articles or services.

**Long-term (Life Navigators):** the same engine and philosophy power additional navigators
(caregiving, disability, hospital discharge, dementia). A "navigator" is a **content pack**, not a new
codebase. V1 priority remains simple: **build one exceptional experience that families trust.**

---

## 3. Product philosophy — the feature test

Every feature in V1 must accomplish **at least one** of these. If it doesn't, reconsider whether it
belongs in V1:

- Reduce fear.
- Increase confidence.
- Help families understand what they are experiencing.
- Guide caregivers toward the next appropriate step.
- Encourage productive conversations with healthcare professionals.
- Help caregivers feel supported rather than overwhelmed.

### Core design principles

1. **Compassion first.** Alongside clinical accuracy and safety, compassion is a core design
   principle. Every screen reassures families they are not facing this alone.
2. **Situation-first.** Meet families in their moment of worry; give them a path, not a library.
3. **Validate before you build heavy.** Each phase is a gate. Evidence unlocks the next phase.
4. **Clinical safety over cleverness.** No diagnoses. Educational framing. Human-authored logic for
   anything health-related.
5. **Teach families to be excellent observers — our differentiator.** We don't diagnose; we help
   families *recognize* meaningful changes, *document* them, and *communicate* them effectively to
   healthcare providers. This observer-and-advocate philosophy is a defining, hard-to-copy
   characteristic of the platform.
6. **Least data that still lets us learn.** Especially before accounts exist.
7. **Content is the product.** The situations / assessment / scoring / guidance IP is the critical
   path — not the code.

---

## 4. Phased roadmap (with gates)

| Phase | Scope | Gate to advance |
| --- | --- | --- |
| **Phase 1 — Validation** | Home page · Situation Navigator · Free Concern Check (5–10 q) · Family Guidance Summary + immediate next steps | Meets Phase 1 success criteria (§8) |
| **Phase 2 — Depth** | User accounts · Comprehensive Assessment (10 domains) · Personalized Family Care Plan (downloadable) · Observation Journal | Sustained assessment usage + willingness-to-pay signal |
| **Phase 3 — Platform** | User dashboard · Resource library · Trusted Provider Network *framework* · Admin dashboard | Family-side traction + legally cleared revenue model |

**Phase 1 is the validation MVP** plus the situation-first framing. Treat it as a real gate: if it
doesn't clear the bar, that is a finding, not a failure — and it saves months.

---

## 5. Phase 1 situation pathways (LOCKED)

These seven situations are the initial entry points for the Situation Navigator:

1. My parent keeps falling or seems physically weaker.
2. I'm noticing memory, confusion, or personality changes.
3. My parent is struggling at home but refuses help.
4. I'm worried my parent is no longer safe living alone.
5. My parent may need to live with me, and I don't know what that requires.
6. I'm overwhelmed as a caregiver and need help from my family.
7. I'm not sure what is wrong — I only know something feels different.

Each situation routes into the Free Concern Check, weighting the relevant question areas. Situation #7
is the "I just know something's off" catch-all and should feel especially reassuring. Situation #6 is
caregiver-centered — a reminder that **the well-being of the person seeking help is part of the
situation.**

---

## 6. Free Concern Check — flow

- **5–10 questions, under ~5 minutes.** One question/area per screen with a progress bar.
- **Plain, reassuring language**; a **"Not sure"** option on every item.
- **At least one caregiver-health question is included in Phase 1** (e.g. caregiver stress /
  feeling overwhelmed). Caregiver well-being is not postponed entirely to the comprehensive
  assessment.
- **No login;** persist progress in Zustand/`sessionStorage`.
- **Email capture at the results step** ("get your full Family Guidance Summary"), with an on-screen
  summary so it isn't a bait-and-switch.
- **Safety escape hatch (emergency triggers):** if answers indicate acute danger (recent fall + can't
  get up, self-neglect, signs of abuse, acute confusion), immediately surface *Get Immediate Help*
  guidance ("contact their physician or call 911"), not just a summary.

The comprehensive assessment (Phase 2) covers 10 domains: Physical Health, Memory & Thinking, Home
Safety, Daily Living, Emotional Well-Being, Social Connection, Financial Well-Being, Legal & Planning,
Caregiver Health, Future Planning.

**One primary concern per session (LOCKED, 2026-08-20).** V1 does not support selecting or combining
multiple situations in a single pass — this protects the 5-minute promise and avoids combinatorial
complexity before the core loop is validated with real users. Two things already soften the gap: the
question pool is shared across situations (so cross-cutting concerns like caregiver strain surface
regardless of which situation was picked), and the "Not sure which fits?" pathway already asks a
broader spread of questions for people who don't cleanly bucket. **Deferred enhancement:** a
"Noticed something else too?" prompt after the Family Guidance Summary, offering a second pass through
a different situation — intentionally *not* built for initial launch; revisit after real-user testing.

---

## 7. Family Guidance Summary (results) — LOCKED framing

Families receive a **Family Guidance Summary**, not a "risk score." Technical risk classifications
stay in the background; the family sees reassuring, action-oriented guidance. Every summary explains:

- **What we noticed.**
- **What deserves attention first.**
- **Helpful observations to monitor.**
- **What to do today or this week.**
- **Common mistakes to avoid** — what families in this situation often get wrong; preventing a
  misstep can matter as much as any recommendation.
- **Conversation guidance** — how to begin difficult conversations *with the parent* and *with other
  family members*, in addition to questions to discuss with the healthcare team.
- **What may be coming next & changes to watch for.**
- **How to prepare for decisions ahead.**
- **What the results do _not_ necessarily mean** (guard against fear/over-reading).
- **Suggested next steps** + **educational resources.**

### User-facing guidance bands (foreground) → technical tiers (background)

| Family sees | Meaning | Internal tier (background) |
| --- | --- | --- |
| **Keep Watching** | Reassuring; monitor and note changes | Low |
| **Plan a Conversation** | Time to talk with parent / family / provider | Moderate |
| **Take Action Soon** | Address in the coming days/weeks | Elevated |
| **Get Immediate Help** | Urgent / safety — act now | Emergency trigger |

The goal is to leave families **informed and empowered — not frightened.** No diagnostic claims
("your parent has dementia"); frame everything as *warning signs to discuss with a professional.*

**Shared vs. situation-specific band guidance (LOCKED, 2026-08-20).** V1 ships with the band-level
guidance (common mistakes, conversation starters, healthcare questions) **shared across all
situations** — the same "Plan a Conversation" text regardless of which situation got a family there.
Sharon's stated long-term view: some of this should eventually become situation-specific (a family
dealing with repeated falls needs different conversation guidance and different healthcare questions
than a family dealing with memory changes) — but not before the core experience is validated, and not
as "seven versions of everything" built speculatively. The engine already supports this migration path
cheaply: a situation can declare a `guidanceOverrides` map (band → override file) in its content file,
and only the bands actually overridden diverge from the shared default — see
[`data/README.md`](../data/README.md#situation-specific-guidance-overrides-optional). No code change
is needed to graduate a situation's guidance one band at a time.

**Each pathway is a roadmap, not a snapshot.** Beyond "what to do today," every summary looks forward
— what families may encounter next, what changes to watch for, and how to prepare for decisions ahead
— so families feel *guided through the journey*, not handed a one-time result. *Phasing:* this
forward-looking guidance is **static, situation-specific content authored per band** and is fully
achievable in **Phase 1**. The *tracked-over-time* journey (return, re-assess, watch things evolve)
needs accounts + Observation Journal + dashboard and lands in **Phase 2/3** — noted so Phase 1 stays
lean.

---

## 8. Phase 1 success criteria (COMMITTED ranges — to sign off in writing before launch)

Committing to numbers before launch so results can't be rationalized afterward. Proposed by client;
refine together, then sign off.

| Metric | Target | Notes |
| --- | --- | --- |
| Concern Check **start rate** (of visitors) | **≥ 15%** | Top-of-funnel interest |
| **Completion rate** (of starters) | **≥ 50%** | **Primary metric** |
| **Results → email** conversion | **≥ 25%** | Lead capture |
| **Consultation / "help me" interest** | **≥ 8%** | Intent to get guidance |
| **Provider-connection interest** | **≥ 10%** | Tests Phase 3 demand for free |
| **Sample size before go/no-go** | **≥ 500 qualified visitors** and **≥ 75 completed assessments** | Directional, not statistically robust — paired with interviews below |
| **Qualitative** | **10–15 caregiver interviews** / detailed feedback responses | Where the *why* comes from |

> ⚠️ **Reconcile the funnel math before sign-off.** At the target rates, 500 *landing visitors* →
> ~15% start → ~50% complete ≈ **~38 completed assessments**, not 75. To comfortably clear **75
> completions** you'd need roughly **~1,000 qualified visitors**, *or* "500 qualified visitors" should
> mean *assessment starts* (500 starts × 50% = 250 completions). Recommend clarifying the denominator
> and, if it's landing visitors, planning traffic for ~1,000. The 75-completion + 10–15 interview
> pairing is the right instinct: small-N quantitative is directional; interviews carry the weight.

### 8.1 Willingness-to-pay validation (design together — client wants this in the criteria)

Interest clicks alone won't prove product-market fit; **real money is revealed preference.** Options:

| Mechanism | What it validates | Trade-off |
| --- | --- | --- |
| **A. Paid consultation** — price the 30-min consult (e.g. $49–$99), card-on-file at booking (Stripe / paid Calendly) | The actual secondary-goal revenue path | Highest friction; needs refund / no-show handling |
| **B. Family Care Plan pre-sale (fake-door)** — show a price for the Phase 2 plan ("Reserve yours — $X"), capture payment or intent | WTP for the *core product*, before it's built | If you charge, you owe fulfillment; intent-only is weaker |
| **C. Price survey (Van Westendorp)** | Rough price sensitivity | Stated, not revealed — a complement only, not proof |

**Recommendation:** run **A as the primary WTP signal** (real offer, real money), and add a
lightweight **B fake-door** to gauge product WTP without building Phase 2. Test **1–2 price points.**
Charging money alongside health guidance raises the bar on **refund policy, terms, and disclaimers** —
loop the attorney in. **Decision needed:** which mechanism(s) and which price point(s) to run.

**Traffic plan is part of the gate** — no traffic, no validation. Decide sources up front (Meta ads
to 45–65 caregivers, caregiver Facebook groups, Nextdoor, local partnerships) and tag with UTMs.

---

## 9. Content governance (REQUIRED before implementation)

The situations, assessment questions, scoring logic, safety/emergency triggers, and all family-facing
guidance are **clinical content** and the core IP. They must be governed accordingly:

1. **Review & approval before implementation.** No situation, question, scoring rule, safety trigger,
   or guidance text ships to code until reviewed and **approved by Sharon Collins, RN** (clinical
   authority). Safety/emergency triggers get an extra, explicit review pass.
2. **Versioning.** Content lives as **versioned data**, not hardcoded strings. Each content pack
   carries: `version`, `approved_by`, `approved_at`, and a changelog. Any update creates a new
   version; nothing is edited in place silently.
3. **Traceability.** Every stored assessment records the **content version** it was taken against, so
   results remain interpretable after content changes.
4. **Change workflow.** Draft → clinical review → approval → version bump → deploy. Emergency-trigger
   changes cannot be shortcut.

This section is the guardrail that lets us move fast on *code* without ever moving fast on *clinical
correctness.*

---

## 10. Architecture

### 10.1 Stack by phase

| Concern | Phase 1 | Phase 2+ |
| --- | --- | --- |
| Frontend + backend | **Next.js (App Router)** — route handlers / server actions | Next.js frontend + **NestJS** API tier |
| State (multi-step flow) | **Zustand** + `sessionStorage` | same |
| Database | **Postgres on Neon** | same (add backups / replicas as needed) |
| ORM | **Drizzle** (JSONB for answers) | same |
| Auth | none (anonymous) | **Managed auth** (Clerk / Auth.js / Supabase Auth) — never roll your own |
| Email | **Brevo** (existing account) | same |
| Scheduling | **Calendly** embed | same |
| Analytics | **PostHog** | same |
| Hosting | **Railway** | same |

**Why NestJS is deferred to Phase 2:** for a validation build, a separate API service doubles
operational surface for no user-visible benefit. It earns its place once accounts, admin, and richer
domain logic exist. Keep scoring **server-side** in both phases to protect the IP.

### 10.2 Navigator-agnostic engine

Model a **navigator as content-driven config**, so future Life Navigators are new data, not new code:

```
Navigator (versioned content pack)
  └─ Situations        (e.g. "My parent keeps falling…")
       └─ links to relevant question areas
  └─ Concern Check     Questions (answer options + weights), incl. ≥1 caregiver-health item
  └─ Scoring rules     (answers → internal tier → user-facing band)
  └─ Guidance templates (band → "what we noticed / attention / today-this-week / questions / next steps")
  └─ Safety triggers   (answer patterns → Get Immediate Help)
```

**Discipline:** build **one** navigator (Aging) cleanly and validate it before generalizing. Don't
build the multi-navigator framework up front — premature abstraction is how lean projects die. Keep
boundaries clean so generalization is cheap *later*.

### 10.3 Data model (start thin; JSONB for anything unfinalized)

Phase 1:

- `navigators` — id, slug, name, status, **content_version**
- `situations` — id, navigator_id, slug, title, body
- `assessments` — id, navigator_id, kind (`concern_check` | `comprehensive`), **responses JSONB**, **scores JSONB**, **band**, **content_version**, session_id, created_at
- `leads` — id, email, name, source/utm, **consent flags**, created_at
- `consultation_requests` — id, lead_id, notes, status, created_at
- `events` — id, session_id, step, meta, created_at *(optional in-house funnel log; keeps sensitive data in-house)*

Phase 2+ adds: `users`, `accounts`, `care_plans` (versioned), `observation_journal_entries`,
`assessment ↔ user` links.

---

## 11. Care Plan generation — decided

- **Deterministic / template-based — APPROVED for V1.** Expert-authored guidance blocks keyed to
  bands per area. Controllable, reviewable, consistent, defensible. Encodes Sharon's expertise.
- **AI-generated — later, and only for phrasing.** Never for the clinical decision.

A generated plan/summary includes: priority concerns · immediate actions · this week · this month ·
six-month roadmap · questions to ask healthcare providers · recommended resources.

---

## 12. Educational framework & Observation Journal

**Educational content** (primarily Phase 2+) follows a consistent structure per topic:

- Understanding the condition or concern.
- Common signs and changes families notice.
- Helpful observations to monitor.
- **Common mistakes families make — and how to avoid them.**
- Questions to ask healthcare professionals.
- **Starting difficult conversations** (with the parent and with family).
- When medical attention may be needed sooner.
- Practical caregiving tips.
- **Observation Journal** for tracking changes over time.

**Observation Journal — phasing note.** A *saved, ongoing* journal needs persistence and accounts, so
the full feature belongs in **Phase 2/3**. To honor the philosophy in Phase 1 without ballooning
scope, ship a **printable/downloadable observation template** (PDF) with the Family Guidance Summary —
low cost, on-brand ("become excellent observers"), and it doubles as a validation signal.

---

## 13. Trusted Provider Network — framework only in V1

The revenue engine: vetted local pros apply for membership and pay for **qualified referrals**
(recurring revenue) — a two-sided marketplace, not a directory.

**Two cautions, both material:**

1. **Chicken-and-egg.** Providers pay for qualified referrals; you only have those once families
   trust the Navigator. Sequencing (families first, provider network last, framework-only in V1) is
   correct — hold that line. Measure provider-connection *intent* in Phase 1 (§8).
2. **Paid referrals here are a legal minefield.** Referral fees touching Medicare/Medicaid services
   (home health, hospice) can implicate the federal **Anti-Kickback Statute**; several states have
   **patient-brokering** laws; elder-law and financial-advisor referrals have disclosure/compensation
   rules; assisted-living referral agencies are licensed in some states.
   **Action:** have a healthcare/elder-law attorney pressure-test the revenue model *before* designing
   it — the compliant structure may shape the architecture.

---

## 14. Concerns & compliance

- **Legal/medical framing.** RN branding reads as clinical authority → prominent disclaimers
  (*educational only, not medical advice, not a substitute for professional evaluation*). Lawyer-review
  Terms/Privacy/results language.
- **Third-party health data + consent.** The user is the adult child; the data subject is the parent,
  who hasn't consented. Minimize identifying data. Accounts (Phase 2) sharply raise the sensitivity
  bar — plan encryption at rest, retention policy, and account deletion from day one of Phase 2.
- **Email/SMS compliance** (CAN-SPAM; TCPA if texting) — explicit consent at email capture.
- **Trademark.** The brand is used as *Aging Parent Navigator™*; consider a formal trademark filing to
  back the ™ before major marketing spend.
- **Trust signals** are conversion-critical: Sharon's credentials/photo, a clear privacy promise near
  the email field, testimonials as they arrive.

---

## 15. Effort & critical path

| Phase | Estimate |
| --- | --- |
| Phase 1 (validation) | ~2–3 weeks *(once content is locked)* |
| Phase 2 (accounts + comprehensive assessment + care-plan engine + journal) | ~4–8 weeks |
| Phase 3 (dashboard + provider framework + admin) | multi-month |
| **Full platform, small team, gated** | **~3–6 months** |

**The critical path is Sharon's clinical IP** (situations, questions, scoring, safety triggers,
guidance templates), not engineering. Every week the content isn't finalized is a week the team can't
finish the Concern Check.

---

## 16. What is locked vs. still open

**Locked / approved:**
- Overall architecture & phased direction ✔
- Care-plan approach: deterministic / expert-authored ✔
- The 7 Phase 1 situation pathways ✔
- Family Guidance Summary framing + the 4 user-facing bands ✔
- Guidance Summary now includes **common mistakes to avoid**, **conversation guidance**, and a
  forward-looking **pathway roadmap** (what's next / what to watch / how to prepare) ✔
- "Excellent observers" as a stated **differentiator**; north-star mantra central ✔
- Caregiver-health question included in Phase 1 ✔
- Success-target *ranges* ✔ (pending written sign-off + funnel-math reconciliation, §8)
- Content-governance requirement ✔
- **One concern per session for V1** — multi-situation support explicitly deferred ✔ (§6)
- **Shared band guidance for V1**, with a built, verified override mechanism so situations can
  graduate to their own guidance later with no re-architecture ✔ (§7, §10.3)
- **End-to-end technical flow verified live** (home → situation → Concern Check → server-side
  scoring → Family Guidance Summary), screenshotted for client review, 0 console errors ✔

**Still open — to finalize before / alongside coding:**
1. **Free Concern Check content & decision logic** *(current priority — working one situation at a
   time, per Sharon)*: real questions, answer options & weights, scoring cut-points, guidance copy,
   and — as a **separate, explicit clinical review layer** — emergency/red-flag trigger conditions.
   Pilot pathway: **"My parent keeps falling or seems physically weaker"** (`keeps-falling`), to be
   used as the template once genuinely strong end-to-end.
2. **Written sign-off** of the §8 success criteria (funnel denominator clarified).
3. **Willingness-to-pay test** — choose mechanism(s) and price point(s) (§8.1).

Once these are locked, Phase 1 has a clean, focused foundation to build against.
