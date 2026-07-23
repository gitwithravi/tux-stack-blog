---
title: 'AI Speeds Up Coding, Not Engineering'
description: 'An opinionated workflow for building good-enough software with AI coding agents without surrendering architecture, judgment, or security.'
pubDate: 2026-07-23
heroImage: '../../../assets/images/posts/ai-coding-guide.png'
heroImageAlt: 'A developer reviewing a coding agent diff against PRD, PLAN, TRACKER, and AGENTS files on a dual-monitor workstation, with architecture, tests, and security panels visible.'
categories: ['AI', 'Software Engineering']
tags:
  [
    'ai-coding',
    'coding-agents',
    'software-engineering',
    'codex',
    'claude-code',
    'cursor',
    'llm',
    'architecture',
  ]
pinned: false
---

A developer once implemented WhatsApp OTP-based two-factor authentication for a campus application. The implementation looked perfectly reasonable: OTP expiry was handled, rate limiting was present, the expected tests passed, and everything worked during development.

Then real users started using it.

The rate limit was based only on the user's IP address. That is a common implementation and may work perfectly well for many consumer applications. But this application was being used on a university campus, where a large number of users shared the same public IP address.

The system interpreted several legitimate users as one user making repeated requests. Every fifth user in a minute started getting blocked despite doing nothing wrong.

The code was not syntactically incorrect. The feature worked exactly as implemented. The assumption behind it was wrong.

This is the part of AI-assisted development that gets discussed far less than it should. People talk about model rankings, MCP servers, context windows, token optimisation, sub-agents and orchestration. Very few people talk about how to build a normal application properly with a coding agent.

My central belief is simple:

> AI speeds up coding. It does not automatically speed up engineering.

The difference depends less on which coding agent you use and more on whether you remain responsible for the project.

## Why Use a Coding Agent?

Coding agents are incredibly useful. They can generate migrations, models, validation, CRUD interfaces, tests, documentation and repetitive application plumbing much faster than most developers can type them. They can explore unfamiliar repositories, trace dependencies and help you work in languages or frameworks you barely know.

Their greatest value is compressing implementation time after the important decisions have been made.

A developer who understands what needs to be built, where the code belongs and which constraints matter can get enormous leverage from an agent. A developer who delegates all of that judgment may still receive a working demo, but that demo can collapse as soon as it meets production traffic, unusual users or infrastructure constraints.

## Do Not Delegate the Whole Problem

A common way to use a coding agent is to say:

> Implement two-factor authentication.

The agent then decides how OTPs should be generated, where they should be stored, how they expire, whether delivery should be queued, how retries work, what should be rate-limited and which failure cases matter.

The developer sees the feature working locally and feels that the engineering problem has disappeared. It has not disappeared. The decisions were simply made implicitly by a model.

The model may store OTPs in a relational database when Redis would have been more appropriate. It may introduce Redis into a small application that does not need another infrastructure dependency. It may make an external API call synchronously during login or use IP-only rate limiting in an environment where thousands of people share an IP.

This is why I treat coding agents like brilliant junior developers. They may know more syntax, libraries and design patterns than I do, but they have less real-world context. They have not operated the system, dealt with its users or understood the organisation's infrastructure, budget and support capabilities.

The agent is there for generation. I am there for architectural decisions.

## Planning Before Coding Is the Biggest Win

The most valuable part of my workflow happens before the coding agent edits a single file. I begin with two separate planning conversations.

### First, Understand the Product

I ask an LLM to act as a user of the proposed application and discuss the idea with me one question at a time. This conversation is deliberately non-technical. At this point, I do not want database tables, API routes, frameworks or deployment architecture. I want to understand what the system is supposed to do.

Real users often describe the expected workflow but miss edge cases, permissions, corrections and failure conditions. An LLM is surprisingly effective at acting like a thorough user who keeps asking what happens next.

A prompt like this works well:

```text
Act as a real user of the project I am planning.

Discuss the product with me one question at a time. Keep this
conversation completely non-technical. Do not suggest frameworks,
databases, APIs or architecture.

Your goal is to help me clarify:
- who will use the product;
- what they are trying to accomplish;
- the normal workflow;
- missing cases;
- failure scenarios;
- permissions;
- confusing or contradictory requirements.

For every important decision, explain the practical pros and cons.
Continue until we have a clear description of the actual product.
```

The result of this conversation is not a technical specification. It is the actual project idea, described clearly enough that technical planning can begin.

### Then, Create the PRD

Once the product behaviour is clear, I start a new conversation and ask the LLM to act as a senior software developer. It again asks questions one by one, but this time the goal is to create a detailed project requirements document.

This is one of the biggest wins LLMs have given me. Creating a thorough PRD without an LLM now feels unnecessarily difficult.

I explicitly mention that the PRD will be consumed by a coding agent. A document written only for humans can depend on context and unstated assumptions. A document written for a coding agent must be explicit.

```text
Act as a senior software developer and requirements analyst.

I will provide the non-technical product description. Ask me
clarifying questions one at a time and help me create a complete PRD.

The final PRD will be saved as PRD.md and used directly by AI coding
agents, so it must be explicit and leave as little room for assumption
as possible.

Cover:
- actors and roles;
- workflows;
- fields and data rules;
- permissions;
- states and transitions;
- validation;
- edge cases;
- failure behaviour;
- security expectations;
- constraints;
- exclusions;
- acceptance criteria.

Use sensible defaults for minor implementation details, but ask me
about decisions that affect product behaviour, security, architecture
or data integrity.

Do not write the final PRD until the requirements are sufficiently clear.
```

Once `PRD.md` is ready, I pass it to another LLM and ask it to find gaps. I generally need just two iterations before the requirement is good enough to proceed.

```text
Review the following PRD as a critical senior engineer.

The PRD will be used by an AI coding agent. Identify:
- contradictions;
- undefined behaviour;
- missing permissions;
- missing failure cases;
- unclear state transitions;
- security risks;
- assumptions likely to produce incorrect implementation;
- acceptance criteria that cannot be verified.

Do not rewrite the document immediately. First list the gaps in
priority order and ask questions where a product decision is required.
```

## From PRD to PLAN.md and TRACKER.md

After the PRD is stable, I ask an LLM to act as a seasoned technical project manager and break the project into implementation phases.

### Create the implementation plan

`PLAN.md` explains how the project will be built. It breaks the work into phases, defines what each phase should achieve, and limits the scope so the generated code remains reviewable.

### Create the execution tracker

`TRACKER.md` records what has been completed, what remains, what is blocked and what evidence exists for completion.

I usually ask for the following structure:

- **Phase 0:** Project scaffolding and baseline configuration
- **Phase 1:** Models, migrations and foundational domain structures
- **Later phases:** Business workflows, permissions, UI, reporting, integrations and operational requirements

The prompt looks like this:

```text
Act as a seasoned technical project manager working with AI coding agents.

Using the attached PRD.md, create:

1. PLAN.md
2. TRACKER.md

The plan must be phase-wise and keep every phase small enough for a
human developer to review the generated code properly.

Use:
- Phase 0 for project scaffolding and baseline configuration;
- Phase 1 for models, migrations and foundational domain structures;
- later phases for business workflows, permissions, UI, reporting,
  integrations and operational requirements.

For every phase include:
- objective;
- requirements covered;
- implementation tasks;
- expected files or areas affected;
- acceptance criteria;
- tests that must pass;
- explicit exclusions;
- dependencies on earlier phases.

TRACKER.md should mirror the plan and provide status, notes, blockers
and completion evidence for every phase and task.

Do not combine unrelated features into one large phase.
```

I then review every phase manually. If a phase looks too large, I divide it into sub-phases or implement only a few points at a time.

> Generated code must remain small enough to understand, not merely small enough for the agent to produce.

When an agent produces ten files and seven hundred lines in one pass, it becomes very easy to approve the overall shape without understanding the decisions hidden inside it.

## AGENTS.md Is Where the Project Learns Discipline

Before implementation begins, I create `AGENTS.md`. This file contains the rules every coding agent must follow while working on the repository.

For me, that usually means thin controllers, business logic in a service layer and frontend code remaining primarily a representation layer. It also includes project-specific constraints, framework conventions, acceptance criteria and explicit restrictions such as not introducing caching unless requested.

Your preferences may be completely different. That is the point. `AGENTS.md` should describe how you want this particular project to be built, not repeat generic advice copied from the internet.

It also helps reduce what I call **AI slop**: hallucinatory imports, bloated boilerplate, duplicated logic, code added to the wrong layer, unnecessary dependencies and architectural shifts that nobody explicitly requested.

```text
Create an AGENTS.md file for this repository.

It will be used as binding guidance for AI coding agents. Base it on
PRD.md and PLAN.md, along with the existing framework conventions.

Include:
- project-specific architectural rules;
- coding standards;
- responsibilities of controllers, services, models and views;
- validation and authorization rules;
- testing expectations;
- performance expectations;
- prohibited shortcuts;
- phase acceptance criteria;
- commands required to verify changes.

Important rules:
- controllers must remain thin;
- business logic belongs in the service or domain layer;
- frontend and templates are representation layers only;
- do not introduce caching, queues, new infrastructure or dependencies
  unless required by the active phase or explicitly approved;
- do not claim completion until all acceptance criteria and tests pass;
- keep changes limited to the requested phase.

Before adding or modifying a file, the coding agent must state:
1. which file it wants to change;
2. why that file is the correct location;
3. what responsibility will be added;
4. whether the change conflicts with any rule in AGENTS.md.
```

A good `AGENTS.md` reduces AI slop substantially, but it does not remove the need for supervision. Important constraints must still be verified.

## The First Phases Set the Tone

The initial phases deserve more attention than later ones because agents learn from the repository they inherit.

When business logic already lives in services, the agent is more likely to place new logic in services. When authorization is consistent, it tends to reuse the same approach. When tests have a clear structure, generated tests usually follow it.

The reverse is also true. If the project already contains large controllers, business logic inside templates and random helper functions, the agent will treat those patterns as architectural guidance.

> AI amplifies the architecture it inherits.

Good architecture tends to produce better generated code, while technical debt tends to produce more technical debt.

## I Do Not Use Auto-Approve Mode

I never run coding agents in full auto-approve mode. Even when I am not reviewing every line as it appears, I remain close to the process.

Some people say this defeats the purpose of an autonomous agent. For me, the purpose is not to avoid watching code being written. The purpose is to build a working project.

Before implementing a phase, I use a prompt similar to this:

```text
Implement only Phase 2, points 1 to 3 from PLAN.md.

Before editing:
- read PRD.md, PLAN.md, TRACKER.md and AGENTS.md;
- inspect the existing code for related patterns;
- list the files you expect to create or modify;
- explain why each file is the correct location;
- identify architectural, performance or security risks;
- ask for permission before each file change.

Do not implement later points or unrelated improvements.

After implementation:
- run the required tests and validation commands;
- update TRACKER.md with evidence;
- provide a concise summary;
- show the git diff for review.
```

This gives me a chance to correct the direction before a poor decision spreads through multiple files. Steering during implementation is as important as reviewing afterwards.

## What I Delegate and What I Do Not

I am comfortable delegating structured, repetitive and easily verifiable work such as migrations, models, standard CRUD interfaces, unit tests, validation, documentation and mechanical refactoring.

I do not allow the agent to independently decide API design, authentication flows, authorization structure, core business logic, storage strategy, infrastructure dependencies or critical performance decisions.

I may ask the agent for suggestions, and I may accept an approach I had not considered. But the final architectural decision remains mine.

If I say "implement OTP authentication," the agent should not quietly decide whether OTPs belong in Redis or MySQL, whether delivery is synchronous, how retries work or whether IP-based rate limiting is sufficient. Those decisions depend on real users, infrastructure, operational capacity and failure tolerance.

## Review the Diff, Not the Summary

After every phase, I review the generated work. Acceptance criteria should contain the tests that must pass before the agent can claim the phase is complete, but passing tests is only one part of the review.

### Check placement

I first verify that the code exists in the correct layer. Perfectly written business logic still damages a project when it is placed in a controller, route file or view template where it does not belong.

### Check critical logic

I inspect permissions, identity, money, destructive operations, state transitions and privacy-related behaviour.

### Check performance assumptions

I look for N+1 queries, large synchronous operations, excessive memory usage and external API calls inside user-facing requests.

For changes to an existing repository, `git diff` is mandatory.

> The agent's confident summary is not the deliverable. The diff is.

## Do Coding Agents Always Save Time?

No.

For greenfield projects, coding agents usually make me significantly faster because I control the architecture and can document the rules before implementation starts.

Existing complex projects are different. A mature codebase may contain years of undocumented decisions, exceptions and workarounds. Sometimes you know the system better than any LLM can understand it, and explaining enough context takes longer than implementing the change manually.

Coding agents are still useful in such projects. They excel at repository exploration, tracing dependencies, generating tests, documenting unfamiliar code, performing narrow refactors and debugging contained problems.

The useful rule is simple: use coding agents where they reduce discovery and repetition. Do not assume they will be faster where deep business context matters more than code volume.

## Use Multiple LLMs Without Overcomplicating It

I frequently use multiple LLMs, but I do not run an advanced orchestration system. I copy and paste information between ChatGPT, Claude, Codex, Claude Code or whichever tools are useful.

One model helps discover requirements. Another creates the PRD. A different model critiques it. Another creates the plan. A coding agent implements it, and another model reviews difficult decisions or generated changes.

Multiple models are especially useful when I am uncertain about an implementation approach. Suppose I need to generate a report involving twenty tables and nearly one million rows. I ask different models to evaluate joins, indexes, batching, memory usage, date limits and synchronous versus asynchronous generation before anyone writes code.

```text
Act as a senior database and backend performance engineer.

I need to generate a report using approximately 20 tables and up to
1 million rows.

Do not write implementation code yet. Propose and compare viable
approaches for:
- required indexes;
- large joins versus staged data retrieval;
- batching and pagination;
- memory usage;
- synchronous versus queued generation;
- streaming versus stored report output;
- maximum allowed date range;
- transaction and locking concerns;
- failure recovery;
- expected database load.

For each approach explain:
- advantages;
- risks;
- likely bottlenecks;
- operational complexity;
- when it should or should not be chosen.

End with a recommendation, but clearly state the assumptions behind it.
```

When models disagree, I choose the approach closest to my understanding of the system. People may call that engineering judgment. Sometimes it is simply gut feeling developed through experience.

> The purpose of multiple LLMs is to create disagreement before code is written.

You do not need an agent swarm. Copy and paste still works.

## Good Enough Is Usually Good Enough

A good-enough project does what it needs to do within an acceptable range. A reset-password email arriving in thirty seconds instead of five may be good enough. A large report taking two minutes instead of ten seconds may also be good enough.

Most projects do not need to become another Google. They need to solve a real problem reliably enough to be useful.

Good enough does not mean careless. It means deliberately sufficient. The project should remain understandable, maintainable and operationally useful, but it does not need to be perfect before launch.

AI has made iteration cheaper. When the next update can be shipped in hours, there is less reason to spend months preparing for every theoretical future. Build something that satisfies the real requirement, observe how it behaves and improve it using actual evidence.

## One Hard Boundary: Security

Performance can be good enough. Some operations can be slower than ideal. Security cannot be treated casually.

For AI-enabled applications, I treat the model as an untrusted external dependency. It can fail, be manipulated, leak data, change behaviour or disappear.

Before shipping, verify that secrets are not committed, dependencies have no critical vulnerabilities, inputs are validated, authorization is enforced and sensitive data is not sent to external models without a clear reason. AI output should never be executed as SQL, shell commands, HTML or privileged application actions without validation.

I also want to answer four questions confidently:

1. Can I show the source to a security reviewer without embarrassment?
2. Do I know exactly what data leaves my infrastructure?
3. Can I disable the AI feature without breaking the core application?
4. Can I trace who did what and when?

If any answer is unclear, the project is not ready.

## Build Your Own Process

This workflow works for me. It may not work exactly the same way for you.

You may prefer different architectural patterns, larger implementation phases or more automation. That is fine. The important part is not copying my Markdown files or prompts word for word. It is preserving the thought process behind them.

Understand the product before designing the system. Write down requirements before generating code. Make architectural decisions explicitly. Keep changes small enough to review. Steer the agent while it works. Use multiple models to challenge difficult decisions, and optimise for the real use case rather than an imaginary future.

Coding agents are extraordinary tools, but they do not remove the need for engineering. They make engineering judgment more valuable because a poor decision can now be implemented across twenty files in five minutes.

The agent can generate the project.

You still have to build it.
