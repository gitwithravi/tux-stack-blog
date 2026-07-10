---
title: 'I Tried Too Many Coding Agents. Here Is What I Would Actually Pay For'
description: 'A subjective comparison of Claude Code, Codex, Cursor, OpenCode, and the models inside them, based on ordinary application work rather than benchmarks.'
pubDate: 2026-07-10
heroImage: '../../../assets/images/posts/coding-agents-comparison.png'
heroImageAlt: 'A developer comparing coding agents on screens, with notes about quality, workflow, pricing, and practical usefulness.'
categories: ['AI']
tags:
  [
    'ai-coding',
    'coding-agents',
    'claude-code',
    'codex',
    'cursor',
    'opencode',
    'llm',
    'developer-tools',
  ]
pinned: false
---

_An extremely subjective comparison of Claude Code, Codex, Cursor, OpenCode, and the models living inside them._

Coding-agent comparisons usually suffer from one of two problems.

The first kind is written like a scientific paper. Someone designs a benchmark, asks six models to implement the same carefully isolated function, counts how many tests pass, and declares a winner with a score of 83.7.

The second kind is written by someone who asked an agent to generate a to-do app and concluded that software developers will be unemployed by Thursday.

This article is neither.

I am a fairly ordinary developer building fairly ordinary software. I am not writing a new compiler, designing a database engine, or contributing memory-safety patches to the Linux kernel. I build web applications, internal tools, APIs, dashboards, reports, integrations, and the occasional system that begins as a "small requirement" and somehow develops eighteen database tables.

My recent work has involved Laravel and Filament, Next.js, React, FastAPI, Node.js, MySQL, PostgreSQL, Docker, Go, and Java. Most of my testing has been on new projects, although I have also used these agents on existing repositories.

My normal workflow is not to throw a vague sentence at an agent and disappear for lunch. I first create detailed requirements and a phased development plan. Each phase includes its goals, database changes, API surface, UI expectations, architectural principles, and acceptance criteria. I then ask the agent to implement one phase at a time.

I have also tested these agents by asking them to one-shot smaller applications, because apparently I enjoy risk.

## The Required Disclaimer

Everything in this article reflects my experience as of **July 2026**.

These are not scientific benchmarks. They are my opinions based on how these agents behaved while building the kind of software I actually build. Your stack, workflow, prompt quality, budget, patience, and tolerance for AI-generated dark dashboards may produce different results.

Plan names, model access, quotas, and prices also change constantly. This article may become outdated before the arguments in the comments are finished.

More importantly, I evaluate agents according to what matters to me:

1. Following instructions precisely
2. Producing correct code
3. Understanding an existing repository
4. Maintaining architecture and code quality
5. Reaching a usable result quickly
6. Iterating well on frontend design
7. Debugging failed implementations
8. Using tokens and subscription limits sensibly

I do not care much about whether an agent appears autonomous in a product demo. I care whether it reads `AGENTS.md`, keeps business logic out of controllers, places domain functions in the correct service, and does not decide to reorganise my computer because a development server failed to start.

That last one will become relevant later.

## The Harness Matters More Than People Admit

We often talk about coding agents as if the underlying model is the entire product.

It is not.

The harness decides how the model searches the repository, which files it reads, how it invokes tools, whether it remembers earlier instructions, and how effectively it maintains context during a long task.

A strong model inside a poor harness can look surprisingly stupid because it never receives the right context. It may generate excellent code for a problem that does not exist in a file that should never have been modified.

For repository exploration and context handling, my current ranking is:

1. **Claude Code**
2. **Codex**
3. **Cursor Agent**
4. **OpenCode**
5. **Crush**

Claude Code is first by a considerable margin. It is particularly good at exploring unfamiliar repositories, tracing related code, and deciding what it needs to inspect before changing anything.

Codex comes next. For long, planned, phase-by-phase development, Claude Code and Codex are nearly equal. Claude Code still explores better, while Codex often executes a clearly defined phase more predictably.

Cursor Agent is good enough for normal work. OpenCode is useful, especially considering its model flexibility and pricing, but context retrieval is not at the same level. Crush finished last in my testing.

This distinction matters because when people say, "Model X is bad at repositories," they may actually mean, "The harness gave Model X three irrelevant files and wished it good luck."

## Claude Code: The Best Harness, Powered by an Overenthusiastic Genius

Claude Code is probably the best coding-agent harness available today.

It handles tools well, explores repositories effectively, and remains coherent during long tasks. On large existing repositories, it is the agent I trust most to perform the initial investigation.

### Opus 4.8

Opus 4.8 feels like an overenthusiastic junior developer who has read every software-engineering book ever written and desperately wants you to know it.

It is intelligent, capable, and frequently brilliant. It is also tempted to do more than you requested because it has discovered three architectural opportunities while implementing your form validation.

For normal application development, Opus works extremely well. You do not need to be writing a compiler to benefit from it. It understands abstractions, follows cross-file relationships, and handles ambiguous problems better than most models.

It is especially strong in three areas.

### Existing Repositories

Opus is the best model I have used for understanding an existing codebase.

It is good at locating the relevant implementation, identifying conventions, and following dependencies across multiple files. When the repository is large and I do not already know exactly where the change belongs, Claude Code with Opus saves real thinking time.

This does not mean it is incapable of confusion.

Once, I had both a `PLAN.md` and a `CLAUDE.md`. I asked Claude Code to work on Phase 5.

Instead of reading Phase 5 from `PLAN.md`, it found the words "Phase 5" in `CLAUDE.md` and confidently presented some unrelated coding-practice instructions.

When I pushed back, it explained that `PLAN.md` started with Phase 0, so it had not read far enough to find Phase 5. It then found "Phase 5" elsewhere and assumed that must be what I wanted.

This was an impressive combination of sophisticated reasoning and the document-reading ability of someone scanning a contract five minutes before signing it.

### Frontend Development

Opus is the strongest frontend model I have used, based mostly on React and Next.js work.

Its advantage is not merely that it produces attractive interfaces on the first attempt. Its real strength is iteration.

You can tell it that a layout feels too dense, that the hierarchy is wrong, or that the design does not match what you had in mind. It generally understands the direction and can keep refining the interface until it feels right. With Playwright in the loop, the process can occasionally feel magical.

A friend urgently needed a static website. I gathered the requirements through a ChatGPT conversation, gave the resulting specification to Claude Code, and let Opus implement it.

The final interface was better than the design I had imagined.

That is Opus at its best. Give it enough room on a frontend task and it can surprise you instead of merely complying.

### Debugging

Opus is also the best debugger in this comparison.

When the first implementation fails, it is more likely to read the evidence, form a useful hypothesis, and narrow down the root cause. Weaker models frequently respond to failure by changing several unrelated things and hoping the error becomes bored and leaves.

### The Problem With Opus

Opus 4.8 consumes a lot of tokens.

Even small tasks can become expensive because it explores, explains, verifies, and occasionally begins writing the software-engineering autobiography nobody requested.

At lower subscription tiers, the rate limits interrupt serious work too often. Opus is excellent, but excellence becomes less useful when it disappears halfway through the afternoon.

### Sonnet 5.0

I have not used Sonnet 5.0 enough to make a final judgment, but it is promising.

It is the fastest model in this comparison. It feels like a dependable junior developer who accepts the assigned task, completes it quickly, and produces quality that is generally acceptable.

It is not often magical, but not every task needs magic. Sometimes you need someone to implement the endpoint and stop philosophising about the endpoint.

## Codex: Less Theatrical, More Dependable

As a harness, Codex is slightly behind Claude Code.

As a complete working environment with GPT 5.5, however, it is my first choice for serious phase-by-phase engineering.

### GPT 5.5

GPT 5.5 feels like a senior engineer who will do exactly what you ask and will not spontaneously volunteer to rewrite the permissions system.

This can make it appear less exciting than Opus. It is not constantly jumping forward with additional ideas. It waits for a clear request, studies the task, and implements it.

For my workflow, that is a feature.

Following instructions precisely is my highest-priority criterion. I already know what I want the application to do. I have usually defined the architecture and broken the project into phases. I do not need the agent to express itself. I need it to put the right code in the right place.

Codex with GPT 5.5, especially on high reasoning effort, is much better than anything else I have tested at architecture and separation of concerns.

It is less likely to dump every business rule into a controller. It is better at determining which changes belong in a service, repository, route handler, database layer, component, or test. It respects architectural boundaries more reliably and produces code that is easier to continue working with after the agent is gone.

### High Effort Matters

The high-effort setting makes a significant difference when a task spans more than roughly five files.

For a small isolated edit, the extra reasoning may not be necessary. But when a feature touches the database, backend services, controllers, UI components, permissions, and tests, high effort becomes valuable.

Its main improvement is not cleverer syntax. It is coordination.

GPT 5.5 becomes much better at identifying what must change and where each change belongs.

### Planning

GPT 5.5 is also the best planning model I have used.

Even when I intend to implement the feature using a cheaper model, I often want GPT 5.5 to produce the plan. A strong plan reduces the amount of intelligence required during implementation.

In some cases, I plan with GPT 5.5 and develop with GPT 5.4. The smarter model determines the structure; the cheaper or more available model performs the work.

### Correctness

For general correctness, my ranking is:

1. GPT 5.5
2. Opus 4.8
3. GLM 5.2
4. Grok 4.5, based on more limited testing

GPT 5.5 most consistently produces code that works without requiring substantial repair.

It once implemented a report I was struggling to visualise even with pen and paper. I had only a rough description of the output and how the data needed to relate.

Codex with GPT 5.5 on high effort effectively read my mind and produced the correct engineering shape from an explanation I did not consider particularly clear.

That was not frontend magic. It was something I value more: turning an incomplete domain idea into coherent code.

### Codex Can Still Lose Its Mind

No agent is safe from occasional brilliance in the wrong direction.

Once, a development server could not start because port 3000 was already occupied.

Codex tried to uninstall npm.

This is why agents should not be allowed to "fix the environment" without explicit permission. There is a thin line between initiative and attempting to remove the package manager because another application is running.

### The Biggest Problem: Limits

The five-hour limit on lower Codex plans is the main challenge.

A serious session can consume that allowance in roughly 40-45 minutes. Therefore, I would not describe ChatGPT Plus with Codex as an unlimited primary coding setup.

It is still extremely useful. You simply need to reserve it for the parts where its intelligence provides the highest leverage.

## OpenCode and the Open-Model Workforce

OpenCode is not as strong a harness as Claude Code or Codex, but its flexibility makes it valuable.

It lets you use models such as GLM, DeepSeek, and Qwen within a relatively inexpensive workflow. The experience is weaker for repository exploration, but it becomes practical when the plan is already detailed and the task is narrow.

### GLM 5.2

GLM 5.2 feels like a new developer who occasionally makes you think, "This person is amazing," and occasionally makes you wonder why you participated in the hiring process.

For normal application development, it can perform surprisingly close to frontier models.

It follows instructions reasonably well, writes solid code, and is especially capable on frontend work. In my React and Next.js testing, I would rank frontend performance as:

1. Opus 4.8
2. GLM 5.2
3. GPT 5.5
4. Grok 4.5

GLM also feels fast because it is less verbose. It spends less time narrating obvious actions, which makes the interaction more direct.

Its main weaknesses are repository understanding, lack of vision capability, and price relative to other open-weight models.

Through OpenCode Go, heavy GLM usage burns quota extremely quickly. I have reached a five-hour quota in around 30 minutes, the weekly quota in roughly four serious sessions, and the monthly allowance in around ten.

So GLM is not the model I would use continuously on a $10 subscription.

It is the model I would use selectively.

### DeepSeek V4 Pro

DeepSeek V4 Pro feels like an intern with strong foundations who needs continuous guidance.

When given a precise, limited task, it can produce useful code cheaply. When left unsupervised for too long, it may generate changes that make you wonder whether both of you are working in the same repository.

It is not good at one-shot development. As context grows, it starts forgetting constraints, inventing relationships, and placing code in increasingly surprising locations.

Its role is bulk implementation after the difficult thinking has already been done.

### Qwen 3.7

Qwen 3.7 is somewhat better than DeepSeek at coding, but it struggles when a task requires several concepts to remain connected at once.

It can follow a well-structured plan. It is less dependable when architecture, permissions, database rules, and UI behaviour all need to stay aligned.

It also has a fascinating frontend instinct.

Leave Qwen alone to design an application and there is a significant chance it will create a dark, gloomy interface that looks like the administrative dashboard of a company operating after civilisation has collapsed.

### Kimi K2 and MiniMax

I also tested models such as Kimi K2 and MiniMax.

They can be useful for narrow implementation work, but I found them weak at debugging and long, context-heavy tasks. Once the initial solution fails, they often struggle to recover methodically.

They are not useless. They simply need a smaller responsibility radius.

## Cursor: Good Enough, With Grok Showing Promise

My Composer 2.5 experience was limited to the free trial.

It was okay, but weaker than the alternatives, and I did not continue using it. I would not treat that short, older experience as a complete judgment of Cursor today.

Cursor Agent itself is good enough.

With Grok 4.5, it becomes more interesting.

I have only used Grok 4.5 for a couple of days, so this is an early impression rather than a verdict. It feels like a developer trying hard to produce the best result possible within visible limitations.

It completed most of my normal coding tasks. The main problems were a smaller effective context and occasional hallucinations when a task combined multiple concepts.

Its correctness was surprisingly good, and it deserves more testing. I am simply less confident in my conclusions about Grok than I am about GPT, Opus, or GLM.

## My Completely Subjective Scorecard

**Scale:** 1 means poor, 3 means acceptable, and 5 means excellent.

These ratings describe the model-and-harness combinations I actually used. They are not objective measurements.

| Agent and model                | Instructions | Correctness | Existing repos | Architecture | Speed | Frontend | Debugging | Usage efficiency |
| ------------------------------ | -----------: | ----------: | -------------: | -----------: | ----: | -------: | --------: | ---------------: |
| **Codex + GPT 5.5**            |        **5** |       **5** |            4.5 |        **5** |   4.5 |      3.5 |       4.5 |                3 |
| **Claude Code + Opus 4.8**     |          4.5 |         4.5 |          **5** |          4.5 |   3.5 |    **5** |     **5** |              2.5 |
| **Claude Code + Sonnet 5.0**   |            4 |         3.5 |              4 |          3.5 | **5** |        4 |         4 |                4 |
| **OpenCode + GLM 5.2**         |            4 |           4 |              3 |            4 |   3.5 |      4.5 |         4 |              2.5 |
| **Cursor Agent + Grok 4.5**    |          3.5 |           4 |              3 |          3.5 |     4 |      3.5 |       3.5 |                3 |
| **OpenCode + Qwen 3.7**        |          2.5 |           3 |              2 |            3 |     4 |        3 |         2 |                4 |
| **OpenCode + DeepSeek V4 Pro** |            2 |           3 |              2 |          2.5 |     4 |      2.5 |       1.5 |            **5** |

Token efficiency is the least scientific column here.

A cheap model is not efficient when it saves money during generation but requires two hours of repair. Similarly, an expensive model may be efficient when it understands the task immediately and produces the correct change.

## One-Shot Development Versus Phase-by-Phase Development

This distinction matters more than most model rankings.

### One-Shotting a Small Application

For giving an agent a complete specification and asking it to build the application in one go, my ranking is:

1. Claude Code with Opus 4.8
2. Codex with GPT 5.5, around 5% behind
3. A very large gap
4. Everyone else

Opus handles the expanding context better and is more likely to keep the UI, requirements, architecture, and implementation connected throughout the run.

GPT 5.5 is extremely close.

The other models begin to hallucinate as the context grows. They may implement the early parts correctly, then build later features on assumptions that were never true.

### Phase-by-Phase Development

When I already have a detailed plan and ask the agent to implement one controlled phase at a time, GPT 5.5 is better than Opus by a clear margin.

This is where instruction-following and architectural discipline matter most.

Opus remains excellent, but it is more likely to overreach or introduce ideas that were not part of the phase. GPT 5.5 behaves like an engineer executing an agreed design.

That fits my preferred way of working.

## How I Get Better Results From Coding Agents

The model matters, but workflow matters almost as much.

I use a detailed `AGENTS.md` or `CLAUDE.md` to define project rules. This includes separation of concerns, architectural boundaries, naming conventions, testing expectations, and actions the agent must not perform without approval.

I then create a phased plan.

Each phase should have a narrow goal, explicit tasks, affected data models, expected API behaviour, UI requirements, and acceptance criteria. The agent should not need to rediscover the product requirements while writing code.

I give it one phase at a time.

For cross-cutting tasks spanning many files, I use GPT 5.5 on high effort. For repository exploration and difficult debugging, I prefer Opus. For frontend iteration, I also prefer Opus.

On smaller budgets, I separate planning from implementation.

Use the expensive model to make the decisions. Use the cheaper model to type the code. Bring the stronger model back to review the result.

And I explicitly tell agents not to modify my environment, kill processes, uninstall tools, or "fix" unrelated problems without permission.

This rule exists because experience is a harsh but effective teacher.

## What I Would Actually Pay For

This is not a universal buying guide. It is what I would personally choose at each monthly budget based on my workflow.

### If I Had $10

I would use **OpenCode Go** with a mixed-model workflow.

I would not continuously code with GLM 5.2 because the quota disappears too quickly.

Instead:

- Use GLM 5.2 for planning, architecture, difficult reviews, and validation.
- Use DeepSeek or MiniMax for routine implementation after the plan is explicit.
- Bring GLM back to check whether the code followed the plan.

Used carelessly, the subscription may last only a few serious sessions. Used strategically, it can remain useful for roughly 12-15 days.

At this budget, model orchestration matters more than model loyalty.

### If I Had $30

I would combine **ChatGPT Plus/Codex with OpenCode Go**.

My workflow would be:

1. Plan with GPT 5.5.
2. Implement routine phases with DeepSeek or MiniMax.
3. Review the implementation with GLM 5.2.
4. Return to Codex for difficult tasks requiring strategy or changes across several layers.
5. When needed, plan with GPT 5.5 and let GPT 5.4 handle the implementation.

The Codex limit is too restrictive for continuous primary development at this tier. But GPT 5.5 remains extremely valuable when reserved for high-leverage decisions.

Do not spend the entire budget asking the smartest model to type boilerplate.

### If I Had $100

I would choose **ChatGPT Pro with Codex**.

At $100, I want to code without constantly thinking about rate limits.

I also prefer an agent that follows my instructions precisely over an agent that makes better UI decisions or explores the repository slightly better. I understand my code and product better than any agent does.

My job is to provide the direction. The agent's job is to execute it correctly.

GPT 5.5 fits that relationship better than anything else I have tested.

### If I Had $200

I would choose **Claude's 20x plan**.

At this budget, I am no longer paying only for code generation. I am paying to outsource more of the exploration and thinking.

This matters especially with large existing repositories.

Claude Code and Opus are better at inspecting unfamiliar code, tracing relationships, understanding where a change belongs, and discovering information I would otherwise need to find manually.

Codex may provide more raw usage, but Claude gives me greater confidence when I want the agent to perform the initial investigation.

At lower Claude tiers, I hit Opus limits too regularly. At the 20x level, rate limits become rare enough that the workflow finally feels dependable.

The difference is simple:

**ChatGPT Pro lets me code more without worrying about limits. Claude 20x lets me think less about the repository before coding.**

## There Is No Winner, Unfortunately

It would be convenient to end this article by declaring one coding agent the champion.

That conclusion would also be wrong.

Claude Code with Opus is my choice for one-shot applications, large existing repositories, frontend iteration, and difficult debugging.

Codex with GPT 5.5 is my choice for planned, phase-by-phase development, architecture, correctness, and precise instruction-following.

GLM 5.2 is the strongest lower-cost alternative I have tested, provided you use it selectively.

DeepSeek, Qwen, MiniMax, and similar models can contribute useful implementation work when given a narrow task and a strong plan.

Cursor with Grok 4.5 looks promising, but I need more time before pretending two days of usage constitutes research.

The right choice depends on three things:

- Your budget
- Your workflow
- How much thinking you want to outsource

A developer who knows the architecture and wants disciplined execution may prefer Codex.

A developer entering a large unfamiliar repository may get more value from Claude Code.

A developer with $10 must think like an engineering manager and assign different work to different models.

The best coding agent is not necessarily the smartest model.

It is the one that fits the role you need filled, follows the rules of your project, and does not try to uninstall npm because port 3000 is busy.

And after recently seeing Linus Torvalds merge a PR containing code written by Antigravity, and say it was better than what he could have written himself, you already know what I will be trying next.
