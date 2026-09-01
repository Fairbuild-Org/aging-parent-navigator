# Content Review — Pilot Pathway: "My parent keeps falling or seems physically weaker"

> Situation id: `keeps-falling` · Status: `placeholder` · Purpose: this is the **pilot pathway** —
> per Sharon's direction, we're taking one situation from beginning to end until it's genuinely
> strong, then using it as the template for the other six.
>
> **How to use this doc:** everything below is the *current placeholder content*, shown exactly as
> it exists in the app today. Mark it up directly (strike through, replace, comment inline) or send
> changes back in whatever form is easiest — I'll translate them into the content JSON. Nothing here
> ships to families until it moves through the governance workflow in
> [`data/README.md`](../../data/README.md) (draft → in_review → approved by Sharon, versioned).

---

## 1. Situation framing

| Field | Current placeholder text |
| --- | --- |
| Title | My parent keeps falling or seems physically weaker |
| Short label (card tag) | Falls & mobility |
| Intro | "Falls are one of the clearest early signals that something is changing — and noticing this is exactly the right instinct." |
| Reassurance | "You're not overreacting. Paying attention now is how families prevent bigger problems later." |

**Review prompt:** does this framing match how a worried adult child would actually describe this
situation? Anything to soften, sharpen, or make more specific to falls vs. general "weakness"?

---

## 2. Questions in this pathway

This situation currently asks **4 questions**, pulled from the shared question pool:

### Q1 — `falls-recent` (area: physical)
**"In the last 3 months, has your parent fallen?"**
*Help text: "A slip, a stumble, or being found on the floor all count."*

| Answer | Weight |
| --- | --- |
| No | 0 |
| Once | 2 |
| More than once | 4 |
| Not sure | 1 |

### Q2 — `fall-injury` (area: physical)
**"Did any fall lead to an injury, or a time they couldn't get up?"**

| Answer | Weight |
| --- | --- |
| No | 0 |
| Yes | 4 |
| Not sure | 1 |

### Q3 — `home-hazards` (area: home-safety)
**"Are there signs the home is becoming harder to manage (clutter, spoiled food, unopened mail)?"**

| Answer | Weight |
| --- | --- |
| No | 0 |
| Some signs | 2 |
| Several signs | 4 |
| Not sure | 1 |

### Q4 — `caregiver-overwhelm` (area: caregiver)
**"How often do you feel overwhelmed caring for or worrying about your parent?"**
*Help text: "Your well-being is part of this picture too."*

| Answer | Weight |
| --- | --- |
| Rarely | 0 |
| Sometimes | 1 |
| Often | 3 |
| Almost constantly | 4 |

**Review prompts:**
- Are these the right 4 questions for a *falls* pathway specifically? The pool also has
  `mobility-change` ("noticeably weaker, slower, or less steady") — should that replace or join
  `home-hazards` here, since it speaks more directly to "seems physically weaker" (the second half
  of this situation's title)?
- Is home-hazards the right home-safety proxy for falls, or would something more falls-specific
  (stairs, rugs, lighting, grab bars) be more useful and more actionable in the guidance that follows?
- Are the weights right relative to each other? Right now a single unwitnessed fall with no injury
  (2) counts less than "often" feeling overwhelmed (3) — is that the intended balance?

---

## 3. Scoring for this pathway

With these 4 questions, the **minimum possible score is 0** and the **maximum is 16** (4+4+4+4).
Current bands (shared across all situations, from `scoring.json`):

| Band (family sees) | Score range | Reachable in this pathway? |
| --- | --- | --- |
| Keep Watching | 0–3 | Yes |
| Plan a Conversation | 4–7 | Yes |
| Take Action Soon | 8–12 | Yes |
| Get Immediate Help | 13–16 | Yes (e.g. repeated falls + injury + several home hazards + often overwhelmed = 15) |

**Review prompt:** these bands are currently the *same cut-points for every situation*, even though
different situations have different question sets and different max scores. Does 0–3 / 4–7 / 8–12 /
13+ feel right specifically for a falls scenario, or should falls have its own thresholds? (The
architecture supports per-situation cut-points if we want them — currently it's one shared scale.)

---

## 4. Emergency / red-flag triggers — separate clinical review layer

Per your instruction, these are **not** treated as casual content — flagged here explicitly for your
dedicated review before anything ships. Two triggers currently exist globally:

| Trigger | Condition | Applies to this pathway? |
| --- | --- | --- |
| `fall-with-injury` | `falls-recent = "multiple"` **and** `fall-injury = "yes"` | **Yes** — both questions are asked here |
| `acute-confusion` | `memory-change = "clear"` | **No** — this situation doesn't ask `memory-change` at all, so this trigger can never fire on the falls pathway |

**Finding to review:** only one of the two existing triggers can actually apply to this pathway. Is
that intentional (falls-specific dangers should have their own falls-specific triggers), or should we
add more? Candidates to consider, for your clinical judgment — none of these are implemented yet:

- A **single** fall (not "multiple") that resulted in injury or inability to get up — does one
  serious fall alone warrant immediate escalation, rather than requiring a repeat?
- Loss of consciousness, head injury, or suspected fracture from a fall
- Parent lives alone **and** was found after a fall (vs. someone present)
- A pattern of falls increasing in frequency over a short window

**Also note:** even without a named trigger firing, the score-based bands alone already provide a
safety net — e.g. multiple falls + injury + several home hazards + sometimes overwhelmed = 13, which
lands in "Get Immediate Help" by score even in combinations the named triggers don't cover. Worth
confirming that's sufficient, or whether explicit named triggers (with their own tailored message)
are still wanted for specific falls scenarios.

---

## 5. The road ahead (forward-looking roadmap)

| Section | Current placeholder content |
| --- | --- |
| What's happening now | "Reduced strength, balance, or confidence with walking often shows up as stumbles or falls before anything else." |
| What may come next | Falls tend to become more frequent once they start. • A fear of falling can lead to less movement — which, over time, weakens the body further. • A single serious fall can trigger a hospitalization and a sudden care decision. |
| Changes to watch for | New unsteadiness, holding onto furniture or walls • Avoiding stairs or activities they used to do • Bruises they can't fully explain |
| How to prepare | Ask their doctor about a falls-risk assessment and a medication review. • Consider a home safety review (lighting, rugs, grab bars, bathroom). • Keep a simple log of any stumbles or falls to share with the care team. |

**Review prompt:** this is already situation-specific (unlike the band guidance below) — does the
clinical substance hold up? Anything you'd add about medication side effects, vision, footwear, or
other falls-risk factors from your nursing experience that's missing here?

---

## 6. Band guidance this pathway currently shows (shared across all situations)

Per your decision, guidance stays shared for V1 — shown here so you can sanity-check whether it
genuinely reads as applicable to a *falls* scenario specifically, which is the bar you set for
keeping it shared.

**Keep Watching** — *"Keep watching — and trust your instincts."* Observations to monitor: new
falls/dizziness/unsteadiness, memory/mood/routine changes, whether daily tasks stay manageable.
Mistakes to avoid: assuming "no news is good news," dismissing repeating small changes, waiting for
something big.

**Plan a Conversation** — *"It looks like a good time to plan a conversation."* Observations:
stumbles/dizziness/walking changes, slipping daily tasks, mood/energy changes. Healthcare questions:
"Could any medications be affecting balance, memory, or mood?" / "Is a falls-risk or memory assessment
appropriate now?"

**Take Action Soon** — *"It's time to take action soon."* Observations: falls, injuries, new
weakness, confusion, missed meds, declining hygiene. Healthcare questions: "What could be causing
these changes, and how urgent are they?"

**Get Immediate Help** — *"This needs immediate attention."* "If there is an emergency or someone is
in danger, call 911. Contact your parent's doctor today."

**Review prompt:** does this read as genuinely falls-relevant, or does it feel generic enough that a
falls-specific version (using the override mechanism now built into the app) would serve families
better — e.g. "Plan a Conversation" mentioning a falls-risk PT referral by name, or "Take Action Soon"
naming a same-week falls evaluation specifically? You don't need to decide this now — just flag
anything that feels like a poor fit as-is.

---

## Next step

Once this pathway is marked up, I'll turn it into approved content (JSON, versioned, `approvedBy` /
`approvedAt` filled in) and we use the same structure to work through the remaining six situations.
