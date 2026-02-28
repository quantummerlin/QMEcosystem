# Board Sequencing Playbook

## How to Run Your AI Executive Board

This is the operational manual. The agent files define **what** each agent does. This file defines **when** and **how** you use them.

---

## The Golden Rule

**One agent at a time. Full cycle. Then next agent.**

Do not ask two agents to work simultaneously. Their outputs must feed into each other sequentially.

---

## Sequencing Protocols

### Protocol A: Full Product Launch (New Product or Major Overhaul)

Use this when launching Soul Blueprint to a new audience or doing a major redesign.

```
Step 1: Differentiation Strategist
        → Define positioning, language, and intellectual moat
        → Output: Positioning statement, proprietary terms, voice guidelines

Step 2: Conversion Architect
        → Rewrite landing page using differentiated positioning
        → Output: New hero section, benefit bullets, CTAs, FAQ

Step 3: Monetization Architect
        → Design pricing tiers, value ladder, and upsell structure
        → Output: Tier definitions, pricing, upgrade triggers

Step 4: Funnel Architect
        → Map the journey from free → highest-ticket
        → Output: Complete funnel map, email sequences, upgrade flow

Step 5: Retention Loop Engineer
        → Build habit loops and return triggers
        → Output: Progressive unlock system, temporal hooks, identity artefacts

Step 6: Data Feedback Agent
        → Define metrics and implement tracking
        → Output: Analytics events, A/B test plan, dashboard design

Step 7: Trust & Compliance Guardian
        → Final audit on everything above
        → Output: Compliance checklist, required disclaimers, red flags
```

### Protocol B: Quick Revenue Optimisation

Use this when you want to improve monetization without redesigning everything.

```
Step 1: Monetization Architect → Audit for revenue leaks
Step 2: Funnel Architect → Fix the biggest gap in the journey
Step 3: Data Feedback Agent → Ensure tracking exists for the change
Step 4: Trust & Compliance Guardian → Quick audit on new offers
```

### Protocol C: Conversion Emergency

Use this when traffic is good but conversions are poor.

```
Step 1: Data Feedback Agent → Identify exactly where users drop off
Step 2: Conversion Architect → Fix the highest-impact drop-off point
Step 3: Differentiation Strategist → Ensure messaging is distinctive, not generic
```

### Protocol D: Retention Crisis

Use this when users try it once and never return.

```
Step 1: Data Feedback Agent → Measure return rates and engagement depth
Step 2: Retention Loop Engineer → Design the first engagement loop
Step 3: Monetization Architect → Ensure free tier is valuable enough to create desire
```

### Protocol E: Quarterly Board Review

Run all agents in a lighter "review mode" every quarter.

```
Each agent: Audit current state → 3 recommendations → Priority ranking
Sequence: Differentiation → Conversion → Monetization → Funnel → Retention → Data → Compliance
Time: ~2 hours of focused Copilot work
Output: Prioritised action backlog for next quarter
```

---

## Copilot Invocation Templates

Copy-paste these directly into GitHub Copilot Chat:

### Full Audit Prompt
```
Read agents/README.md for context, then follow agents/[agent_name].md 
and perform a complete audit of the Soul Blueprint project. 
Focus on actionable findings. Output your top 5 recommendations 
ranked by expected impact.
```

### Specific Task Prompt
```
Read agents/README.md for context, then follow agents/[agent_name].md
and [specific task]. Use the project files in this workspace as 
your source material. Propose changes before implementing them.
```

### Cross-Agent Prompt
```
Read agents/README.md and agents/[agent_1].md and agents/[agent_2].md.
Use [agent_1] to [task], then evaluate the output through the lens 
of [agent_2] to check for [concern].
```

---

## Decision Log Template

After each agent session, record:

```markdown
## Session: [Date] — [Agent Name]

### Task
What was the agent asked to do?

### Findings
Key insights from the audit/analysis.

### Decisions Made
What actions were approved?

### Changes Implemented
What was actually built/changed?

### Metrics to Watch
What should we monitor to measure impact?

### Next Agent in Sequence
Who should be invoked next and why?
```

Store decision logs in `agents/logs/` to build institutional memory.

---

## Anti-Patterns (What NOT to Do)

1. **Don't run all agents on the same topic simultaneously.** Their outputs will conflict.
2. **Don't skip the Compliance Guardian.** It's tempting. It's dangerous.
3. **Don't let agents write code without strategy approval first.** Strategy → approve → implement.
4. **Don't optimise what you haven't measured.** Data Agent before Monetization Agent.
5. **Don't redesign the landing page every week.** Make one change, measure, then decide next move.
6. **Don't treat agent output as gospel.** It's expert input. You make the final call.

---

## The Compound Effect

Week 1: Position and convert better.
Week 2: Price and monetise smarter.
Week 3: Retain and engage deeper.
Week 4: Measure everything and ensure compliance.

Month 2: Iterate on what the data shows.
Month 3: Iterate again.
Quarter 2: Run the full board review.

**The edge comes from disciplined repetition, not one-time brilliance.**
