---
title: 'When Agents Scale, Coordination Becomes the Product'
description: 'One agent can misunderstand a requirement. Several agents can misunderstand it in different ways. Part 4 of the LogCTL series on AI-native software engineering maps coordination, multi-agent orchestration, layered verification and governance at scale.'
pubDate: 2026-08-06
heroImage: '../../../assets/images/posts/ai-native-software-engineering-4.png'
heroImageAlt: 'A fleet of agents producing parallel changes that must be reconciled by a central coordination layer, illustrating how scale turns delegation into orchestration.'
categories: ['AI', 'Software Engineering']
tags:
  [
    'ai-native',
    'software-engineering',
    'ai-coding',
    'coding-agents',
    'agentic-engineering',
    'multi-agent',
    'governance',
    'code-review',
  ]
pinned: false
---

_Part 4 of the LogCTL series on AI-native software engineering_

The first three parts of this series moved through a clear progression.

AI changes the division of labour between engineers and machines. The productivity gains are real but difficult to measure because implementation becomes faster before the rest of the delivery system does. And reliable AI-native engineering depends on more than a capable model: it requires specifications, context, an execution loop, a harness and verification.

That is enough to make one agent useful.

It is not enough to make many agents safe.

Once a team becomes comfortable delegating bounded tasks to a single agent, the next step seems obvious. If one agent can inspect a repository, implement a change and prepare a pull request, why not run several agents in parallel?

One can work on the API while another updates the frontend. A third can write tests. A fourth can review security. A fifth can prepare documentation. Work that once moved sequentially can proceed simultaneously.

This is where AI-native engineering begins to look less like assisted development and more like a new operating model.

It is also where the risks multiply.

A single agent can misunderstand a requirement. Several agents can misunderstand it in different ways.

A single agent can introduce the wrong abstraction. Several agents can create competing abstractions before anyone notices.

A single pull request can consume a reviewer’s afternoon. A queue of machine-generated pull requests can overwhelm the team’s ability to establish confidence in anything.

At small scale, the engineering challenge is delegation.

At larger scale, the engineering challenge is coordination.

## Parallelism is attractive because generation is cheap

Traditional software teams already use parallel work, but human coordination naturally limits its speed. Engineers hold conversations, wait for clarifications, notice overlapping work and adjust plans as they go.

Agents can begin immediately.

That creates a strong economic incentive to parallelise. A team can assign one agent to investigate a bug, another to generate migration code and another to expand test coverage. Each works independently and returns with a result.

The research report identifies parallel and multi-agent orchestration as a frontier practice of 2026. One of the simplest enabling mechanisms is also one of the most important: giving each agent its own Git worktree and branch so concurrent changes do not overwrite one another.

This solves the mechanical collision problem.

It does not solve the architectural one.

Two agents can work in separate branches and still make incompatible decisions. One may add a new service while another extends an existing one. One may introduce a database column while another assumes the data will remain derived. Both changes may be internally coherent and individually tested.

The conflict appears only when the team tries to combine them.

Parallel execution therefore works best when the tasks are genuinely independent or when their shared decisions have already been resolved.

The mistake is assuming that because two tasks can be implemented separately, they can be designed separately.

## A practical example: three agents, one feature

Imagine a university system adding an early-warning feature for students at risk of failing a course.

The requirement appears easy to divide.

One agent can build the risk-calculation service.

A second can add a dashboard for faculty.

A third can create notification workflows for students and advisers.

Each agent receives a reasonable task. Each produces a working implementation.

The calculation agent defines risk using attendance and assessment scores. The dashboard agent assumes risk is a persisted status and adds a column to the student-course table. The notification agent assumes risk is an event emitted whenever a threshold is crossed.

None of these decisions is inherently absurd.

Together, they create three competing models of the same concept:

- risk as a calculated value;
- risk as persistent state;
- risk as an event.

The integration problem is not a merge conflict. Git can merge the files.

The problem is that the agents built different systems.

A human architect could have prevented this by deciding the domain model before work was distributed. The risk score might be calculated from source data, while threshold crossings are stored as events for audit and notification. The dashboard then reads the current calculation and the event history.

Once that decision exists, the tasks become safely parallel.

Without it, the agents merely accelerate divergence.

This is the first rule of multi-agent engineering:

> Parallelise implementation only after centralising the decisions that must remain consistent.

The faster agents work, the more expensive vague shared concepts become.

## Five ways to organise agents

Not every multi-agent workflow needs a complex orchestration platform. Most patterns fall into a small number of structures, each suited to a different kind of problem.

The research report describes five broad patterns: fan-out, pipeline, debate, supervisor and swarm.

### Fan-out

Several agents receive independent tasks at the same time, and their results are collected later.

This works well for work that is truly separable: analysing different modules, generating tests for unrelated services, or investigating several possible causes of an incident.

The main risk is hidden overlap. If the agents depend on the same architectural decision, their outputs may be incompatible even when their files do not conflict.

### Pipeline

One agent’s output becomes the input to the next.

A planning agent may produce a design, an implementation agent writes the code, a testing agent expands coverage, and a review agent inspects the result.

Pipelines are easier to understand than swarms, but errors can cascade. If the planning stage makes a poor assumption, every later stage may reinforce it.

Each boundary therefore needs validation, not just handoff.

### Debate

Several agents analyse the same question from different perspectives and critique one another.

This can be useful for architecture, security and design decisions where no single answer is obviously correct. One agent may optimise for simplicity, another for scale and another for operational safety.

The value comes from disagreement, but so does the cost. Debate uses more compute and still requires someone to decide which argument matters.

### Supervisor

A central agent or human decomposes the task, assigns work, monitors progress and integrates the results.

This is currently the most practical default for production use because it centralises shared decisions while preserving parallel execution. The supervisor can prevent duplicate work, redirect agents and stop tasks that drift from the goal.

The risk is that the supervisor becomes a single point of failure. A poor decomposition can misdirect the entire fleet.

### Swarm

Agents coordinate dynamically as peers, creating subtasks, exchanging information and reorganising their work without a fixed hierarchy.

This is powerful for large, exploratory workloads, but difficult to govern. Shared memory becomes harder to reason about, costs become less predictable and it becomes unclear which agent made a consequential decision.

For most engineering teams, the sensible path is not to begin with a swarm.

Start with a supervisor. Add fan-out when tasks are independent. Use pipelines when stages have clear contracts. Reserve debate for decisions that genuinely benefit from competing analysis.

The most advanced architecture is not automatically the most useful one.

## The human role changes again

With one agent, an engineer reviews a proposed change.

With several agents, the engineer manages a queue of changes, plans, conflicts and unresolved decisions.

The work begins to resemble technical operations.

The engineer must decide which tasks can run concurrently, which need a shared architectural decision, and which should remain manual. They must identify work that has duplicated effort, detect conflicting assumptions and prioritise the outputs that deserve attention.

This is not simply reviewing more pull requests.

It is managing a portfolio of machine-generated proposals.

A good orchestrator may spend less time reading every line and more time asking higher-level questions:

- Did two agents create competing representations of the same concept?
- Did a downstream task begin before an upstream decision was stable?
- Are several changes relying on the same unverified assumption?
- Which pull requests are blocked by product ambiguity rather than technical failure?
- Which outputs can be discarded without review because their premise is no longer valid?
- Where should human judgement enter before more work is generated?

This is why agent orchestration cannot be reduced to prompt chaining.

The central problem is not moving text from one model to another. It is preserving coherence while work is distributed.

## Verification becomes the limiting resource

When implementation scales, review does not scale automatically.

Part 2 described the movement of work from writing to review. Multi-agent workflows intensify that shift because they increase output faster than they increase human attention.

The research report points to a sobering quality picture. GitClear’s analysis of 211 million lines of code found increases in copied code, sharp declines in refactoring, an approximate eightfold rise in duplicated blocks during 2024, and more code being revised shortly after commit. DORA’s findings similarly suggest that AI can improve throughput while weakening stability.

The problem is not that agents cannot produce clean code.

They often can.

The problem is that they can produce large amounts of locally plausible code without understanding the long-term shape of the repository.

A reviewer can identify one unnecessary abstraction.

A fleet can introduce ten variants of that abstraction in parallel.

A team may merge each change because it passes tests and appears reasonable. The architectural cost becomes visible only after the patterns begin to interact.

Verification therefore needs to evaluate more than correctness at the file or pull-request level.

It must ask whether the set of changes remains coherent as a system.

## Review must operate at several levels

Traditional code review usually focuses on the diff.

That remains necessary, but it is insufficient when changes are generated in parallel.

An AI-native verification system needs several distinct levels.

### Specification verification

Did the implementation satisfy the intended behaviour?

This is the most basic question, yet it is often skipped because reviewers become absorbed in the code. A clean implementation of the wrong requirement is still wrong.

Each acceptance criterion should be traceable to code or tests, and prohibited behaviour should be explicitly checked.

### Change-level verification

Is the individual pull request technically correct?

This includes tests, static analysis, security checks, performance considerations and ordinary code review.

Automated systems can handle much of the mechanical work, while humans focus on consequential decisions and unclear reasoning.

### Cross-change verification

Do parallel changes conflict conceptually?

This level is essential in multi-agent workflows.

Two pull requests may each pass their tests while introducing duplicated services, inconsistent domain names or competing data models. No isolated review will necessarily detect the problem.

The orchestrator needs a view across the workstream.

### Repository-level verification

Is the codebase becoming easier or harder to maintain?

This includes duplication, churn, architecture drift, complexity growth and the short-term rewrite rate discussed in Part 2.

A team that reviews every pull request successfully can still degrade the repository one acceptable change at a time.

### Runtime verification

Does the system behave correctly after deployment?

Canary releases, observability, error budgets, rollback mechanisms and production evaluation remain essential. A review process can establish confidence, but production behaviour provides the final evidence.

The key is not to collapse all of these into one generic “AI review.”

Different failure modes require different forms of verification.

## Another model is not automatically an independent reviewer

A common response to machine-generated code is to ask another model to review it.

This can help, but only when the second review is meaningfully different from the first process.

If the implementation agent and review agent receive the same context, use similar reasoning and optimise for the same definition of success, they may share the same blind spots.

The review may simply make the original output feel more trustworthy.

A useful review system separates concerns.

A specification reviewer checks whether the acceptance criteria were met.

A security reviewer looks for unsafe data flows, permissions and dependency risks.

An architecture reviewer checks the change against repository conventions and existing abstractions.

A test reviewer examines whether the tests prove behaviour rather than merely execute the generated code.

These agents should not all produce broad opinions about general code quality. They should evaluate narrow questions using different evidence.

Human reviewers then focus on disagreement and residual uncertainty.

This is one of the most valuable uses of AI in review: not replacing judgement, but directing judgement toward the parts of the change where confidence is weakest.

## Quality gates must exist before scale

A team should not increase agent parallelism before it has reliable gates for one agent.

Otherwise, it scales uncertainty.

At minimum, each generated change should pass deterministic checks before it reaches human review:

- formatting and linting;
- static analysis;
- unit and integration tests;
- security and dependency scans;
- repository policy checks;
- file-scope validation;
- and verification against the original task.

The exact checks will vary by system, but the principle is stable.

Machine-generated output should be filtered by machines before it consumes human attention.

That does not mean every passing change deserves approval. Automated gates prove only what they were designed to prove. They can establish that tests pass, dependencies are allowed and architectural rules were not obviously violated.

They cannot prove that the requirement was wise or the abstraction will remain useful.

Still, without those gates, senior engineers spend their time catching failures that should have been rejected automatically.

Human attention should be reserved for decisions, not formatting mistakes.

## Governance begins when agents become actors

Traditional governance assumes that people write code and tools execute predefined processes.

AI-native engineering introduces non-human actors that can inspect information, propose decisions, modify repositories and invoke external systems.

That creates a new governance problem.

Who authorised the agent?

Which model produced the change?

What context and instructions did it receive?

Which tools could it access?

Which human approved consequential actions?

What tests and policies were applied?

Can the organisation reconstruct the path from requirement to production behaviour?

The research report describes several concrete governance mechanisms: an AI bill of materials within an extended SBOM, allowlists for approved tools and agents, least-privilege identities for non-human actors, end-to-end traceability, and event-driven policy updates rather than annual review cycles.

These may sound like enterprise controls that small teams can ignore.

The underlying principles apply everywhere.

An agent should have its own identity rather than borrowing an engineer’s unrestricted credentials.

Its permissions should match the task.

Its actions should be logged.

The model, configuration and relevant context should be recorded for important changes.

A human should remain accountable for approval.

The more autonomous the workflow becomes, the less acceptable invisible automation becomes.

## Least privilege must include context

Security discussions usually focus on what an agent can do.

They should also focus on what an agent can see.

An agent working on a frontend component may not need customer records, production logs, payroll data or private issue threads. Yet many integrations expose broad search access because it is operationally convenient.

This creates unnecessary risk, especially when agents can process untrusted content.

A malicious instruction hidden inside a document, issue or repository file may attempt to manipulate the agent into leaking sensitive information or invoking an external tool.

The research report highlights the “lethal trifecta”: access to sensitive data, exposure to untrusted content, and the ability to communicate externally. When all three exist in the same agent environment, prompt injection can become a real security boundary failure rather than a strange model response.

The safest design removes at least one element.

An agent exposed to untrusted issues may have no access to secrets.

An agent with sensitive context may have no unrestricted network access.

An agent allowed to send external requests may operate only on sanitised, trusted inputs.

Security must be enforced by the harness and infrastructure, not by asking the model to recognise every malicious instruction.

## Shadow AI becomes shadow engineering

Most organisations already have some form of shadow AI.

Developers use unapproved models, paste code into external tools, connect personal accounts or install agent plugins without formal review. This behaviour often begins because the approved workflow is slower or less capable than the tools engineers can access individually.

With autocomplete, the risk may be limited to data exposure and licence concerns.

With agents, shadow AI becomes shadow engineering.

An unapproved tool may execute shell commands, read configuration, access internal services, create branches or open pull requests. It may send repository context to external systems or install dependencies without the organisation understanding the path.

The report notes that shadow AI appeared in 20 percent of breaches in IBM’s 2025 data, while extensive AI security tooling reduced breach lifecycles and costs.

The answer is not merely to ban tools.

A policy that makes safe work impossible will be bypassed.

Teams need approved paths that are useful enough to compete with informal ones: supported agents, clear data rules, accessible sandboxes, scoped integrations and fast review for new capabilities.

Governance succeeds when it becomes part of the engineering platform rather than a document developers encounter after something goes wrong.

## Governance should be proportional to consequence

Not every agent action requires a committee.

A local documentation change and a production database migration should not follow the same approval process.

Useful governance distinguishes between levels of consequence.

An agent may be allowed to inspect a repository and produce a plan automatically.

It may edit files and run tests inside a sandbox.

Adding a dependency may require explicit approval.

Changing access-control logic may require a security review.

Applying a migration or deploying to production may require both human approval and a separate execution identity.

This keeps low-risk work fast while preserving control over consequential actions.

The goal is not maximum restriction.

It is predictable escalation.

Engineers should know which actions are automatic, which require review and which are prohibited. Agents should encounter the same boundaries deterministically.

When permissions are unclear, teams either over-constrain the workflow until it becomes useless or grant broad access for convenience.

Both approaches are symptoms of missing governance design.

## Metrics must detect scale-induced failure

The metrics discussed in Part 2 become more important as parallelism increases.

Cycle time and deployment frequency still matter, but they must be paired with signals that show whether the organisation is absorbing the increased output safely.

Useful indicators include:

- review queue growth;
- time to first review;
- number of review rounds;
- code turnover within 30 and 90 days;
- duplicated abstractions;
- defect escape rate;
- rollback frequency;
- architecture-rule violations;
- agent runs stopped by scope or policy controls;
- and cost per accepted change.

At multi-agent scale, teams should also track coordination waste.

How many generated changes are discarded because another agent solved the same problem?

How often do branches conflict conceptually even when they merge cleanly?

How much reviewer time is spent reconstructing agent assumptions?

How many tasks begin before a shared decision is stable?

These metrics expose a form of waste that raw throughput hides.

A fleet that produces one hundred pull requests is not productive if sixty are rejected, twenty duplicate existing work and the remaining twenty consume the review capacity of the entire team.

Parallelism increases potential output.

It does not guarantee useful output.

## Scale should be earned

The natural temptation is to measure progress by autonomy.

One agent becomes five. Five become twenty. Tasks run overnight. Agents create subtasks and review one another. The system begins to look impressive.

But autonomy is not the objective.

Reliable delivery is.

A team should increase agent scale only when its ability to preserve coherence and establish confidence increases with it.

Before moving from one agent to several, the team should be able to answer:

- Are tasks specified well enough to be delegated independently?
- Are shared architectural decisions made before parallel execution?
- Can agents work in isolated branches or worktrees?
- Are deterministic quality gates enforced automatically?
- Can the organisation detect duplicated or conflicting changes?
- Are permissions scoped by task and identity?
- Can every consequential action be audited?
- Is human review focused on judgement rather than mechanical failures?

If the answer to several of these is no, more agents will not create an AI-native engineering organisation.

They will create a faster queue.

## The new role of the platform team

As these practices mature, the platform team becomes central to AI-native engineering.

Its role is no longer limited to build pipelines, cloud infrastructure and developer environments. It also provides the rails on which agents operate.

That may include:

- approved model access;
- repository context standards;
- reusable agent workflows;
- sandboxed execution environments;
- scoped identities and permissions;
- cost tracking;
- policy enforcement;
- audit logs;
- evaluation systems;
- and standard review gates.

This is important because every product team should not have to design its own security model, context hierarchy and orchestration framework.

Without a platform layer, adoption becomes fragmented. Some teams build sophisticated controls. Others use unrestricted local agents. Context files follow incompatible conventions. Costs become difficult to attribute. Security depends on individual judgement.

A shared platform allows local flexibility inside organisational boundaries.

Product teams still decide how to build their systems. The platform team defines how non-human contributors may participate.

## The future is not one giant autonomous agent

The most compelling demonstrations often show one agent receiving a broad objective and working for hours without intervention.

That is impressive, but it may not be the dominant production model.

Large engineering systems are rarely built by giving one human unrestricted responsibility for everything. They are built through decomposition, specialisation, review and controlled interfaces.

AI-native engineering is likely to follow the same pattern.

Some agents will plan.

Some will implement narrow classes of work.

Some will specialise in migrations, tests, security or documentation.

Some will observe production systems and recommend changes without applying them.

Humans will define goals, resolve ambiguity, approve consequential decisions and remain accountable for the system.

The resulting workflow will resemble an organisation more than a chatbot.

That is why coordination becomes the product.

The value will not come only from having intelligent agents. It will come from designing the structures through which those agents interact, disagree, hand off work, encounter limits and earn trust.

## The quality reckoning

AI has already made software generation abundant.

The next phase will reveal whether organisations can manage that abundance.

The optimistic outcome is not merely that teams write more code. It is that smaller groups can tackle larger systems, automate neglected work and deliver capabilities that were previously uneconomical.

The pessimistic outcome is a flood of plausible implementation that overwhelms review, fragments architecture and creates codebases no individual fully understands.

Both outcomes can emerge from the same models.

The difference lies in the operating system around them.

Parallel agents need centralised decisions.

Machine-generated volume needs layered verification.

Autonomy needs scoped identities, enforceable permissions and auditability.

Faster output needs metrics that measure durability rather than activity.

AI-native engineering at scale is therefore not a model problem.

It is an organisational design problem expressed through software infrastructure.

The teams that solve it will not necessarily be those with the most agents.

They will be the teams that know how much autonomy their engineering system can safely absorb.

Part 5 will turn from systems to people and economics. It will examine how engineering roles and team structures change, which metrics should guide adoption, how token and review costs alter the economics of delivery, and what risks remain even after the methodology is mature.

---

_This is Part 4 of the LogCTL series on AI-native software engineering. Part 5 will cover engineering roles, team structure, metrics, economics and the unresolved future of AI-native development._
