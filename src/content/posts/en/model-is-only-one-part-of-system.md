---
title: 'The Model Is Only One Part of the System'
description: 'A useful AI-native workflow requires more than a better prompt. Part 3 of the LogCTL series maps the practical method: specifications, context engineering, agent workflows and the harness that enforces permissions, boundaries and stopping conditions.'
pubDate: 2026-08-06
heroImage: '../../../assets/images/posts/ai-native-software-engineering-3.png'
heroImageAlt: 'A layered system showing specification, context, agent loop and harness surrounding a model, illustrating how reliability comes from structure rather than the model alone.'
categories: ['AI', 'Software Engineering']
tags:
  [
    'ai-native',
    'software-engineering',
    'ai-coding',
    'coding-agents',
    'agentic-engineering',
    'specification',
    'context-engineering',
    'agent-harness',
  ]
pinned: false
---

_Part 3 of the LogCTL series on AI-native software engineering_

The first two parts of this series made two arguments.

The first was that AI-native software engineering is not simply software development with faster autocomplete. It changes the division of labour between engineers and machines. The second was that the resulting productivity gains are real but conditional. Code can now be generated faster than teams can understand, review and trust it.

That leaves us with the practical question.

What does a development process look like when AI is no longer an occasional assistant, but an active participant in planning and implementation?

The answer is not a better prompt.

A prompt can begin the work, but it cannot carry an engineering system. It does not define how requirements are preserved, how repository conventions are communicated, what an agent may access, how long it may continue, or what must be verified before its output is accepted.

A useful AI-native workflow requires a structure around the model.

That structure has four parts:

1. a specification that defines the intended outcome;
2. context that makes the surrounding system legible;
3. an execution loop that lets the agent plan and act;
4. a harness that enforces permissions, boundaries and stopping conditions.

Verification sits across the entire process.

The model generates possibilities. The surrounding system determines whether those possibilities become reliable software.

## Prompting is too weak a foundation

Most teams begin their AI adoption with conversational instructions.

A developer opens an editor or terminal and writes something like:

> Add support for recurring subscriptions.

The agent inspects a few files, asks a question or two, and starts generating an implementation.

This feels natural because it resembles delegating work to another engineer. But it hides a problem: the request is not a specification. It is a topic.

What does recurring mean? Monthly only, or configurable intervals? Can a subscription be paused? What happens when payment fails? Does the renewal date move after a retry? Are existing invoices immutable? How are taxes recalculated? Can administrators override the next billing date? What event should downstream systems consume?

A human engineer would eventually encounter these questions during implementation. An agent may also encounter them, but it is far more likely to resolve them through plausible inference.

That is the central weakness of prompting as a methodology. A conversational request encourages the system to continue even when important decisions are missing.

The model is rewarded for producing a coherent answer. The engineering process needs it to stop when coherence would require invention.

This is why the practical centre of AI-native engineering is moving away from prompt-driven development and toward spec-driven development.

## The specification becomes the primary artefact

In traditional software development, code is usually treated as the final source of truth. Tickets, design documents and meeting notes explain the intention, but when those artefacts disagree with the implementation, the code wins.

Spec-driven development changes that relationship.

The version-controlled specification becomes the authoritative description of what the system should do. The implementation is generated or modified to satisfy it. Code remains essential, but it begins to resemble a build artefact derived from a more explicit representation of intent.

This does not mean every application will eventually be regenerated from documents with the press of a button. The important shift is more modest: requirements, constraints and acceptance conditions are written precisely enough that both the agent and the reviewer can evaluate the implementation against the same reference.

A useful specification for recurring subscriptions might define:

- the supported billing intervals;
- the exact renewal-date calculation;
- retry behaviour after failed payments;
- rules for pausing and resuming;
- invoice immutability;
- tax recalculation behaviour;
- idempotency requirements;
- events emitted to downstream systems;
- administrative permissions;
- and the conditions under which a subscription becomes cancelled.

It should also include behaviour that must not occur. For example, a failed notification must not roll back a successful payment, and a webhook retry must not produce a second invoice.

This is more work than writing “add recurring subscriptions.”

That is the point.

The specification forces ambiguous decisions to surface before they are hidden inside hundreds of lines of generated code.

The research report describes spec-driven development as the practical heart of AI-native engineering. Its defining premise is that the specification, rather than the code, becomes the primary source of truth. The common workflow is **Specify → Plan → Tasks → Implement**, with a human checkpoint between stages.

Each stage reduces a different kind of risk.

The specification asks whether the intended behaviour is clear.

The plan asks whether the agent understands the architecture and scope.

The task breakdown asks whether the implementation can be divided into reviewable units.

The implementation stage asks whether the resulting code satisfies the earlier decisions.

This sequence is slower than immediately asking the model to generate a solution. It is usually much faster than discovering a misunderstood requirement at the end.

## What a useful specification actually contains

A specification should not become a ceremonial document that repeats the ticket in more formal language.

It must reduce the agent’s freedom in the places where freedom would create risk.

Suppose the requirement is:

> Allow academic staff to export student attendance.

A weak specification might say:

> The system should allow authorised users to export attendance data in CSV format.

This appears clearer than the original request, but most of the important decisions are still absent.

Which staff roles are authorised? Can a lecturer export only their own classes? Does the export include student email addresses? What date range is permitted? Should withdrawn students appear? Does the exported percentage use the current attendance policy or the policy active when the class was conducted? Must the action be audited?

A stronger specification could state:

- programme chairs may export attendance for all courses in their programme;
- faculty may export only sections currently assigned to them;
- exports must include registration number, student name, session date, status and attendance percentage;
- personal email addresses and phone numbers must never be included;
- withdrawn students remain in historical exports;
- percentage calculations must use the attendance policy associated with each session;
- exports covering more than 10,000 rows must run asynchronously;
- every export must create an audit record containing the requester, filters and generated file identifier;
- generated files expire after 24 hours.

Now the implementation can be tested against explicit behaviour.

The specification is not valuable because it is detailed. It is valuable because it makes consequential assumptions reviewable.

That also distinguishes spec-driven development from writing a large requirements document at the beginning of a project.

A spec in an AI-native workflow should be living and local. It should evolve with the feature, remain version-controlled and be updated when the accepted behaviour changes. It is closer to executable design memory than to a frozen waterfall document.

Nor does it replace test-driven development.

TDD begins with a failing test that defines a unit of behaviour. Spec-driven development begins at a higher level, with the intended system behaviour and constraints. The specification can produce or inform tests, but it also captures decisions that may not fit naturally into one failing test: security boundaries, architectural requirements, operational expectations and prohibited behaviour.

The two practices can reinforce each other.

## Not every change needs a full specification

A methodology becomes harmful when it is applied without judgement.

A typo fix does not need a multi-stage design process. A small dependency update may need testing and review, but not a three-page requirements document. A well-understood one-line bug fix should not spend more time in specification than implementation.

The research report notes that spec-driven workflows can impose substantial markdown and review overhead, sometimes requiring one to three hours for a non-trivial feature. It also identifies static-spec drift and poor suitability for small fixes as real limitations.

The right question is not whether every task needs a spec.

It is whether the cost of a misunderstood decision is higher than the cost of making that decision explicit.

A useful rule is to increase specification depth when a change:

- crosses multiple services or modules;
- introduces a new business concept;
- modifies money, identity, permissions or personal data;
- contains several plausible interpretations;
- affects asynchronous or failure-prone workflows;
- or is likely to be extended by other teams later.

The larger the blast radius, the less acceptable implicit reasoning becomes.

## Specifications do not explain the codebase

Even an excellent specification describes only what should change.

The agent still needs to understand the system in which that change belongs.

This is the role of context engineering.

Context engineering is often misunderstood as the art of fitting more information into the model’s context window. That is part of it, but the deeper problem is deciding which information should shape the agent’s behaviour and how that information should be maintained.

A repository contains far more information than an agent needs for any single task. Loading everything is expensive and often counterproductive. The model may focus on irrelevant patterns, old implementations or deprecated conventions.

At the same time, the most important rules may not be obvious from the code.

A team may know that all external API calls must use a shared resilience wrapper. It may know that controllers should never write directly to the database, that financial records are append-only, or that errors shown to students must pass through a localisation service.

If those rules exist only in senior engineers’ memories, the agent does not have a code problem. It has an institutional-knowledge problem.

Context engineering turns that knowledge into an explicit part of the repository.

## Bad context sounds intelligent but changes nothing

Many repository instruction files contain statements such as:

> Follow clean architecture.

> Write secure and maintainable code.

> Use appropriate design patterns.

> Follow existing conventions.

None of these instructions is wrong. None is particularly useful.

They require the agent to determine what “clean,” “secure” and “appropriate” mean in this specific codebase. That is the very problem the context file was supposed to solve.

Useful context is behaviourally anchored.

Instead of saying:

> Follow the project’s logging conventions.

Say:

> Use `AppLogger` for all application logs. Never use `console.log` or write request bodies directly. Include `requestId`, `actorId` and the relevant domain identifier in structured context. Authentication tokens, passwords and health data must never appear in logs.

Instead of saying:

> Use the existing service architecture.

Say:

> Controllers may validate input and call application services, but must not access repositories directly. New business logic belongs under `src/Application`. Use the existing `CreateInvoiceService` as the reference pattern. Do not introduce a second command-bus abstraction.

These instructions narrow the agent’s options in meaningful ways.

The research report identifies repository files such as `AGENTS.md`, `CLAUDE.md`, scoped Cursor rules, Copilot instruction files and architecture decision records as concrete mechanisms for supplying this context. It also emphasises that context files should be treated like code: committed, reviewed and updated in the same pull request as the convention they describe.

That last point is important.

A context file that is not maintained becomes a source of authoritative misinformation.

If the team replaces one logging package with another but leaves the old instruction in place, the agent will consistently generate obsolete code. Because the instruction appears explicit, it may trust it over the newer examples in the repository.

Context rot is therefore a governance problem, not merely a documentation problem.

## Context should be scoped, not dumped

A common response to poor agent performance is to create an enormous instruction file containing everything the team knows.

This eventually becomes another form of ambiguity.

Rules for frontend components, database migrations, infrastructure and API security are mixed into one document. Important instructions compete with dozens of unrelated details. Contradictions accumulate. Nobody knows which section remains current.

Context should follow the architecture of the repository.

There may be a small global file containing principles that apply everywhere: supported languages, prohibited commands, security boundaries and the high-level architecture.

More specific instructions should live near the code they govern.

A database directory can document migration and transaction rules. An API module can define response formats and authentication expectations. A payment package can state idempotency and audit requirements. Test directories can explain fixture and mocking conventions.

This matters because modern agent systems increasingly retrieve context selectively rather than loading every instruction into every task. Titles, vocabulary and scope affect which rules are surfaced.

A section named “Critical payment idempotency rules” is more likely to be retrieved correctly than one named “Miscellaneous notes.”

Context must be written for discoverability as well as readability.

## The tool is not the methodology

Once specifications and context exist, teams still need a way for agents to act.

The tooling landscape now includes AI-native editors, terminal agents, asynchronous cloud agents, platform-integrated assistants and specialised review or security tools. They differ in interface and autonomy, but the important capability shift is common across them.

These systems no longer merely complete the current line.

They can inspect a repository, search for patterns, create a plan, edit several files, run tests, execute shell commands and prepare a pull request. That makes them qualitatively different from autocomplete.

It is tempting to turn this into a comparison of product names. That discussion becomes outdated quickly and usually misses the organisational question.

The relevant choice is not “Which AI coding tool is best?”

It is “Which mode of work fits this task?”

An IDE-integrated agent is useful when the engineer wants to remain closely involved and inspect changes continuously.

A terminal-first agent works well for repository-wide changes, scripting and workflows where commands and diffs are central.

An asynchronous cloud agent is useful for bounded tasks that can run independently inside a sandbox and return with a proposed change.

A specialised review agent may inspect security, tests or architectural consistency after implementation.

Most mature teams will use more than one because these modes solve different problems.

The research report groups the landscape into those functional categories and notes that agents now plan, edit, test and prepare pull requests rather than merely suggest code. It also identifies MCP, the Model Context Protocol, as a common interface for exposing resources, tools and prompts to agents.

MCP matters because useful engineering work rarely happens inside the repository alone.

An agent may need to inspect an issue, read a design document, query a development database, check an observability dashboard or interact with an internal service.

A standard interface makes those systems available without building a custom integration for every combination of model and tool.

But connection is not the same as permission.

The fact that an agent can access a database does not mean it should have unrestricted access to that database. The fact that it can invoke a deployment tool does not mean it should be able to deploy.

That boundary belongs to the harness.

## The harness is where the agent becomes a system

A language model can propose an action.

Something else must execute it.

That “something else” is the agent harness: the runtime that manages tool calls, context, permissions, state and interaction with the outside world.

This layer is easy to overlook because the model receives most of the attention. Models are visible, comparable and easy to market. The harness often appears as implementation detail.

In production, it may be the more important component.

The research report captures the relationship in a useful formula:

> **Agent = Model + Harness**

A model without a harness can explain how to edit a file. A harnessed agent can open the file, make the edit, run the test suite, inspect the failure, try again and prepare the result for review.

The same mechanism that creates usefulness creates risk.

Once an agent can execute commands, write files, access networks and call services, the problem is no longer simply whether the model produces correct text. The problem becomes what the system permits that text to do.

A production harness has at least five responsibilities.

### Tool execution

The model does not directly run commands. It requests a tool call. The harness validates the request, executes it and returns the result.

This separation allows policy to exist outside the model.

### Context and memory management

The harness determines what information is loaded, what is summarised, what persists between steps and what should be discarded.

Without this, long tasks either lose essential information or accumulate so much history that the agent becomes less reliable.

### Sandboxing

The harness controls which files can be read or written, which commands can run and whether the process can access the network.

An agent modifying a frontend component does not need access to production credentials or the host machine’s Docker socket.

### State persistence

Long-running work needs checkpoints. A task should be pausable, resumable and auditable.

If an agent fails after an hour, the organisation should not have to reconstruct its entire state from a chat transcript.

### Permission enforcement

Consequential actions must be approved according to explicit policy.

The harness may allow tests to run automatically while requiring approval for package installation, database migrations, network requests or deployment.

These controls must be enforced at execution time.

An instruction saying “never delete production data” is not a security boundary. It is a request.

A system is safe only when the action is technically unavailable or intercepted before execution.

The report makes this point directly: if safety depends on the model refusing a bad action, there is no meaningful safety. The harness must validate tool calls before they execute.

## A practical harness for an ordinary engineering team

The word _harness_ can make the idea sound like specialised infrastructure available only to companies building their own agent platforms.

It can begin much more simply.

Imagine a team using an agent to implement a reporting feature.

The agent receives access to a temporary Git worktree rather than the developer’s main branch. It can read the repository, edit files within two relevant packages and run a limited set of commands such as tests, formatting and static analysis.

It cannot read `.env` files, access the production network, invoke deployment commands or modify infrastructure directories.

Package installation requires human approval.

Database migrations can be generated but not applied outside a disposable development database.

The task has a maximum number of implementation attempts. If tests continue failing after that limit, the run stops and returns a summary instead of looping indefinitely.

Before completion, the harness runs the project’s required checks and records the commands, changed files and approvals in an audit log.

None of these controls depends on the model behaving responsibly.

The model can make mistakes. The environment limits what those mistakes can affect.

That is the essence of a harness.

## Stop conditions matter as much as permissions

Agent failures are not always dramatic.

Sometimes the agent simply continues.

It edits a file, runs tests, sees a failure, changes another file, introduces a second failure, rewrites the original approach and consumes an hour of compute while drifting further from the task.

A human engineer usually notices when they are stuck. An autonomous loop needs explicit limits.

Useful stop conditions include:

- a maximum number of retries;
- a maximum number of files changed;
- a maximum token or cost budget;
- repeated identical failures;
- modification outside the approved scope;
- a test regression beyond a defined threshold;
- or an unresolved decision requiring human judgement.

Stopping is not failure.

A good agent should know when the task has become less suitable for autonomous execution.

A harness that returns, “I cannot proceed without deciding how historical invoices should be handled,” is more useful than one that invents the decision and completes the implementation.

The goal is not maximum autonomy.

It is useful autonomy within known boundaries.

## The complete workflow

The four layers can now be seen as one system.

A product requirement begins as a broad intention.

The specification converts that intention into explicit behaviour, constraints and acceptance criteria.

The context layer tells the agent how this repository expects such behaviour to be implemented.

The agent produces a plan and decomposes the work into bounded tasks.

The harness gives it enough access to complete those tasks, while enforcing file scope, command policy, network rules, budgets and approvals.

Verification compares the result with the specification and checks whether the implementation fits the wider system.

Consider the student-attendance export example again.

The specification defines roles, fields, privacy rules, scale limits, policy calculations, auditing and file expiration.

The context explains which authorisation service to use, how large exports are queued, where audit events are written and which storage abstraction manages expiring files.

The plan identifies a permission policy update, export service, asynchronous job, audit event and integration tests.

The harness allows changes in the attendance and reporting modules, provides access to a disposable database, blocks external storage credentials and requires approval before adding a dependency.

Verification confirms that lecturers cannot export other sections, personal contact information is absent, large exports are asynchronous, historical policy calculations remain correct and audit records are created.

At no point is the model expected to carry the entire burden of correctness.

Correctness emerges from the structure around it.

## The most important shift is organisational

Teams often ask which model they should standardise on.

That choice matters, but it is unlikely to become a durable competitive advantage. Models improve, pricing changes and capability differences narrow.

Specifications, context and harnesses are different.

They encode how the organisation builds software.

A good specification captures product judgement.

A good context system captures engineering judgement.

A good harness captures operational and security judgement.

Together, they turn tacit knowledge into infrastructure.

That infrastructure survives model changes.

A team can replace one model with another while preserving its repository rules, task structure, approval boundaries and verification process. The model becomes a replaceable component inside a more stable engineering system.

This is why teams that focus entirely on model selection often experience disappointing results. They are optimising the most visible layer while leaving the rest of the workflow informal.

A more capable model may reduce some mistakes. It cannot infer policies the organisation has never made explicit, nor can it enforce permissions that do not exist.

## What should a team implement first?

The full system may sound extensive, but teams do not need to build it all at once.

A sensible first step is to select one non-trivial but bounded feature and run it through a lightweight version of the workflow.

Write an explicit specification with acceptance criteria and prohibited behaviour.

Ask the agent to inspect the repository and produce a plan before making changes.

Create a small repository instruction file for the conventions relevant to that task.

Limit the agent to a branch or worktree and restrict its commands to development-safe operations.

Require automated checks and human review against the original specification.

Then record what went wrong.

Did the specification leave an important decision unstated? Add the missing pattern.

Did the agent repeatedly use the wrong service? Improve the context.

Did it touch unrelated files? Tighten the task or file scope.

Did the run continue too long after failure? Add a stop condition.

This incremental approach matters because the workflow itself must be engineered.

Teams will not design the perfect specification template, context hierarchy or permission model in advance. They will discover the necessary structure by observing repeated failures.

The important thing is that those lessons become part of the system rather than remaining individual prompting tricks.

## From generating code to controlling a process

The first generation of AI coding tools encouraged developers to think about prompts.

The next generation requires teams to think about systems.

A prompt describes an immediate request.

A specification preserves intent.

Context preserves institutional knowledge.

An agent loop performs the work.

A harness constrains the work.

Verification establishes confidence in the result.

That is the practical method of AI-native software engineering.

The model remains important, but it is no longer the whole product. In many cases, it may not even be the primary source of reliability.

Reliability comes from the decisions made before the model begins, the boundaries applied while it acts and the evidence required before its work is accepted.

Once these foundations exist, the organisation can safely increase the scale of delegation. More tasks can run asynchronously. Different agents can specialise in implementation, security and review. Multiple changes can proceed in parallel.

That creates the next problem.

One agent can already generate more code than a reviewer can comfortably absorb. A fleet of agents changes the problem from delegation to coordination. Their changes can conflict, duplicate work, create inconsistent abstractions and overwhelm the human decision-making layer.

Part 4 will examine that transition: parallel agents, multi-agent orchestration, verification at machine-generated volume, and the governance required when software begins arriving faster than teams can read it.

---

_This is Part 3 of the LogCTL series on AI-native software engineering. Part 4 will cover multi-agent orchestration, verification and governance at scale._
