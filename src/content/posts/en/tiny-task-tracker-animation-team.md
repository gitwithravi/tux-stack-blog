---
title: 'I Built a Tiny Task Tracker Because Jira Was Too Much for My Animation Team'
description: 'When Jira, ClickUp, and OpenProject overwhelmed a non-technical creative team, I built a lightweight custom app focused on backlog pull, visibility, and simplicity.'
pubDate: 2026-06-20
updatedDate: 2026-06-21
heroImage: '../../../assets/images/posts/simple-task-tracker.png'
categories: ['Engineering']
tags: ['task-tracker', 'project-management', 'internal-tools', 'agile', 'team-productivity']
pinned: false
---

For technical teams, project management tools are almost a default assumption.

Someone says "we need visibility," and suddenly Jira appears. Or ClickUp. Or OpenProject. Or some other tool that promises structure, workflows, dashboards, reports, boards, automations, integrations, permissions, epics, sprints, story points, dependencies, and enough configuration screens to make a normal human question their career choices.

For a development team, that might still be acceptable. Developers are used to systems that require setup, discipline, and a little suffering. We practically install suffering through package managers.

But my problem was different.

I was trying to improve task tracking for a non-technical team, mainly people working on animations. Their work is creative, visual, iterative, and production-heavy. They do not need to understand sprint ceremonies, issue types, complex workflows, labels, custom fields, or the difference between "In Review," "Ready for Review," "Reviewing," and "Review Done."

They needed something much simpler:

What work is available?

What am I working on today?

What is done?

What is blocked?

What is everyone else doing?

That was it.

And somehow, most project management tools made even this feel heavy.

## The Spreadsheet Phase

Like most internal tools, this started with spreadsheets.

Spreadsheets are seductive because they are instant. You create columns, add names, add dates, color a few rows, and for one glorious day you believe you have solved management.

Then reality enters the room.

Someone forgets to update a row. Someone adds a new column. Someone changes the format. Someone filters the sheet and forgets to remove the filter. Someone creates a duplicate copy because they were scared to edit the main one. Someone marks a task complete but the task is still being discussed somewhere else.

Sheets are good for data. They are not good for workflow.

The bigger problem was ownership. The animation team was still dependent on someone assigning work manually. If I did not assign the next task, people would wait. Not because they were lazy, but because the system trained them to wait.

That was the real bottleneck.

Not task tracking.

Task flow.

## Why Jira, ClickUp, and OpenProject Did Not Fit

I tried looking at proper project management tools. They are powerful, no doubt. But power has a cost.

For my animation team, these tools introduced too much vocabulary before they introduced value.

Backlogs became intimidating. Boards became cluttered. Forms asked for too much information. The team had to think about the tool instead of thinking about the work.

This is where many internal software decisions go wrong. We assume the best tool is the one with the most features. In reality, the best tool is the one that disappears into the team's natural workflow.

For this team, I did not need enterprise project management.

I needed a lightweight operating rhythm.

So I built a small custom app.

## The Core Idea

The app is intentionally simple.

There is a backlog.

There is today's work.

There are statuses: planned, in progress, done, and blocked.

Admins or team managers can add work to the backlog. Team members can open the backlog, pick a task, and move it into their tasks for the day. If they picked something by mistake or cannot work on it, they can move it back.

That one idea changed the workflow.

Earlier, the team waited for assignment.

Now, the team can pull work.

That sounds like a small difference, but operationally it is huge.

Push-based work creates dependency on the manager. Pull-based work creates ownership in the team.

The backlog became a visible queue of available work. The daily task list became a commitment. The dashboard became a way to understand progress without asking everyone individually.

It borrowed the useful parts of agile without importing the entire religion.

## What I Took from Agile, and What I Ignored

I did not want to build "Jira Lite."

That would have been a tragic little software accident.

Instead, I took only the parts that made sense for this team.

From agile, I kept the backlog idea. There should be a clear list of available work that is not yet picked up.

I kept the Kanban-style visibility. Work should move through simple states: planned, in progress, done, blocked.

I kept daily visibility. Not a heavy standup, not a ceremonial meeting, just a practical answer to: what is everyone doing today?

I ignored story points.

I ignored epics.

I ignored complex sprint planning.

I ignored over-engineered permissions.

I ignored the idea that every team must follow the same process as a software engineering team.

Creative production has its own rhythm. The tool should respect that.

## Why the Custom Tool Worked

The reason this worked was not because the software was technically impressive.

It worked because it matched the team.

A team member logs in and sees what they need. They can add today's work. They can update status. They can pick from backlog. They can see history. Managers can see team status. Admins can manage members and teams. Reports can be generated when needed.

Nothing more dramatic than that.

But that simplicity created visibility.

Now I can see who is working on what. I can see what is blocked. I can see whether tasks are moving. I can see if someone has no work assigned. I can see whether the backlog is healthy or empty. I can see the difference between "people are busy" and "work is actually progressing."

That visibility was almost impossible in sheets because sheets showed data, not flow.

## The Best Feature Is Not a Feature

The best part of the system is not the dashboard.

It is not the reports.

It is not even the backlog.

The best part is that the animation team no longer has to wait for me to assign the next task.

They open the backlog and pick work.

That one behavioral change is more valuable than a hundred configuration options.

A good internal tool does not just store information. It changes the way work moves.

## What This Taught Me

This project reminded me of something I keep learning again and again: software should be built for the use case, not for the category.

The category says "project management."

So your brain immediately jumps to Jira, ClickUp, OpenProject, Trello, Asana, Linear, Notion, and whatever new productivity tool is currently raising money to reinvent columns.

But the use case was not "project management."

The use case was:

Help a non-technical animation team know what work exists, pick work without waiting, update progress easily, and give managers visibility without forcing everyone into a complicated tool.

Once I framed the problem that way, the solution became obvious.

A small custom app was enough.

Actually, it was better than enough.

## Small Software, Big Workflow Improvement

There is a certain satisfaction in building small software that actually gets used.

Not a grand platform. Not a perfect architecture. Not a tool with every possible feature.

Just a focused system that solves a real bottleneck.

This task tracker gave us more visibility than sheets. It was easier for the team than Jira or ClickUp. It gave managers a clearer view of the work. It gave team members more independence. It introduced backlog and Kanban-style progress tracking without overwhelming people with agile jargon.

And most importantly, it respected the team it was built for.

That, I think, is the underrated part of internal tools.

The goal is not to make people adapt to software.

The goal is to make software adapt to how people actually work.

The code is public here:
https://github.com/gitwithravi/team-status-check

It is still a small, practical internal tool rather than a polished SaaS product, but that is exactly the point. If you have a small creative, operations, support, or non-technical team that finds Jira, ClickUp, or OpenProject too overwhelming, give it a spin.

Clone it, run it, break it, adapt it to your workflow, and see if this simpler backlog-to-daily-work model fits your team better.

And if it helps even one team stop managing work through chaotic spreadsheets and "bro, what should I do next?" messages, I would consider that a very successful little project.
