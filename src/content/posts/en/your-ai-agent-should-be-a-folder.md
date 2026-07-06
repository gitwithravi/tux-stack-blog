---
title: 'Your AI Agent Should Be a Folder'
description: 'After testing agent frameworks for personal automation, I realized the best personal AI agent is not a platform—it is a well-organized directory of Markdown, scripts, logs, and state.'
pubDate: 2026-07-05
heroImage: '../../../assets/images/posts/ai-agent-folder.png'
heroImageAlt: 'Illustration of a personal AI agent represented as organized folders, Markdown files, scripts, logs, and state.'
categories: ['AI']
tags: ['ai-agents', 'unix-philosophy', 'filesystem', 'personal-agent', 'llm', 'automation']
pinned: false
---

I have spent enough time with agent frameworks now to admit something slightly uncomfortable.

For my personal work, most of them feel like overkill.

Not bad. Not useless. Not "these people don't know what they are doing." That would be the usual internet brain-rot take, and I am trying very hard not to become that person.

LangGraph is powerful. Mastra is interesting. Google ADK has serious engineering behind it. These tools make sense when you are building production-grade systems where tasks need durable execution, retries, tracing, state management, approvals, multiple actors, permissions, and all the other boring things that suddenly become life-or-death the moment money, users, or compliance enter the room.

But that is not what most of us are doing when we say, "I want to build a personal AI agent."

Most of us are not building Skynet.

We want something that checks a few servers, summarizes some emails, reviews a pull request, creates a daily note, drafts a reply, watches a log file, reminds us about an invoice, or runs a script when something changes.

And after trying to force these simple personal workflows into proper "agent frameworks," I kept coming back to the same thought:

Maybe my AI agent should just be a folder.

## The Moment It Clicked

I started like most developers do when they discover a new abstraction.

I looked at LangGraph. I looked at Mastra. I looked at Google ADK. I looked at agent frameworks, orchestration layers, tool registries, memory modules, graph nodes, edges, routers, planners, and all the other vocabulary that makes you feel like you are one diagram away from becoming a serious AI engineer.

And to be fair, all of it makes sense at a certain scale.

If I am building a support automation system for thousands of users, I want proper orchestration. If I am building an enterprise workflow where one failed step can break a process, I want retries. If I am coordinating multiple agents, tools, queues, human approvals, and external systems, I want observability.

But for my own personal AI assistant?

It felt like hiring a civil engineering firm to build a bookshelf.

The thing I needed was embarrassingly simple.

I needed a place to keep instructions.

I needed a place to keep scripts.

I needed a place to keep state.

I needed a place to keep logs.

I needed the LLM to understand what existed, choose the right script, run it, and explain the result back to me.

That's it.

At first, the architecture in my head looked like this:

```text
personal-agent/

├── README.md
├── SOUL.md
├── skills/
│   ├── check_servers.py
│   ├── summarize_email.py
│   ├── review_pr.py
│   ├── create_daily_note.py
│   └── restart_service.sh
├── prompts/
├── docs/
├── state/
├── logs/
└── config/
```

And honestly, even this felt like a relief.

No graph.

No special runtime.

No framework-specific vocabulary.

Just a directory with instructions, scripts, context, logs, and state.

Not magical.

Understandable.

Which, in software, is often better than magical.

## The Unix Philosophy Was Waiting for AI All Along

The more I thought about it, the more obvious it felt.

Unix already solved this problem philosophically decades ago.

Write small programs. Make them do one thing well. Compose them. Keep interfaces simple. Prefer text. Let the filesystem be the shared surface.

That philosophy maps almost perfectly to personal AI agents.

A server check should be a boring Python script.

An invoice extractor should be a boring Python script.

A backup task should be a boring Bash script.

A pull request reviewer can be a script that fetches the diff and prepares context.

A support reply generator can be a script that pulls the ticket, fetches related history, and then asks the model to draft a response.

The LLM should not be inside everything.

The LLM should sit above everything.

It should decide what needs to happen, inspect the available tools, run the right script, and then communicate the result.

The actual operations should remain boring, testable, inspectable software.

That is the part people often get wrong.

They try to make the whole system intelligent.

But the best personal agent is not intelligent everywhere. It is deterministic wherever possible and intelligent only where necessary.

The intelligence is in the choosing, sequencing, summarizing, reasoning, and asking for approval.

The rest is just software.

## Frameworks Make Simple Things Feel Bigger Than They Are

This is where my frustration started.

When I used full agent frameworks for personal automation, I kept feeling like I was modeling a much larger problem than the one I actually had.

A simple task like "check my servers and tell me if something looks wrong" starts becoming:

Define a tool.

Register the tool.

Create an agent.

Create a graph.

Define the state.

Add a node.

Add an edge.

Configure execution.

Handle memory.

Handle output.

Now, again, none of this is wrong in a production context. Structure is useful. Formal state is useful. Graphs are useful. Frameworks exist because real problems eventually become messy.

But for a personal agent, I want to be able to open a folder and understand the system in ten seconds.

I want to see:

```text
skills/check_servers.py
```

and immediately know where the server check lives.

I want to run it manually.

```bash
python skills/check_servers.py
```

I want to test it without the agent.

I want to debug it without reading framework internals.

I want to version it with Git.

I want the agent to read a Markdown file that says:

```markdown
# Server Check Skill

Use this skill when the user asks about server health, uptime,
CPU, memory, disk usage, Docker containers, or service availability.

Run:

python skills/check_servers.py --summary

Ask for approval before restarting any service.
```

That is enough.

The model understands Markdown. It understands Python. It understands Bash. It understands folders. It understands README files.

So why am I wrapping all of this in another abstraction just to explain the same thing again?

## The Filesystem Is Already a Pretty Good Agent Interface

Developers underestimate how powerful a well-organized folder is.

A folder is not just storage.

A folder is context.

A folder tells you what belongs together. It tells you what is important. It tells you what changed. It tells you what can be run, what can be read, and what should be ignored.

Humans understand this naturally.

LLMs increasingly understand it too.

That is why coding agents work so well inside repositories. They do not need a visual canvas. They do not need a fancy tool builder. They read files, infer structure, follow instructions, run commands, and modify things.

A good repository already has everything an agent needs:

- documentation
- source code
- scripts
- examples
- configuration
- tests
- logs
- state
- conventions

Once you see it this way, the "agent" becomes less of an application and more of a workspace.

The folder is the product.

The harness is just the runtime.

And the harness does not have to be mysterious.

It can be Claude Code, OpenCode, Hermes, OpenClaw, Codex-style CLIs, or whatever comes next. But it can also be a tiny script that lists the folder structure, reads the relevant Markdown files, sends that context to an LLM API, executes approved commands, and writes the result back to logs.

That is the part that demystified it for me.

The harness does not need to own the system.

It only needs to help the model operate inside the system.

The best harness does not become the center of your workflow.

It lets your folder become the center of your workflow.

## Even Google Seems to Be Thinking in Files

And before this starts sounding like one developer trying to justify his laziness with philosophy, it is worth looking at Google's Open Knowledge Format, or OKF.

OKF is not the same thing as a personal agent folder. It is not a Bash runner. It is not an orchestration system. It is specifically about making knowledge portable and readable for humans and agents.

But the shape of it remains incredibly telling.

Google's OKF represents knowledge as a directory of Markdown files with YAML frontmatter. No complex runtime. No required SDK. No proprietary platform that needs to sit in the middle of everything.

Just files.

Markdown for readability.

YAML frontmatter for structure.

Normal links for relationships.

A directory that humans can inspect and agents can consume.

That matters.

Because the direction is clear.

The answer is not always another service.

Sometimes the answer is a format.

Sometimes the answer is a folder.

In OKF, each concept becomes a file. The path gives it identity. Markdown gives it readability. YAML frontmatter gives it enough structure to be queryable. Links connect knowledge together. The whole thing can live in Git, move across systems, and remain understandable without a special platform.

That is very close to the mental model I want for personal agents.

Not because OKF says "build your agent with Bash scripts."

It does not.

But because it validates the larger idea:

AI systems do not always need more platforms.

They often need better structured context.

Readable files. Clear conventions. Portable knowledge. Version-controlled instructions. A shared surface that both humans and models can understand.

That is the important part.

And if this pattern works for knowledge, I think the same pattern works beautifully for personal automation.

## My Personal Agent Became a Directory

This is where my own thinking changed.

Initially, I wanted to build a proper personal AI assistant. Something serious. Something with architecture. Something with a name, a personality, tools, workflows, memory, approval gates, and scheduled tasks.

Naturally, I started looking at frameworks.

But the more I built, the more I realized that my actual needs were simple.

I did not need five layers of abstraction to check whether a server was down.

I did not need a graph to summarize a few emails.

I did not need a framework-specific tool definition to run a script I had already written.

The earlier `personal-agent/` structure was the first realization.

A simple folder was enough to prove the idea.

But as I kept thinking about real usage, that folder naturally evolved. A single `skills/` directory with loose scripts was fine at the beginning, but some skills needed their own README, examples, schemas, prompts, and safety rules.

That is when the structure became more like this:

```text
marvin/

├── SOUL.md
├── OPERATING_RULES.md
├── skills/
│   ├── server-check/
│   │   ├── README.md
│   │   ├── run.py
│   │   └── examples.md
│   ├── invoice-summary/
│   │   ├── README.md
│   │   ├── run.py
│   │   └── schema.json
│   ├── pr-review/
│   │   ├── README.md
│   │   ├── run.py
│   │   └── checklist.md
│   └── support-ticket-draft/
│       ├── README.md
│       ├── run.py
│       └── tone.md
├── memory/
├── state/
├── approvals/
├── logs/
└── config/
```

This was not a pivot away from the folder idea.

This was the folder idea maturing.

Each skill became its own small package.

Not a framework package.

A filesystem package.

The `server-check` skill can explain when it should be used, what command should be run, what output it produces, and when approval is required.

The `invoice-summary` skill can have its own schema.

The `pr-review` skill can have its own checklist.

The `support-ticket-draft` skill can have its own tone instructions.

Each skill can be tested alone.

Each skill can be improved without touching the whole system.

The agent does not need to know everything upfront. It can inspect the folder. It can read the relevant README. It can run the script. It can write to state. It can ask me before doing anything dangerous.

This is not revolutionary.

That is exactly why I like it.

It is boring in the right way.

## A Personal Agent Should Be Inspectable

One problem with over-abstracted agent systems is that they quickly become hard to inspect.

When something goes wrong, you are not always debugging your task. You are debugging the framework's idea of your task.

Was the state passed correctly?

Did the router select the wrong tool?

Did memory inject stale context?

Did the graph transition incorrectly?

Did the tool schema confuse the model?

Did the framework silently retry something?

These are valid engineering problems in large systems. But for personal work, I do not want mystery.

If my agent checked a server, I want a log file.

If it drafted an email, I want the draft saved.

If it restarted a container, I want the exact command recorded.

If it made a decision, I want the reasoning stored somewhere visible.

That can be as simple as:

```text
logs/
└── 2026-07-05-server-check.md
```

or:

```text
approvals/
└── restart-nginx-2026-07-05.md
```

The filesystem gives you inspectability for free.

Not perfect observability. Not enterprise-grade tracing. But enough for personal automation.

And enough is an underrated architectural principle.

## The LLM Should Be the Glue, Not the Foundation

The mistake I see often is people treating the LLM as the foundation of the system.

I think that is backwards.

The foundation should be boring scripts, stable APIs, clear folders, plain files, and deterministic behavior.

The LLM should be the glue.

It should read the room. It should understand intent. It should decide which boring thing to run. It should combine outputs. It should explain what happened. It should ask for approval when the next step has risk.

That is a very different architecture from "let the agent figure everything out."

A good personal agent should not improvise its way through your machine.

It should operate inside a well-lit workspace.

The folder is that workspace.

## Try Building One Without a Framework First

If you are building a personal AI agent, my suggestion is simple.

Before reaching for a framework, create a folder.

Create a `README.md`.

Create a `SOUL.md` if you want personality and operating style.

Create a `skills/` directory.

Create one skill.

Not ten. One.

Maybe it checks your servers. Maybe it summarizes your daily work. Maybe it reads a folder of invoices. Maybe it creates a weekly note.

Inside that skill, write a normal script.

Then write a small README explaining:

- when to use it
- how to run it
- what arguments it accepts
- what output it produces
- what requires approval
- what should never be done automatically

Then give that folder to your coding agent or CLI harness and see how far you get.

You may be surprised by how little infrastructure you need.

You may also discover the exact point where you actually need orchestration. That is good. Reach for LangGraph, Mastra, ADK, or another framework when the problem demands it.

But do not start there just because the word "agent" sounds serious.

Most personal agents are not serious infrastructure.

They are personal workflows with a language model sitting on top.

## Where Frameworks Still Win

To be clear, I am not saying frameworks are dead.

That is a lazy take.

Frameworks will matter even more in production.

If you are building systems with multiple users, background jobs, complex state transitions, audit requirements, permissions, high reliability, parallel execution, or strict failure recovery, you probably want a real orchestration layer.

A folder full of scripts will not magically solve distributed execution.

Markdown will not replace observability.

Bash will not give you compliance.

But personal agents live in a different world.

They are closer to dotfiles than SaaS platforms.

They are closer to cron jobs than Kubernetes.

They are closer to shell scripts than enterprise workflow engines.

And that difference matters.

## The Future Might Be Less Fancy Than We Think

The funny thing about AI is that the more powerful the models become, the less some of our abstractions matter.

Older models needed more scaffolding. They needed stricter routing, narrower tools, more explicit chains, more hand-holding.

Newer models can read a repository and understand what to do.

As harnesses improve, this trend will only accelerate.

The agent runtime will become thinner.

The folder will become more important.

The scripts will become more valuable.

The Markdown will become architecture.

The filesystem will become the interface.

That is not as exciting as a visual workflow builder with animated nodes and a landing page full of gradients.

But it is much more useful.

And if you have been writing software for long enough, you eventually develop a strange affection for useful things.

## Your AI Agent Should Be a Folder

So yes, after trying the proper tools, reading the docs, testing the frameworks, and trying to make my personal agent feel like a serious piece of software, I ended up with a directory.

A folder with Markdown files.

A folder with Python scripts.

A folder with Bash scripts.

A folder with logs.

A folder with state.

A folder that my AI harness can read, understand, and operate.

That may sound too simple.

But I think that is exactly the point.

For personal AI agents, the future is not necessarily another framework.

The future might be the Unix philosophy with an LLM on top.

Small tools. Plain files. Clear instructions. Composable behavior. Human-readable state. Boring scripts. Smart glue.

Your AI agent does not need to become a platform.

It needs to become a well-organized folder.

And honestly, you should try it too.
