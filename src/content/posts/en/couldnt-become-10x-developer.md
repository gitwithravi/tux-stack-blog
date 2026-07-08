---
title: "I Couldn't Become a 10x Developer"
description: 'The pursuit of becoming a 10x developer through context-switching across six projects, multiple languages, and AI agents — and the quiet realization that 1.5x is honest work.'
pubDate: 2026-07-08
heroImage: '../../../assets/images/posts/10x-engineer.png'
heroImageAlt: 'Illustration of a developer overwhelmed by multiple projects, terminals, and dependency conflicts on the path to becoming a 10x engineer.'
categories: ['Engineering', 'AI']
tags:
  [
    '10x-developer',
    'productivity',
    'context-switching',
    'ai-coding',
    'developer-experience',
    'tooling',
    'mise',
    'dependency-management',
    'software-engineering',
  ]
pinned: false
---

I tried.

I really did.

Like every responsible modern software person with a GitHub account, a terminal, and a mild superiority complex, I too wanted to become a **10x developer**.

Because apparently that is what everyone wants now.

Not a good developer.
Not a reliable developer.
Not a developer who writes code that still runs after six months.

No.

A **10x developer**.

The mythical creature who ships features before product managers finish explaining them. The person who uses keyboard shortcuts for breathing. The person who opens six terminals, three code editors, two AI agents, one database console, and somehow emerges with a production-ready SaaS before lunch.

Naturally, I looked at this and thought:

"What if I start with six projects?"

Not ten, because I am humble.

Three existing projects. Three new projects.

A modest attempt at becoming a **6x developer**.

Or as I now call it: distributed suffering.

## The First Mistake: Starting New Projects

The problem with new projects is that they feel clean.

There is no legacy code. No strange naming convention. No mysterious `utils_old_final_v2.py`. No comment saying:

```python
# temporary fix, remove after demo
```

from two years ago.

A new project is beautiful because it has not yet met you.

So, like all of us do in our moments of optimism, I started a new project with FastAPI.

And because I use Arch, by the way, the coding agent scaffolded everything with Python 3.14.

Of course it did.

Arch looked at the rest of the software world and said, "Why are you people still using stable things?"

The agent happily created the project. The virtual environment worked. Dependencies installed. The server ran. Everything was good.

I was too latest for the world.

For about twelve minutes, I felt unstoppable.

Then I went back to an existing FastAPI project.

That project was written around two years ago by a much humbler developer.

A 0.5x developer.

His name was also Ravi.

And 0.5x Ravi had made certain decisions. Reasonable decisions at the time. Decisions involving older Python versions, older dependencies, and packages that had not emotionally prepared themselves for Python 3.14.

So the project did not run.

Not because the code was bad.

Okay, maybe slightly because the code was bad.

But mostly because software has this beautiful property where everything works until you update literally anything.

The good news is that Python dependency hell is not what it used to be. `uv` came to the rescue. I created the right environment, pinned the right version, installed the dependencies properly, and the old FastAPI project started breathing again.

It was manageable.

That is important.

I am not saying this was impossible. I am not saying I was defeated by virtual environments. I know how to manage Python versions. I did manage it.

The problem was not that it could not be managed.

The problem was that it became yet another thing to manage.

And this is where the 10x dream starts developing cracks.

## Then PHP Entered the Chat

After Python finished its small ritual of humiliation, I moved to PHP.

One new PHP project needed PHP 8.5.

One existing project needed PHP 8.3.

Again, this is not some unsolvable engineering crisis. Docker exists. Containers exist. Compose files exist. There are clean ways to isolate runtime versions.

So for the older PHP project, Docker came to the rescue.

PHP 8.3 inside a container. Database inside another container. The app runs. Composer is happy. Laravel stops crying.

Beautiful.

Except now my development flow had changed again.

For the new project, I was running things locally. For the old project, I was inside Docker. One used the system PHP. One used container PHP. One had local Composer. One had Composer inside the container. One needed `php artisan serve`. The other needed `docker compose exec app php artisan migrate`.

Again, manageable.

Again, headache.

This is the theme.

Modern development is not hard because we do not have tools.

Modern development is hard because we have seventeen excellent tools, and each one requires just enough mental attention to ruin your afternoon.

## Node.js, Because Apparently I Had Not Suffered Enough

Then came Node.

One project was on a newer version. Another project needed an older version because some package deep inside the dependency tree had opinions.

Not strong opinions. Just fatal ones.

You know the kind.

The kind where you run:

```bash
npm install
```

and the terminal replies with something that looks less like an error and more like a legal document.

Then you discover one project wants Node 22, another behaves better on Node 20, and a third has a lockfile from a civilization that believed in Node 18.

You try `nvm`.

Then you remember you are also managing Python.

Then PHP.

Then Docker.

Then pnpm in one project, npm in another, bun in the experimental one because at some point you clearly lost adult supervision.

And suddenly your terminal history looks like a man trying to negotiate peace between package managers.

## The Other Conflicts Nobody Warns You About

The runtime version conflicts are only the famous ones.

There are also the quieter, more annoying ones.

One project uses PostgreSQL 16. Another was built with PostgreSQL 14 in mind. One migration uses a feature your local database does not support. Another project has Redis in Docker. Another expects Redis locally. One project assumes ports 3000 and 5432 are free, which is adorable because every other project also assumes the same thing.

One project uses Tailwind v3. Another uses Tailwind v4. One has the old config file. One has the new CSS-first setup. One shadcn installation expects a certain structure. Another one was created before the CLI changed its behavior and now behaves like an archaeological artifact.

One project uses Prisma. Another uses Drizzle. Another uses raw SQL because the developer who wrote it believed ORMs were a government conspiracy.

That developer was also Ravi.

Then there are environment variables.

Every project has a `.env`.

Every `.env` has a different naming convention.

One uses `DATABASE_URL`. Another uses `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, because apparently we are paid by the variable.

One project uses `REDIS_URL`.

Another uses `CACHE_REDIS_HOST`.

Another uses `UPSTASH_REDIS_REST_URL`, because why should pain have only one format?

All of this can be managed.

That is not the point.

The point is that by the time you have managed it, you have spent a significant amount of your brain just preparing to do the actual work.

And the actual work is still waiting there, smiling.

## The Tooling Solution: Mise

There is a class of tools that makes this much better.

One of them is `mise`.

`mise` lets you manage runtime versions per project. Instead of remembering which project needs which version of Python, Node, PHP, Go, or whatever else we have collectively decided to install this week, you define it in a config file.

For example, inside a project you can create:

```toml
# mise.toml

[tools]
python = "3.12"
node = "20"
php = "8.3"

[env]
APP_ENV = "local"
```

Then when you enter the project directory, `mise` knows what versions to use.

You can install the required tools:

```bash
mise install
```

You can check what is active:

```bash
mise current
```

You can run commands inside the correct environment:

```bash
mise exec -- python --version
mise exec -- node --version
mise exec -- php -v
```

You can also define project tasks.

```toml
# mise.toml

[tools]
python = "3.12"
node = "20"

[tasks.dev]
run = "uvicorn app.main:app --reload"

[tasks.test]
run = "pytest"

[tasks.lint]
run = "ruff check ."
```

Now instead of remembering whether this project uses `uvicorn`, `fastapi dev`, `npm run dev`, `pnpm dev`, `bun dev`, `php artisan serve`, or some cursed shell script written during a production incident, you can just run:

```bash
mise run dev
```

That is useful.

You can go further and create aliases in your shell for better productivity.

For example, in `.bashrc` or `.zshrc`:

```bash
alias mr='mise run'
alias mi='mise install'
alias mc='mise current'
alias mx='mise exec --'
```

Now your workflow becomes:

```bash
mi
mc
mr dev
mr test
```

This sounds small, but it matters.

Because the cost is not just typing.

The cost is remembering.

Typing `docker compose exec app php artisan migrate` is not difficult. Remembering which project needs that exact command while you are already thinking about business logic, database structure, validation rules, AI prompts, and whether your back pain is caused by your chair or your career choices — that is the real tax.

A good local development setup should reduce memory load.

It should make the correct thing obvious.

It should make the wrong thing harder.

It should allow your brain to stay focused on the project instead of becoming a runtime version switchboard.

So yes, `mise`, Docker, `uv`, `nvm`, `asdf`, Dev Containers — all of these tools help.

They solve a real problem.

But they only solve the machine dependency hell.

They do not solve the human one.

## The Real Dependency Hell Is in the Brain

This is the part no one talks about.

Your brain is also a kind of computer.

Not in the LinkedIn motivational-post sense where someone says, "Your mind is your operating system."

I mean in the practical sense.

When you work on a project, your brain loads context.

It remembers the data model. The folder structure. The edge cases. The naming conventions. The reason why `status` is a string in one table but an enum in another. The fact that this API returns `user_id`, but that frontend expects `userId`, because two different versions of you wrote them during two different emotional climates.

Once that context is loaded, your brain performs exceptionally well.

This is why deep work feels powerful.

You are not just typing code. You are holding a model of the system in your head. You understand how the pieces connect. You know where the fragile parts are. You can predict the consequences of a change before making it.

That is real engineering.

But when you try to become a 6x developer, you are not just switching files.

You are unloading and reloading worlds.

FastAPI project: load Python mental model.
Laravel project: load PHP mental model.
Next.js project: load React mental model.
Old project: load legacy decisions.
New project: load architecture decisions.
AI agent: load prompt and planning context.
Database: load schema.
Deployment: load environment assumptions.
Product: load requirements.

This is not multitasking.

This is context bankruptcy.

The machine can switch directories instantly.

Your brain cannot.

Your terminal does not care if you opened six projects.

Your working memory very much does.

At some point, I realized I was not tired because coding had become harder.

I was tired because I was repeatedly reconstructing reality.

## AI Agents Did Not Magically Fix This

Now, one may ask:

"But don't AI coding agents make this easier?"

Yes.

Also no.

This depends entirely on how you use them.

If your workflow is pure vibe coding, then sure, maybe you can feel like a 10x developer.

You open a project and say:

"Build me a dashboard."

Then the agent creates twelve files, updates six dependencies, adds three abstractions, invents a design system, and confidently implements half the business logic incorrectly.

But it looks fast.

And speed is very seductive when you do not yet understand the cost of cleaning up after it.

My workflow is not that.

I do not treat the coding agent as a magical intern with root access to my future.

I treat it more like an architect consultant and junior developer.

That means I use AI to clarify requirements. I discuss how something should be built. I ask it to challenge my assumptions. I think through the data model. I decide the boundaries. I review the plan. I ask what can go wrong. I make it explain tradeoffs.

Then, once the direction is clear, I become something like a vibe coder lite.

I tell the agent:

"Write this class."

"This API route should accept this input."

"This should return this shape."

"Do not add unnecessary abstraction."

"Use this table."

"Keep this deterministic."

"No, do not create a service layer for three lines of logic."

In other words, I still write the project.

I just write much of it in English now.

And this is powerful.

But it is not free.

Because if you use AI this way, you are still thinking.

You are still designing.

You are still reviewing.

You are still responsible.

The agent may write the code, but you are carrying the architecture in your head.

That means the human context problem still exists.

Actually, in some cases, it becomes sharper.

Because now the agent can produce code faster than your brain can safely evaluate architectural consequences.

So you are not limited by typing speed anymore.

You are limited by judgment.

And judgment does not scale to 10x just because autocomplete got promoted to coworker.

## The 10x Developer Was Always a Strange Idea

The more I think about it, the more the 10x developer idea feels suspicious.

In very narrow conditions, maybe it exists.

A deeply experienced person working in a familiar domain, on a well-understood codebase, with clear requirements, uninterrupted time, good tooling, and low organizational nonsense can absolutely outperform an average developer by a huge margin.

But that is not because they are permanently 10x.

It is because the environment allows their expertise to compound.

Take the same person and throw them across six projects with different languages, different runtimes, different dependency graphs, different business rules, and different levels of legacy guilt, and suddenly the 10x developer starts googling why `node-gyp` has chosen violence.

The industry loves the idea of individual productivity multipliers because it is easier than talking about systems.

It is easier to say "be a 10x developer" than to say:

- Reduce context switching.
- Improve project setup.
- Write better documentation.
- Keep dependencies boring.
- Make onboarding predictable.
- Avoid unnecessary rewrites.
- Stop starting five things before finishing one.
- Give developers uninterrupted time.
- Do not confuse AI-generated velocity with engineering progress.

But those are boring.

And "boring" does not trend.

## My Final Form: 1.5x Developer

After all this, I reached a painful but peaceful conclusion.

AI in its current form will not make me a 10x developer.

It might make me a 1.5x developer.

And honestly, that is not bad.

A 1.5x developer who makes better decisions, writes faster boilerplate, catches mistakes earlier, documents things better, explores alternatives more quickly, and avoids some repetitive work is already a massive improvement.

But 1.5x is not as marketable as 10x.

No one wants to sell a course called:

"Become 1.5x Better Through Better Tooling, Clearer Thinking, Reduced Context Switching, and Responsible AI Usage."

Even though that would probably be the most honest course in the industry.

The truth is, AI helps.

Good tooling helps.

`mise` helps.

Docker helps.

`uv` helps.

A clean `README` helps more than people want to admit.

But none of these remove the core responsibility of software work.

You still need to understand what you are building.

You still need to manage complexity.

You still need to protect your working memory.

You still need to know when the agent is being helpful and when it is confidently building a cathedral for a tea stall.

So no, I could not become a 10x developer.

I became a slightly faster, slightly more organized, slightly more dangerous version of myself.

A 1.5x developer.

Maybe 2x on a good day.

0.7x after dependency conflicts.

And honestly, that feels more real.

Because the future of development may be AI-assisted.

But the bottleneck is still human judgment.

And unfortunately, human judgment does not install cleanly with:

```bash
mise install
```
