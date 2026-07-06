---
title: 'I Tried Building My AI Agent With Existing Agent Frameworks. Then I Chose the Boring Deterministic Way.'
description: 'After evaluating multiple AI agent frameworks, I found that deterministic automation with an LLM inside beats magic autonomy for real operational work.'
pubDate: 2026-06-20
updatedDate: 2026-06-21
heroImage: '../../../assets/images/posts/deterministic-ai.png'
heroImageAlt: 'Illustration of a deterministic AI automation workflow with predictable steps and controlled decisions.'
categories: ['AI']
tags: ['ai-agents', 'automation', 'deterministic-systems', 'llm', 'marvin']
pinned: false
---

Over the last few weeks, I went down the AI agent rabbit hole.

Not the "let's ask ChatGPT to summarize emails" version of agents. I mean actual agents: tools, memory, workflows, cron jobs, MCP servers, autonomous execution, approvals, dashboards, and all the beautiful little ways software finds to disappoint you at 2 AM.

My goal was simple enough.

I wanted to build **MARVIN**, a personal/work assistant that could help with my actual operational life:

- check servers and websites
- review pull requests
- summarize invoices
- monitor internal systems
- draft support ticket responses
- integrate with LMS APIs
- give me daily or scheduled reports
- eventually coordinate small workflows across tools

In other words, I did not want a chatbot.

I wanted an assistant that could do boring, repetitive, operational work reliably.

Naturally, because I enjoy suffering, I started by evaluating existing AI agent systems.

## The First Temptation: "Surely Someone Has Already Solved This"

The AI agent ecosystem looks very impressive from the outside.

There are frameworks, harnesses, CLIs, MCP-compatible tools, hosted agent platforms, local agents, coding agents, browser agents, workflow agents, and enough GitHub READMEs promising "autonomous execution" to make a grown developer briefly believe in humanity again.

I evaluated and experimented with tools and approaches like:

- **hermes-agent**
- **zero-claw**
- **moltis**
- **vellum**
- **Claude Code as a harness**
- and a few other agent-style workflows

Each of them had something interesting.

Some had nice abstractions. Some were good at tool use. Some had promising MCP support. Some were good for coding tasks. Some made demos look magical.

And that was the problem.

They were good at demos.

My use case was not a demo.

## My Use Case Was Not "Autonomy". It Was Reliability.

A lot of agent frameworks are designed around the dream of autonomy.

You give the agent a goal, it thinks, plans, uses tools, reflects, retries, and eventually does something impressive.

That is exciting when the task is fuzzy.

But most of my use cases were not fuzzy.

I did not need an agent to "think deeply" about whether my website is up.

I needed it to run a check every 30 minutes, hit the endpoint, record the result, notify me if something breaks, and not burn tokens while philosophically rediscovering HTTP.

I did not need an agent to creatively decide how to summarize invoices.

I needed it to fetch emails or files, identify the right attachments, extract predictable fields, generate a summary, and ask for approval when required.

I did not need a magical autonomous coworker.

I needed a disciplined intern with cron, logs, permissions, and very limited imagination.

That distinction changed everything.

## Claude Code as a Harness Was Powerful, But Too Broad

One of the more interesting experiments was using **Claude Code as a harness**.

The idea was attractive: let Claude Code act as the execution layer. It can inspect files, run commands, use tools, call scripts, and reason through complex tasks.

For development workflows, this is genuinely powerful.

But as the foundation for MARVIN, it started to feel too broad.

A harness like Claude Code is designed to be flexible. That flexibility is useful when you are coding, debugging, or exploring a repository. But in production-like automations, flexibility can become unpredictability.

For example:

- A scheduled task might take more steps than expected.
- A simple check could turn into a long reasoning chain.
- Token usage becomes harder to predict.
- Failure modes become less obvious.
- Debugging becomes "what did the agent decide to do this time?"
- Cost control becomes harder.
- The agent may solve the problem, but not always in the same way.

For one-off tasks, that is acceptable.

For cron-driven operational workflows, it is terrifying.

If a server health check runs every three hours, I do not want to wonder whether the agent will take 15 seconds, 5 minutes, or 40,000 tokens depending on its mood and the alignment of the planets.

## Agent Frameworks Add Abstraction Before the Problem Needs It

The other issue I kept running into was abstraction.

Agent frameworks often introduce concepts like:

- agents
- tools
- skills
- memory
- planners
- evaluators
- routers
- graphs
- reflection loops
- state machines
- human-in-the-loop approvals
- multi-agent collaboration

All of these are valid concepts.

But the question is: do I need them right now?

For MARVIN v1, most workflows were straightforward:

1. Run on a schedule.
2. Fetch data from a known source.
3. Process it.
4. Optionally call an LLM for interpretation or wording.
5. Store the result.
6. Notify me or ask for approval.

That does not need a general-purpose autonomous agent.

That needs a well-written script.

The more frameworks I evaluated, the more I realized I was adding machinery before I had fully defined the machine.

It felt like buying an aircraft carrier to cross a pond. Impressive, yes. Practical, no. Slightly worrying for the neighbors.

## The Real Problem Was Not Intelligence. It Was Control.

The biggest learning was this:

**For my use case, intelligence was not the scarce resource. Control was.**

LLMs are already intelligent enough to summarize logs, draft replies, classify tickets, review pull requests, and explain server issues.

The hard part is not making the model smarter.

The hard part is making the system:

- predictable
- observable
- debuggable
- cheap enough to run regularly
- safe with permissions
- easy to pause
- easy to inspect
- easy to retry
- specific to my workflows

A general-purpose agent gives you breadth.

But operational systems need boundaries.

They need to know exactly what they are allowed to do, when they run, what data they touch, what happens on failure, and where the logs go.

When an agent is too open-ended, every workflow becomes a small act of faith.

And faith is not an architecture.

## Why I Chose a Deterministic Agent

Eventually, I decided that MARVIN should not start as a fully autonomous agent.

It should start as a **deterministic AI-assisted automation system**.

That means:

- cron jobs trigger known workflows
- each workflow has explicit steps
- scripts do the boring deterministic work
- APIs and MCP tools are called in controlled ways
- the LLM is used only where language, reasoning, summarization, or judgment is actually useful
- outputs are saved to a dashboard
- sensitive actions require approval
- every run is logged
- failures are visible
- cost is predictable

In this model, the LLM is not the whole application.

The LLM is a component.

That sounds less magical, but it is far more useful.

For example, a server check should not be:

> "Agent, please investigate the health of my infrastructure."

It should be:

1. call Beszel API
2. check CPU, RAM, disk, container status
3. compare against thresholds
4. generate structured JSON
5. ask LLM to summarize only if something is abnormal
6. notify via ntfy
7. store result in MARVIN dashboard

That is not less intelligent.

That is intelligent in the right place.

## The "Agent" Is the Product, Not the Framework

Another thing became clear: MARVIN's value is not in saying "I used Framework X."

Its value is in how well it fits my life and work.

I do not need a generic agent that can theoretically do anything.

I need a specific assistant that understands my systems:

- LMS Platform
- Application infrastructure
- Support tickets
- Internal servers
- GitHub repositories
- Monitoring dashboards
- Invoice emails
- Operational routines
- My preferred approval flow

That kind of assistant is not created by installing a framework.

It is created by carefully encoding workflows.

The agent framework may help later, but it is not the core.

The core is use-case design.

## Where Existing Agent Tools Still Fit

This does not mean the existing tools were useless.

Far from it.

The experiments helped me understand what I actually wanted.

Claude Code is still excellent for coding and repository-level work. Vellum-style workflow platforms are useful for visual orchestration and LLM pipelines. MCP-compatible agents are useful when tool access matters. LangGraph-style state machines may become valuable when workflows become more complex.

But I no longer think the right starting point is:

> "Which agent framework should I use?"

The better starting point is:

> "Which parts of this workflow are deterministic, and which parts actually need an LLM?"

Once that is clear, the architecture becomes much simpler.

Most of the workflow should be boring.

The LLM should enter only at the points where boring code becomes brittle:

- summarizing messy information
- drafting human-readable messages
- classifying ambiguous input
- explaining unusual failures
- deciding whether something needs attention
- converting raw data into a useful report

That is the sweet spot.

## The Final Architecture Direction

The direction I settled on is:

- simple scheduled scripts
- explicit workflow definitions
- structured logs
- dashboard-first visibility
- MCP/API integrations where useful
- LLM calls only at decision or language points
- approval before external actions
- deterministic execution by default
- autonomy added slowly, only where it proves useful

In other words:

**Start boring. Add intelligence carefully. Avoid magic until magic has a ticket number.**

This gives me the best of both worlds.

I still get the benefit of AI. MARVIN can summarize, draft, interpret, and assist.

But the actual system remains understandable.

When something fails, I can debug it.

When something costs money, I know why.

When something runs on cron, I know what it will do.

When MARVIN makes a recommendation, I can trace the input.

That matters more than having a flashy agent demo.

## The Lesson

After evaluating multiple existing AI agent approaches, my conclusion is simple:

**General-purpose agents are exciting, but use-case-specific deterministic agents are what I would trust with real work.**

For exploratory tasks, autonomous agents are powerful.

For operational workflows, deterministic systems with AI inside them are better.

That may sound less futuristic.

But the future, if it is going to be useful, still needs logs, retries, permissions, dashboards, and sane cost limits.

So MARVIN will not begin as an all-knowing autonomous entity.

It will begin as something much more valuable:

A predictable system that does specific work well.

A little sarcastic, naturally.

But predictable.
