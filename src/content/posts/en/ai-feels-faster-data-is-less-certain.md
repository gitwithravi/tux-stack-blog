---
title: 'AI Feels Faster. The Data Is Less Certain.'
description: 'AI coding tools feel transformative, but the productivity evidence is mixed. Part 2 of the LogCTL series on AI-native engineering examines the gap between perceived speed and measured outcomes, and why review is becoming the new bottleneck.'
pubDate: 2026-08-06
heroImage: '../../../assets/images/posts/ai-native-software-engineering-2.png'
heroImageAlt: 'A speedometer showing perceived velocity while the underlying data points in a different direction, illustrating the gap between felt productivity and measured delivery.'
categories: ['AI', 'Software Engineering']
tags:
  [
    'ai-native',
    'software-engineering',
    'ai-coding',
    'coding-agents',
    'agentic-engineering',
    'productivity',
    'code-review',
    'metrics',
  ]
pinned: false
---

_Part 2 of the LogCTL series on AI-native software engineering_

The first phase of AI adoption in software development was driven by an experience that was difficult to argue with: the tools felt fast.

A developer could describe a function and receive a working draft in seconds. An unfamiliar codebase could be summarised without hours of manual exploration. Boilerplate that once consumed an afternoon could appear before the developer had finished thinking through the task. Errors could be explained, tests generated and APIs discovered without constantly switching between the editor, documentation and search results.

It was natural to interpret that experience as a productivity breakthrough.

In many cases, it probably was.

The difficulty is that software engineering productivity has never been the same thing as typing speed. A team does not create value merely by producing code more quickly. The code must be understood, reviewed, integrated, deployed, operated and maintained. A change that takes five minutes to generate and two days to validate is not necessarily an improvement over one that took three hours to write and thirty minutes to review.

This distinction matters because AI has accelerated the most visible part of development while making downstream costs easier to overlook. The implementation appears immediately, so the developer feels productive. The review burden, architectural drift and maintenance cost emerge later, often in someone else’s workflow.

That delay creates one of the defining measurement problems of AI-native engineering.

We can see the code being generated. We cannot immediately see whether the code was worth generating.

## The perception–reality gap

The most important productivity study in the current debate is also the most uncomfortable.

METR ran a randomised controlled trial involving 16 experienced open-source developers completing 246 tasks in mature repositories. These were not beginners building disposable applications. They were experienced contributors working in codebases they already understood.

When using early-2025 AI tools, the developers took 19 percent longer to complete their tasks. Yet they believed the tools had made them approximately 20 percent faster.

The gap is more important than the exact percentage.

Developers were not merely wrong about the size of the benefit. They were wrong about its direction.

That should concern any organisation evaluating AI adoption primarily through surveys, anecdotes or tool-usage statistics.

The developers were not irrational. Their perception made sense. AI reduced several forms of friction that are highly visible during programming. It generated drafts, suggested fixes and made unfamiliar code easier to navigate. These moments feel like obvious savings.

What is harder to notice is the time spent reading generated output, correcting incorrect assumptions, waiting for suggestions, rewriting low-quality changes and recovering from paths that initially looked promising.

Human memory is not an instrumentation system. We remember the impressive completion produced in ten seconds. We are less likely to attribute the next twenty minutes of review and correction to that same completion.

This is one reason AI coding tools can feel transformative even when the measured result is modest or negative. They improve the emotional experience of starting a task. They reduce blank-page anxiety. They create momentum and make progress visible early.

Those benefits are real, but they are not identical to delivery speed.

A tool can make programming feel easier without making the engineering system faster.

## The evidence is already moving

The METR result is often treated as proof that AI coding tools do not improve productivity. That interpretation is too convenient.

The study measured a particular group of developers, working on a particular class of tasks, with tools available in early 2025. AI development systems have improved rapidly since then. Models plan more effectively, understand larger repositories, use tools more reliably and remain coherent across longer tasks.

METR itself acknowledged this in a February 2026 update. Its follow-up work suggested that developers were likely receiving more benefit from newer tools than the original estimate implied. The researchers also encountered a new problem: experienced developers increasingly refused to complete tasks without AI, introducing selection effects that made clean comparison more difficult.

This is a useful warning against turning a single result into a permanent conclusion.

The early evidence does not show that AI is useless. It shows that productivity is difficult to measure and that self-reported speed is unreliable.

Both points matter.

The tools are improving quickly enough that last year’s benchmark may already underestimate their value. At the same time, the perception gap is large enough that organisations cannot simply ask developers whether the tools are working.

The honest conclusion is not that AI slows developers down, nor that it makes them dramatically faster. The effect depends on the task, the developer, the codebase, the workflow and the quality of the organisation surrounding the tool.

That answer is less satisfying than a single percentage, but it is much closer to how software development actually works.

## Mature repositories change the equation

AI performs impressively when a task is self-contained.

Ask it to build a small API, generate a dashboard or create a standalone script, and it can often produce a useful implementation quickly. The problem is bounded. The model can rely on common conventions and does not need to understand years of organisational history.

Mature repositories are different.

A mature codebase contains decisions that are not obvious from the immediate task. Some conventions are documented. Many are encoded indirectly through old bug fixes, naming choices, deployment constraints, performance trade-offs and operational history.

A request that appears simple may involve hidden dependencies.

Consider a ticket that says:

> Add a preferred language field to the user profile.

In a new application, this may require a database column, a form control and an API update.

In a mature system, language preference may affect notification templates, cached profile objects, event payloads, analytics dimensions, mobile synchronisation, consent records, exports and fallback behaviour for users who have never selected a language.

An agent may generate the obvious implementation very quickly. The developer must still discover everything the agent missed.

This helps explain why AI often produces larger gains in greenfield and highly standardised work than in complex existing systems. The difficulty is not writing the new field. It is understanding where the concept of language already exists across the organisation.

The better the developer knows the codebase, the more likely they are to notice subtle mistakes. That improves quality, but it also increases review time. A beginner may accept a plausible implementation and feel dramatically faster. A senior engineer may spend forty minutes identifying why the same implementation violates three architectural constraints.

The beginner’s perception may be more positive.

The senior’s judgement may be more valuable.

## Local quality and repository quality are not the same thing

The research becomes confusing when survey data and repository analysis are placed side by side.

DORA’s 2025 findings showed that 59 percent of respondents reported a positive influence from AI on code quality. GitClear’s repository analysis, meanwhile, found signals associated with declining maintainability: more duplicated code, less refactoring and a higher proportion of code being revised soon after it was committed.

Both can be true.

AI can improve the local quality of an individual change. A generated function may be cleaner than the developer’s first draft. It may include documentation, error handling and tests that would otherwise have been omitted.

Repository quality is cumulative.

If the tool repeatedly introduces new abstractions instead of reusing existing ones, duplicates logic, or creates implementations that are rewritten shortly after merging, the codebase can deteriorate even while individual pull requests appear polished.

Developers evaluate the change in front of them.

Repository analysis evaluates the pattern created by thousands of changes.

Technical debt also appears with a delay. A duplicated function may not cause a problem today. It becomes expensive six months later when a policy changes and only one copy is updated. A slightly inconsistent abstraction may pass every test until the system needs to support a new workflow.

This delayed cost is one reason early AI adoption can look more successful than it ultimately proves to be.

## AI is an amplifier, not a maturity substitute

DORA’s broader conclusion provides a better mental model than either optimism or scepticism: AI behaves as an amplifier.

The research report notes that AI adoption was positively associated with throughput but negatively associated with delivery stability. A 25-point increase in AI adoption corresponded with an estimated 7.2 percent reduction in stability.

This does not mean AI directly causes unstable software in every organisation. It suggests that faster generation increases pressure on the rest of the system.

If a team already has strong tests, reliable continuous integration, clear ownership, small changes and disciplined review, increased implementation speed can become increased delivery speed.

If those controls are weak, more generated code creates more opportunities for defects, larger review queues and faster accumulation of technical debt.

Before AI, a weak development process was partially protected by the natural slowness of implementation. Engineers could create only a limited amount of code in a week. Reviewers had time to inspect it. Architectural mistakes accumulated at human speed.

Agents remove that protection.

A team can now produce more changes than its review and governance systems can safely absorb. The organisation may celebrate rising output while its ability to evaluate that output quietly collapses.

## The work moved to review

One of the clearest signals in the research is the growth of review as a bottleneck.

LinearB’s 2026 dataset found that pull-request review time increased by 91 percent in teams adopting AI. AI-generated pull requests waited 4.6 times longer to be picked up and were accepted at a rate of 32.7 percent, compared with 84.4 percent for human-authored pull requests.

These figures require careful interpretation. AI-generated pull requests may differ in scope or complexity, and teams may treat them more cautiously. But the direction is difficult to ignore.

Implementation velocity has moved downstream.

A developer can now produce a pull request faster than a reviewer can establish confidence in it.

Generated changes are often larger than necessary because the model tries to complete the entire request. They may touch files the reviewer did not expect, introduce abstractions that appear reasonable but do not fit the codebase, or include extensive tests that create an impression of safety without exercising the important behaviour.

The reviewer must understand not only what changed, but also what the model assumed.

That can be harder than reviewing human-written code.

A human developer usually carries context from the ticket, the discussion and the implementation process. They can explain why a decision was made. A generated pull request may arrive with a polished summary but no reliable record of which alternatives were considered or which assumptions were invented.

Review then becomes a form of reverse engineering. The reviewer reconstructs the reasoning after the implementation already exists.

Consider a ticket asking for automatic account suspension after five failed login attempts.

An agent produces a comprehensive change. It adds a failure counter, updates the login controller, creates an unlock process, adds tests and sends a notification when the account is suspended.

The pull request looks excellent.

During review, however, several questions emerge. Should failures be counted per account, per IP address or both? Do attempts against unknown email addresses count? Is suspension permitted for accounts using single sign-on? Should administrators be able to unlock the account manually? Does the notification reveal whether a particular email address has an account? How does this interact with existing fraud detection?

The implementation is not obviously broken.

It is based on a requirement that was never sufficiently defined.

The agent’s ability to produce a complete solution makes the missing decisions less visible. Had a human developer worked manually, they might have encountered these questions while implementing the first few lines and paused for clarification.

The agent instead resolves ambiguity by choosing plausible defaults.

The result creates work because the team must now separate useful implementation from assumptions that should never have been encoded.

This is why review must begin before code generation.

A one-page plan is cheaper to reject than a 1,500-line diff. For the same reason, AI-native teams should prefer smaller, bounded changes over broad instructions such as “build account suspension.” The work can be divided into the policy, data model, enforcement path and notification behaviour, with each step reviewed against a narrower set of expectations.

The speed of AI should be used to shorten iteration cycles, not to remove them.

## Code volume is now an even worse metric

Software organisations have never had a perfect measure of developer productivity. Lines of code were discredited long ago, yet AI is making similar metrics attractive again.

Teams measure generated lines, accepted suggestions, active users, prompts per developer and estimated hours saved. Vendors highlight these numbers because they are easy to collect and usually rise after adoption.

They reveal activity, not value.

A developer who accepts thousands of generated lines may have created a useful subsystem. They may also have accepted an unnecessary abstraction that will be deleted next month.

An engineer who rejects most suggestions may appear less productive while exercising excellent judgement.

The research report explicitly warns against treating lines of AI-generated code, suggestion acceptance, per-task time saved and raw tool usage as meaningful success metrics. It recommends outcome-based measures such as cycle time, deployment frequency, change failure rate and developer satisfaction.

The purpose of engineering is not to maximise implementation output. It is to reduce the time and risk required to create useful capabilities.

AI makes code cheaper. When the price of something falls, producing more of it becomes easy. That does not make it valuable.

The important questions are whether the organisation delivers sooner, whether the software remains stable, whether review becomes easier or harder, and whether the code survives long enough to justify its creation.

## Durability matters more than immediate success

Traditional delivery metrics often focus on whether a change reaches production and whether it causes an immediate failure.

Those measures remain important, but they can miss a common failure mode of AI-generated code: the implementation passes tests, merges successfully and is quietly rewritten a few weeks later.

The report identifies Code Turnover Ratio as a useful guardrail. It measures how much merged code is reverted, deleted or substantially rewritten within 30 or 90 days. Tracking the ratio separately for AI-generated and human-written code can expose changes that looked acceptable during review but failed the durability test.

Suppose an AI-generated service is merged without incident. Three weeks later, another engineer discovers that it duplicates an existing service and rewrites the change. No production incident occurred. The change failure rate remains clean.

Yet the organisation spent time generating, reviewing, testing and replacing code that should not have been created.

That is a productivity failure, even though conventional delivery metrics may not record it.

The same is true of unnecessary wrappers, duplicated validation logic and premature abstractions. They can pass every automated check while creating long-term maintenance cost.

A fast change that survives is valuable.

A fast change that must be rewritten is deferred rework.

## Where the gains are most credible

The mixed evidence does not mean AI’s benefits are imaginary. It means they are concentrated in particular kinds of work.

AI tends to perform best when the task is bounded, the desired output is easy to verify and the cost of a mistake is low. Mechanical refactoring with strong test coverage, repetitive test generation, data conversion, internal documentation, disposable scripts and isolated greenfield features often fit this pattern.

The gains become less predictable when the task crosses several domains, depends on undocumented business rules, modifies critical security paths or requires architectural judgement.

This suggests a better adoption question.

Not:

> How do we use AI everywhere?

But:

> Where can AI increase speed without making confidence disproportionately expensive?

That framing encourages teams to expand AI usage according to the maturity of their specifications, context and review systems rather than according to vendor enthusiasm.

## What teams should measure

An organisation evaluating AI adoption needs a balanced view.

Cycle time remains important. If the time from an accepted idea to production falls without harming quality, the organisation is probably creating real value.

Deployment frequency may show that teams can deliver smaller changes more often.

Change failure and rollback rates reveal whether increased throughput is producing instability.

Review pickup time and total review duration show whether implementation speed has merely moved work downstream.

Code turnover, duplication and short-term rewrite rates provide a view of durability.

Defect escape rate shows whether issues are being discovered by customers rather than by the engineering process.

Developer satisfaction also matters, but it should be interpreted alongside objective outcomes. A tool that reduces frustration may be valuable even when the measured speed improvement is modest. The mistake is treating satisfaction as proof of delivery gains.

Cost belongs in the same picture. An agentic workflow that completes tasks faster but consumes expensive models, generates repeated failed attempts and increases senior review time may not improve the economics of delivery.

No single metric can describe engineering productivity.

A team that deploys twice as often with the same stability and lower review burden has a strong result.

A team that produces twice as many pull requests while review time, turnover and defects increase has created activity, not productivity.

## Productivity is a property of the system

The central mistake in the AI productivity debate is treating the coding tool as an isolated variable.

A model does not operate alone. Its output depends on the specification, repository structure, available context, test suite, tool permissions, review process and skill of the engineer supervising it.

The same model can make one developer dramatically faster and another slower. It can improve one codebase and damage another. It can automate a well-understood pattern and fail badly on a task containing hidden business rules.

This is not unusual.

A powerful deployment platform improves a team with good operational practices and allows a careless team to create incidents faster. A flexible programming language increases the leverage of strong engineers and the freedom of weak ones. AI follows the same pattern.

The relevant unit of analysis is not the model.

It is the engineering system built around the model.

That is why the productivity evidence appears contradictory. Different studies and organisations are not measuring the same system. They are measuring different developers, tasks, repositories, tools and levels of process maturity.

The question “Does AI make developers faster?” is too broad to answer meaningfully.

A better question is:

> Under what conditions does AI reduce the total time required to deliver a durable change?

That formulation includes generation, review, correction, deployment and maintenance. It also makes clear that the answer is not determined by model quality alone.

## The real productivity gain may be elsewhere

The long-term value of AI-native engineering may not be that every individual task becomes faster.

Its larger benefit may be that organisations can attempt work that was previously uneconomical.

A team may build internal tools that would never have received engineering time. It may migrate an old subsystem, improve test coverage, document neglected services or explore several product ideas before choosing one.

This kind of productivity is difficult to measure because the comparison is not between four hours and two hours. It is between work being completed and work never being attempted.

AI reduces the activation energy required to begin.

That is meaningful.

But lower activation energy also makes it easier to begin unnecessary work. Teams can generate features, services and abstractions without confronting the true cost of owning them.

The ability to build more must therefore be accompanied by a stronger ability to decide what not to build.

AI makes implementation cheaper.

It does not make complexity free.

## The next bottleneck

The current generation of tools has already changed the economics of producing code. The next challenge is creating an engineering process capable of absorbing that output.

Specifications must become more precise because agents resolve ambiguity too confidently.

Context must become explicit because agents cannot rely on institutional memory.

Review must become systematic because machine-generated volume can overwhelm human attention.

Metrics must focus on durability because code creation is no longer scarce.

The industry spent the first phase of AI adoption asking how much faster developers could write. The more important question is now how quickly organisations can establish justified confidence in what was written.

That is why review is becoming the defining bottleneck of AI-native engineering.

Review alone, however, will not solve the problem. Confidence must be designed into the workflow before implementation begins.

That is the subject of Part 3.

By “method,” I mean the practical operating structure around the model: specifications that make intent executable, context engineering that makes repository conventions explicit, agentic tools that can plan and act across the codebase, and an execution harness that controls permissions, commands, state and stopping conditions.

Together, these mechanisms determine whether AI behaves like a fast autocomplete system or a disciplined engineering participant.

---

_This is Part 2 of the LogCTL series on AI-native software engineering. Part 3 will cover the practical method: specifications, context, agent workflows and the execution harness._
