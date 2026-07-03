---
title: 'We Abused POST for Years. HTTP QUERY Is the Apology.'
description: 'Complex read-only queries have been hiding inside POST /search endpoints for years. RFC 10008 adds an HTTP QUERY method — safe, idempotent, and built for body-heavy reads. Here is how it changes API design.'
pubDate: 2026-07-03
categories: ['AI']
tags: ['http', 'api-design', 'networking', 'rfc', 'web']
heroImage: '../../../assets/images/posts/http-query-param.png'
pinned: false
---

I have had this small irritation with HTTP APIs for years.

Not the kind of irritation that blocks work. More like the kind that sits quietly in the corner of your brain while you build yet another API and think, “This works, but it does not feel right.”

The situation usually starts innocently.

You have a resource. Let's say orders.

You expose a simple endpoint:

```http
GET /orders?status=pending HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer <token>
```

This is clean. This is understandable. This is exactly what `GET` is good at.

Then the requirement grows.

You need date filters. Then customer filters. Then sorting. Then includes. Then nested filters. Then the frontend wants advanced search. Then the admin panel wants exports. Then someone wants to send 200 IDs. Then someone wants grouping and aggregations.

Before long, your nice little `GET` becomes this creature:

```http
GET /orders?status=pending&from=2026-01-01&to=2026-06-30&customer_ids=1021,1022,1044,1099&include=line_items,payments,refunds&sort=-created_at HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer <token>
```

And that is still a mild example.

At some point, every developer looks at a URL like this and knows the truth: this query no longer belongs in the URL.

So we do what everyone does.

We move the query into the body and call it `POST`.

```http
POST /orders/search HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>

{
  "status": "pending",
  "from": "2026-01-01",
  "to": "2026-06-30",
  "customer_ids": [1021, 1022, 1044, 1099],
  "include": ["line_items", "payments", "refunds"],
  "sort": "-created_at"
}
```

And honestly, this works.

It is readable. It is practical. Every framework supports it. Every HTTP client knows what to do with it. Every API gateway has seen this pattern a thousand times.

But it has always felt like a lie.

This request is not creating an order. It is not cancelling anything. It is not charging a customer. It is not sending an email or triggering a workflow. It is just asking a complex read-only question.

Yet because the question needed a body, we pushed it through `POST`.

I have wondered about this gap many times while designing APIs. Not in a dramatic “HTTP is broken” way. More like: why do we have such a clean method for simple reads, but the moment the read becomes complex, we have to pretend it is an action?

Then around June 15, I came across RFC 10008.

HTTP now has a method for this.

It is called `QUERY`.

RFC 10008, published as a Proposed Standard in June 2026, defines `QUERY` as an HTTP method where the request target processes the enclosed content in a safe and idempotent manner and returns the result. The RFC page was last updated on June 15, 2026, which is roughly when this started showing up in my feed.

And the moment you see it, the reaction is basically:

Of course.

This is the missing word.

## What QUERY actually means

A `QUERY` request looks very similar to the `POST /search` workaround we already use.

The difference is not the shape of the request. The difference is the meaning of the request.

Instead of this:

```http
POST /orders/search HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>

{
  "status": "pending",
  "from": "2026-01-01",
  "to": "2026-06-30",
  "customer_ids": [1021, 1022, 1044, 1099],
  "include": ["line_items", "payments", "refunds"],
  "sort": "-created_at"
}
```

You can express the same idea like this:

```http
QUERY /orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>
X-Request-ID: req_20260703_01HZY

{
  "status": "pending",
  "from": "2026-01-01",
  "to": "2026-06-30",
  "customer_ids": [1021, 1022, 1044, 1099],
  "include": ["line_items", "payments", "refunds"],
  "sort": "-created_at"
}
```

The target resource is still `/orders`.

The body contains the question.

The method says: process this body as a query, but do it safely.

That is the important part. `QUERY` is not merely “POST with a better name.” The RFC explicitly defines it as safe and idempotent. It says a `QUERY` request is similar to `POST` because the input is passed in the request content, but unlike `POST`, it can be automatically repeated or restarted without concern for partial state changes.

That one detail matters more than it first appears.

HTTP methods are not just words before a URL. They are signals to the whole stack.

A browser, client SDK, API gateway, cache, proxy, service mesh, load balancer, retry policy, observability tool, and future developer all look at the method and infer something about the request.

`GET` says: this should be a read.

`POST` says: this may do something.

`QUERY` says: this is a read, but the question is complex enough to need a body.

That is the gap.

## GET was good. We just stretched it too far.

I do not think `QUERY` makes `GET` any less important.

For simple reads, `GET` is still the right answer:

```http
GET /users?role=admin&active=true HTTP/1.1
Host: api.example.com
Accept: application/json
```

This is clean. It is cacheable. It is easy to inspect. You can paste it into a browser, curl it, log it, bookmark it, or put it behind a CDN.

The problem begins when we try to force structured query languages into query parameters.

A URL is a great place for small input. It is a terrible place for a complex object.

The RFC itself gives a very practical explanation of this: URI-encoded query data can run into size limits across intermediaries, encoding structured data into a URI is inefficient, request URIs are more likely to be logged or bookmarked, and encoding query inputs directly into the URI turns every combination into a distinct resource identifier.

This is exactly the discomfort I have felt for years. It was never that `GET` was bad. It was that we kept asking it to do a job that needed a body.

Imagine an admin panel where you want users who:

- are active
- belong to certain teams
- have specific permissions
- have not logged in since a date
- need audit information included
- must be sorted by risk score

Yes, you can encode that into query parameters.

But at that point, you are not really designing an API anymore. You are designing a mini serialization format inside the URL.

With `QUERY`, the shape becomes much more natural:

```http
QUERY /users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>

{
  "active": true,
  "teams": ["finance", "operations"],
  "permissions": ["billing.read", "reports.export"],
  "last_login_before": "2026-01-01",
  "include": ["audit_summary", "permission_sources"],
  "sort": "-risk_score"
}
```

That feels like what I always wanted to write.

Not `POST /users/search`.

Not `POST /users/filter`.

Just `QUERY /users`.

Ask the users resource a complex read-only question.

## POST became the duct tape of complex reads

The reason `POST /search` became common is not because developers hate HTTP semantics.

It became common because it solved a real problem.

A body is a much better place for complex input. You can send JSON. You can send arrays. You can send nested filters. You can send a query language. You do not have to fight URL encoding. You do not have to wonder whether some proxy in the chain has a smaller URL limit than you expected.

So we built endpoints like this:

```http
POST /analytics/events/search HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>

{
  "where": {
    "status": 500,
    "service": "payments"
  },
  "group_by": ["event_name"],
  "time_range": {
    "from": "2026-07-01T00:00:00Z",
    "to": "2026-07-03T00:00:00Z"
  }
}
```

Again, this works.

But the problem is that infrastructure cannot understand intention from endpoint naming.

A human may look at `/analytics/events/search` and assume it is probably safe.

But a generic HTTP client cannot know that.

An API gateway cannot know that.

A retry policy cannot know that.

A service mesh cannot know that.

To the infrastructure, this is just `POST`.

And `POST` is the kitchen drawer of HTTP methods. Sometimes it creates a resource. Sometimes it performs an action. Sometimes it starts a job. Sometimes it sends an email. Sometimes it performs a payment. Sometimes it just searches.

That ambiguity is why `QUERY` is useful.

It gives complex read-only operations their own method instead of making them hide behind a method that may or may not have side effects.

## QUERY is not only JSON search

The obvious examples use JSON because most APIs today speak JSON.

For example:

```http
QUERY /analytics/events HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>

{
  "filter": {
    "status": 500,
    "service": "payments"
  },
  "group_by": ["event_name"],
  "metrics": ["count"],
  "limit": 20
}
```

This alone makes sense.

But `QUERY` is more interesting than “GET with a JSON body.”

The request content can be any query representation the server understands. The `Content-Type` header tells the server how to interpret it. RFC 10008 says the content of the request and its media type define the query, and it defines `Accept-Query` so a server can advertise which query formats it accepts.

That means a resource could accept SQL:

```http
QUERY /analytics/events HTTP/1.1
Host: api.example.com
Content-Type: application/sql
Accept: text/csv
Authorization: Bearer <token>

SELECT event_name, COUNT(*) AS total
FROM logs
WHERE status = 500
GROUP BY event_name
ORDER BY total DESC
FETCH FIRST 20 ROWS ONLY
```

If a client hits `OPTIONS /analytics/events`, the server can reply with:

```http
Allow: GET, QUERY, OPTIONS
Accept-Query: application/json, application/sql
```

That means the client can discover exactly what query dialects the execution engine supports before it even sends the actual query.

This is where the idea starts to click.

For years, if you wanted to send a read-only SQL-like query over HTTP, you usually had to choose between forcing it into a URL, misusing `GET` with a body, or sending it through `POST`.

`QUERY` gives that pattern a semantic home.

You could also imagine GraphQL-style usage, assuming the server explicitly supports it:

```http
QUERY /graphql HTTP/1.1
Host: api.example.com
Content-Type: application/graphql
Accept: application/graphql-response+json
Authorization: Bearer <token>

query RecentFailedPayments {
  payments(status: FAILED, limit: 20) {
    id
    amount
    failedAt
    reason
  }
}
```

This does not mean existing GraphQL APIs automatically support `QUERY`. Today, GraphQL over HTTP commonly uses `POST` with a JSON body and can also use `GET` for query operations. But conceptually, this is the shape I always wished existed: a read-only query language sent over HTTP without pretending to be a mutation.

## The mental model I will use

For me, the split is now very simple.

| Method  | Request body       | Safe            | Idempotent      | Use it when                                                         |
| ------- | ------------------ | --------------- | --------------- | ------------------------------------------------------------------- |
| `GET`   | No meaningful body | Yes             | Yes             | The read is simple and fits naturally in the URL                    |
| `QUERY` | Yes                | Yes             | Yes             | The read is complex and needs structured input                      |
| `POST`  | Yes                | Not necessarily | Not necessarily | The request creates something, triggers something, or changes state |

A simple read remains a `GET`:

```http
GET /orders?status=pending HTTP/1.1
Host: api.example.com
Accept: application/json
```

A complex read becomes a `QUERY`:

```http
QUERY /orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json

{
  "status": ["pending", "partially_paid"],
  "from": "2026-01-01",
  "to": "2026-06-30",
  "include": ["customer", "line_items", "payments"],
  "group_by": ["region", "sales_owner"]
}
```

Creating an order remains a `POST`:

```http
POST /orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json

{
  "customer_id": 1021,
  "items": [
    {
      "sku": "keyboard-01",
      "quantity": 1
    }
  ]
}
```

And actions remain actions:

```http
POST /orders/ord_123/cancel HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json

{
  "reason": "customer_requested"
}
```

This is cleaner than inventing more nouns just to compensate for the lack of a method.

Instead of:

```text
POST /orders/search
POST /orders/filter
POST /orders/query
POST /orders/advanced-search
```

we get:

```text
GET    /orders              simple read
QUERY  /orders              complex read-only query
POST   /orders              create order
POST   /orders/{id}/cancel  perform action
```

That feels like an API design vocabulary upgrade.

## Why safe and idempotent matters in production

The spec words “safe” and “idempotent” can feel boring until the network fails.

Imagine a mobile app sends this:

```http
POST /orders/search HTTP/1.1
Content-Type: application/json

{ "status": "pending" }
```

The server processes the request, but the TCP connection drops before the client receives the response.

Should the client automatically retry it?

With `POST`, the answer is uncomfortable. Maybe it was just a search. Maybe it created an export job. Maybe it inserted an audit log. Maybe it triggered an email. Maybe the endpoint name says search, but the implementation does three other things because production systems are production systems.

A generic HTTP client cannot safely know.

So many clients, gateways, and service meshes are careful with automatic retries around `POST`.

Now compare that with:

```http
QUERY /orders HTTP/1.1
Content-Type: application/json

{ "status": "pending" }
```

Because `QUERY` is explicitly safe and idempotent, the infrastructure gets a better signal. A retry after a dropped connection is much less scary because the method itself says this request is supposed to be read-only and repeatable. RFC 10008 explicitly says `QUERY` requests can be automatically repeated or restarted without concern for partial state changes.

This is not just REST purity.

This affects retry policies, API gateways, SDK behavior, service meshes, observability, and incident handling.

The method tells the system what kind of risk it is dealing with.

## The caching part is surprisingly interesting

The biggest technical “aha” for me was caching.

`GET` is naturally cache-friendly because the URL acts as the cache key.

```http
GET /orders?status=pending HTTP/1.1
Host: api.example.com
Accept: application/json
```

A cache can look at the URL and say, “I have seen this before.”

But with a body-based query, the real input is not in the URL.

That is one of the reasons `POST /search` has always felt awkward for standard HTTP caching.

`QUERY` does not magically make every response cacheable, but it gives servers a better way to bridge complex request bodies with normal HTTP resource identity.

For example, a client sends this:

```http
QUERY /orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>

{
  "status": ["pending", "partially_paid"],
  "from": "2026-01-01",
  "to": "2026-06-30",
  "include": ["customer", "line_items", "payments"],
  "group_by": ["region", "sales_owner"],
  "metrics": ["count", "sum_total", "avg_days_to_payment"]
}
```

The server processes the query, normalizes it, and creates a stable identity for the result. Internally, that might be based on a hash of the method, path, content type, accepted response type, and normalized body:

```text
sha256(method + path + content-type + body + accept) = 1a7b3c
```

The flow looks roughly like this:

```text
[ Client ] ───( QUERY with huge JSON body )───> [ Server ]
                                                     │
                                                     │ processes and hashes query
                                                     ▼
[ Client ] <──( 200 OK + Content-Location )───── [ Server ]
                 /orders/results/1a7b3c

[ Client ] ───( GET /orders/results/1a7b3c )───> [ Shared Cache / CDN ]
```

That small shift is the whole trick. The first request can carry a complex body. The response can then give that exact result a normal HTTP identity.

Then the server can respond with a `Content-Location`:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Location: /orders/results/1a7b3c
Cache-Control: max-age=3600
ETag: "orders-results-1a7b3c-v1"

{
  "grouped_by": ["region", "sales_owner"],
  "rows": [
    {
      "region": "west",
      "sales_owner": "Aditi",
      "count": 184,
      "sum_total": 9823400,
      "avg_days_to_payment": 17.4
    }
  ]
}
```

Now the result has a URL:

```text
/orders/results/1a7b3c
```

A future client can retrieve that result using a normal `GET`:

```http
GET /orders/results/1a7b3c HTTP/1.1
Host: api.example.com
Accept: application/json
If-None-Match: "orders-results-1a7b3c-v1"
```

This is the neat part.

`QUERY` does not kill URLs. It lets the query live in the body where it belongs, and then lets the server create a useful URL for the result after it has understood the question.

RFC 10008 explicitly discusses assigning URIs to the query or query result for later use with `GET`, and it defines behavior around `Content-Location`, `Location`, conditional requests, and caching.

Of course, real caching needs care. You cannot casually cache user-specific data and leak it across users. You need authorization-aware keys, normalization, cache controls, and probably a lot of boring engineering.

But the model is good.

And boring engineering around a good model is better than clever engineering around a bad one.

## Where I would use QUERY first

I would not start by changing every public API tomorrow.

The first places I would experiment with `QUERY` are internal systems where we already control the full path from client to server.

Things like:

- analytics dashboards
- admin panels
- log search
- audit search
- reporting APIs
- permission-heavy internal tools
- developer platform APIs
- search endpoints that currently use `POST /search`

A log search endpoint is a perfect example:

```http
QUERY /logs HTTP/1.1
Host: observability.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>

{
  "service": "payments-api",
  "level": ["error", "critical"],
  "time_range": {
    "from": "2026-07-03T00:00:00Z",
    "to": "2026-07-03T12:00:00Z"
  },
  "contains": "gateway timeout",
  "group_by": ["host", "route"],
  "limit": 50
}
```

This is not a mutation.

This is not an action.

This is a complex question.

So the method should say that.

## The ecosystem is waking up, but slowly

The good news is that this is not just some obscure draft sitting in a corner anymore.

The RFC is published. The method is registered. Ecosystems have started reacting.

In .NET, there is already an approved API proposal to add a static `HttpMethod.Query` member to `System.Net.Http`, with the issue targeting the .NET 10.0 milestone.

In Go, there is an open proposal to add a `MethodQuery` constant to `net/http`, explicitly referencing RFC 10008 and describing `QUERY` as filling the gap between `GET` and `POST` for complex queries and large request bodies.

In the Rust ecosystem, the `hyperium/http` project has had discussion around adding support for the `QUERY` method, with the issue describing it as a safe, idempotent request method that can carry request content.

That does not mean everything is ready.

And this is where we need to be realistic.

A standard can be approved much faster than the ecosystem can absorb it. Frameworks need constants. Routers need support. API gateways need configuration. WAFs need to stop panicking. Proxies need to pass the method through. OpenAPI tooling needs to catch up. Client generators need updates. Monitoring tools need to classify it correctly.

And then there is the corporate proxy from 2014 sitting somewhere in the path, waiting to ruin your day.

So yes, start experimenting.

But do not assume every platform, proxy, firewall, SDK, framework, and browser path will treat `QUERY` nicely from day one.

In 2026, the spec may be ready before your infrastructure is.

## Safe does not mean cheap

There is one more trap worth calling out.

Because `QUERY` is safe, it is easy to mentally file it under “harmless.”

That would be a mistake.

Safe means the request is not supposed to mutate state. It does not mean the request is cheap.

This is safe:

```http
QUERY /analytics/events HTTP/1.1
Content-Type: application/sql

SELECT *
FROM events e
JOIN users u ON u.id = e.user_id
JOIN sessions s ON s.user_id = u.id
JOIN payments p ON p.user_id = u.id
WHERE e.created_at > '2025-01-01'
```

It may also be catastrophic.

It can scan huge tables. It can trigger terrible joins. It can eat memory. It can burn CPU. It can turn your analytics database into a space heater.

The same applies to deeply nested JSON filters, unbounded GraphQL queries, log searches over massive time windows, and reporting endpoints without limits.

So if you expose `QUERY`, you still need all the boring controls:

- authentication
- authorization
- query depth limits
- execution timeouts
- row limits
- pagination
- allowlisted fields
- rate limits
- cost estimation
- query logging
- abuse detection
- circuit breakers

The method gives you better semantics.

It does not replace operational discipline.

## This was not on my bingo card

We do not generally get new HTTP methods.

At least not in the normal day-to-day life of a developer.

Most of my career has happened inside the same familiar method set: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, maybe `OPTIONS` when CORS decides to remind you it exists.

HTTP methods feel like one of those things that were decided before we arrived and will probably remain the same after we leave.

So seeing a new one become real is oddly exciting.

Not because `QUERY` will change everything overnight. It will not.

Not because every API must immediately migrate. They should not.

But because this is one of those rare cases where a long-standing design discomfort gets a proper name.

For years, I have written `POST /search` endpoints and thought, “This is practical, but not quite right.”

Now HTTP has a better answer.

Use `GET` when the question fits in the URL.

Use `POST` when you want to create, trigger, submit, or mutate.

Use `QUERY` when all you want to do is ask a complex question.

A new HTTP method was definitely not on my 2026 bingo card.

But honestly, this one makes sense.

And after years of pretending `POST /search` was fine, HTTP probably did owe us this apology.
