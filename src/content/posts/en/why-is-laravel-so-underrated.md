---
title: 'Why Is Laravel So Underrated?'
description: 'Laravel gets dismissed as outdated PHP, but it still ships serious business applications faster than most modern stacks. Here is why it remains my default for backend APIs.'
pubDate: 2026-06-26
heroImage: '../../../assets/images/posts/laravel.png'
heroImageAlt: 'Illustration of Laravel as a practical backend framework for shipping business applications.'
categories: ['Engineering']
tags:
  [
    'laravel',
    'php',
    'web-development',
    'backend',
    'eloquent',
    'filament',
    'frameworks',
    'developer-productivity',
  ]
pinned: false
---

Ask a developer what technology stack they use, and you will probably hear one of these answers:

- MERN
- Spring Boot
- FastAPI
- Go
- Next.js
- Node.js
- Some framework released three months ago
- And, of course, Rust—the answer to problems you may not even have yet

What you do not hear very often is:

> "I build applications using Laravel."

That is strange because I would bet that a significant percentage of web developers have used PHP somewhere in their journey.

Maybe it was their first dynamic website. Maybe it was WordPress. Maybe they maintained an old PHP application. Maybe they built something with CodeIgniter, Symfony or Laravel.

PHP has quietly powered a massive portion of the web for decades.

Yet today, telling someone that most of your applications use Laravel can sometimes invite judgement.

People assume that your stack is outdated.

They imagine unstructured PHP files, SQL queries mixed with HTML and a shared hosting account accessed through FTP.

Laravel is somehow made to answer for every badly written PHP application ever created.

But I still use Laravel for more than half of my projects.

Not because I do not know the alternatives. I regularly work with Python, Node.js, Next.js, Go and Java. I use different technologies depending on the problem.

But when I need to build a serious web application quickly, Laravel is still one of my first choices.

More specifically, my preferred combination is often:

> Laravel for APIs and business logic, with React or Next.js for the frontend.

And there are some very good reasons for that.

## Laravel Solves the Boring Problems

Most web applications are not built around a revolutionary technical challenge.

They usually need some combination of:

- Authentication
- Authorization
- Database operations
- Validation
- File uploads
- Emails
- Notifications
- Background jobs
- Scheduled tasks
- Caching
- API endpoints
- Rate limiting
- Search
- Audit logs
- Webhooks
- Testing
- Error handling

Almost every modern backend framework can implement these features.

The difference is how much work you must do before you reach the actual business problem.

Laravel gives you sensible, integrated mechanisms for nearly all of them.

Authentication can be handled through Laravel Sanctum or Passport.

Authorization can be implemented using policies and gates.

Background processing is supported through queues, workers and job middleware.

Scheduled tasks are defined inside the application instead of being scattered across mysterious cron entries.

Events and listeners help separate workflows.

Notifications can be delivered through email, databases, Slack and other channels.

Caching supports drivers such as Redis and Memcached.

The service container provides dependency injection.

Middleware handles cross-cutting request logic.

Form requests keep validation outside controllers.

API resources give you a clean transformation layer for responses.

Database migrations, factories and seeders make schema evolution and test data manageable.

There is nothing particularly glamorous about these features.

That is precisely why they matter.

Laravel lets you spend less time assembling infrastructure and more time implementing the application.

## Laravel Is Opinionated in the Right Places

Developers sometimes describe opinionated frameworks as restrictive.

I see them differently.

An opinionated framework reduces the number of decisions you need to make before creating anything useful.

A new developer joining a Laravel project generally knows where to look for things:

- Models are in one place.
- Controllers are in another.
- Jobs have a defined location.
- Policies follow a known convention.
- Migrations describe the database history.
- Routes are easy to locate.
- Configuration follows predictable patterns.

You can ignore those conventions, of course. No framework can stop you from creating chaos.

But Laravel gives teams a shared vocabulary and project structure from day one.

This becomes particularly valuable in business applications, where the real complexity is usually not the framework. It is the constantly evolving business logic.

## Eloquent Is Magical

Yes, I know.

Some developers dislike active record ORMs. Some prefer repositories, data mappers, generated query layers or handwritten SQL for everything.

Those approaches have valid use cases.

But Eloquent remains one of Laravel's strongest features.

It makes working with relationships almost effortless.

```php
$household->expenses()
    ->with(['payer', 'items'])
    ->whereBetween('paid_at', [$startDate, $endDate])
    ->get();
```

That code is readable even to someone who did not write it.

Relationships, scopes, casts, accessors, mutators, observers and eager loading allow you to express a surprising amount of business logic without writing repetitive plumbing.

Can Eloquent be misused?

Absolutely.

Careless lazy loading can create N+1 queries. Huge datasets require pagination, chunking or more direct database operations. Complex reporting queries may be better written using the query builder or raw SQL.

But that does not make Eloquent bad.

It means abstractions still require developers to understand what happens underneath them.

For the majority of transactional web applications, Eloquent offers an exceptional balance between productivity and control.

## Laravel Is More Than CRUD

Laravel is frequently dismissed as a framework for basic CRUD applications.

That description says more about how frequently CRUD applications are needed than it says about Laravel.

A typical business system might include:

- Multi-tenant access
- Role-based authorization
- Approval workflows
- Queue-driven imports and exports
- Notifications
- Payment integrations
- Scheduled reconciliation
- Document generation
- Webhook processing
- Search indexing
- Audit trails
- Real-time events
- External API integrations

Laravel has mature patterns or ecosystem packages for all of these.

Laravel Horizon provides visibility into Redis-backed queues.

Laravel Reverb supports real-time WebSocket communication.

Laravel Scout provides a consistent interface for search.

Laravel Cashier helps with subscription billing.

Laravel Socialite handles OAuth-based authentication.

Laravel Pennant supports feature flags.

Laravel Pulse provides application performance insights.

Laravel Telescope helps inspect requests, queries, jobs, exceptions and other activity during development and debugging.

The ecosystem is not merely large. It is unusually coherent.

Most first-party tools feel like extensions of the framework rather than unrelated packages stitched together.

## "But PHP Cannot Handle Concurrency"

This criticism is usually based on the traditional PHP request lifecycle.

In a conventional PHP-FPM setup, the application is bootstrapped for each request. PHP loads the framework, processes the request, sends the response and releases the execution context.

That model is simple, isolated and reliable, but repeatedly booting the framework introduces overhead.

Laravel Octane changes this model.

Octane runs Laravel using high-performance application servers such as FrankenPHP, RoadRunner, Open Swoole or Swoole.

Instead of booting the entire application for every request, Laravel is booted once and kept in memory. The application server then passes incoming requests to the already-running application workers.

This reduces framework bootstrapping overhead and can substantially increase throughput.

FrankenPHP provides a modern PHP application server built around Caddy, while RoadRunner runs as a high-performance process manager and application server written in Go.

Octane does require a slightly different mindset.

Because the application remains alive across requests, developers must be careful about unintentionally retaining request-specific state in singletons, static properties or long-lived services.

But when used correctly, Octane allows Laravel to handle workloads that many developers incorrectly assume require switching to an entirely different language.

Will Laravel outperform every carefully optimized Go or Rust service?

No.

Does the average business application need it to?

Also no.

Performance should be evaluated against actual requirements, not programming-language mythology.

## Laravel Can Scale

Laravel is not a substitute for architecture.

A badly designed Laravel application will scale badly, just as a badly designed Node, Java, Go or Python application will.

But Laravel itself does not prevent scaling.

You can run multiple stateless application instances behind a load balancer.

You can use Redis for distributed caching and sessions.

You can move long-running operations into queues.

You can split workers based on job type or priority.

You can separate read-heavy workloads.

You can add database replicas.

You can use object storage for files.

You can containerize the application.

You can isolate selected services when there is a genuine reason to do so.

The framework does not force you to keep everything on one server forever.

It simply allows you to begin with a modular monolith—which is where most applications should begin.

## Most Projects Do Not Need a Planet-Scale Event-Driven Microservice Mesh

There is a tendency in software development to design systems for the company we imagine we will become rather than the users we currently have.

A team building an internal portal for 2,000 users starts discussing:

- Microservices
- Kafka
- Kubernetes
- Event sourcing
- Service meshes
- Distributed tracing
- Multi-region active-active infrastructure
- Independent deployment pipelines for twelve services

The application has not yet acquired its first user, but its architecture is already prepared for a global banking network.

Most web applications do not need that.

Most small and medium applications need:

- A well-structured codebase
- A reliable relational database
- Background jobs
- Caching
- Object storage
- Monitoring
- Automated deployments
- Regular backups
- A framework the team understands

A Laravel modular monolith can comfortably handle this.

And when one part of the application develops genuinely different scaling, deployment or reliability requirements, you can extract it later.

Microservices should emerge from demonstrated boundaries and operational needs—not from a desire to make the architecture diagram more impressive.

## Development Speed Is a Technical Advantage

Developer productivity is often treated as something separate from technical quality.

It is not.

Shipping an application quickly means you receive feedback sooner.

Receiving feedback sooner means you discover incorrect assumptions earlier.

Discovering incorrect assumptions earlier reduces the cost of changing them.

Laravel is incredibly effective at shortening the distance between an idea and a working system.

Artisan commands generate common structures.

Migrations make database changes repeatable.

Factories simplify testing.

Validation is expressive.

Queues are easy to introduce.

The local development experience is straightforward.

The documentation is unusually consistent.

And because many common problems already have established Laravel solutions, you spend less time inventing framework conventions inside every project.

That speed matters, especially for small teams.

## Testing Is Not an Afterthought

Laravel provides a strong testing experience out of the box.

You can test HTTP endpoints, authentication, validation, database changes, queued jobs, events, notifications, emails, storage operations and console commands without constructing your own testing infrastructure.

Fakes make it possible to test behaviour without actually sending emails, uploading files or dispatching external notifications.

For example:

```php
Notification::fake();

$this->postJson('/api/invoices', $payload)
    ->assertCreated();

Notification::assertSentTo(
    $approver,
    InvoiceSubmitted::class
);
```

Laravel applications are not automatically testable.

You can still write tightly coupled code.

But the framework provides almost everything required to build a reliable automated test suite.

## Laravel Has Entered the AI Ecosystem

Until recently, building AI-powered applications in Laravel often meant directly integrating provider SDKs or using community packages.

That is changing.

The first-party Laravel AI SDK now provides a Laravel-style interface for working with multiple AI providers.

It supports capabilities such as:

- Text generation
- Structured outputs
- Tool-calling agents
- Streaming responses
- Embeddings
- Image generation
- Audio and transcription
- Vector stores
- Files and attachments

Its agent model allows you to define instructions, context, tools and output schemas in dedicated PHP classes.

The SDK is still young, and the broader AI ecosystem remains far more mature in Python.

I would not claim that Laravel has suddenly replaced Python for machine learning or complex agent research.

But many AI-enabled products are still web applications first.

They need users, permissions, billing, queues, databases, approval workflows, notifications and APIs. The model call is often only one step inside a larger business process.

For these applications, being able to implement AI workflows inside an existing Laravel codebase is extremely valuable.

Laravel also now provides first-party Model Context Protocol support, making it possible to expose application tools, resources and prompts to compatible AI clients.

The ecosystem is evolving quickly.

## A Special Shoutout to Filament

No discussion about Laravel productivity is complete without mentioning Filament.

Filament is one of those tools that you need to try before you fully understand its value.

It allows you to create admin panels, dashboards, forms, tables, filters, actions, widgets and data-management interfaces largely through PHP configuration.

For internal applications, it can feel almost unfair.

Suppose you need to create a small ERP containing:

- Employees
- Departments
- Assets
- Purchase requests
- Approvals
- Vendors
- Invoices
- Reports
- Role-based access

With Laravel and Filament, you can create the underlying models, migrations and relationships, then build functional administration interfaces in an extraordinarily short time.

Tables support searching, sorting, filtering, pagination and bulk actions.

Forms support validation, conditional fields, relationship selectors, repeaters and file uploads.

Resources map naturally to Eloquent models.

Widgets make dashboards straightforward.

Custom pages and actions allow you to move beyond CRUD whenever necessary.

Filament is not the right choice for every customer-facing interface. Highly interactive consumer applications may still need a dedicated React, Vue or Next.js frontend.

But for admin panels, operations portals, internal tools and small ERPs, Laravel with Filament is one of the most productive combinations available today.

Try it once.

Build a small inventory system, approval portal or maintenance tracker with it.

You may be surprised by how quickly you reach a usable product.

## Laravel Is Not Always the Answer

Laravel is not the ideal choice for everything.

For CPU-heavy processing, another language may be more appropriate.

For machine-learning research, Python has the stronger ecosystem.

For extremely performance-sensitive infrastructure, Go or Rust may provide better characteristics.

For some event-driven or real-time applications, Node.js may feel more natural.

For deeply integrated enterprise environments, Java and Spring may be the conventional choice.

And sometimes a full-stack Next.js application is all you need.

Good engineering is not about proving that one framework can do everything.

It is about choosing the tool whose strengths match the problem, the team and the delivery constraints.

I use Python, Node.js, Next.js, Go and Java frequently across different projects and workflows.

But when I need to build a web application and do not have months to assemble its foundation, my default remains:

> Laravel for the backend APIs and React or Next.js for the frontend.

It is productive.

It is mature.

It is well documented.

It has a strong ecosystem.

It scales far beyond what most projects will ever require.

And Eloquent is still magical.

Laravel may not be the framework people mention first when discussing fashionable technology stacks.

But it continues to quietly help teams build and ship real applications.

That is exactly why I consider it so underrated.
