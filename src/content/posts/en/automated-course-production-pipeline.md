---
title: 'I Automated an Entire Course Production Pipeline. Then I Decided Not to Use It.'
description: 'I built an AI pipeline that turned storyboards into JSON, generated assets, narration, slides, presenter video, and captions. It almost worked, but the experiment taught me why course production is authored, not merely manufactured.'
pubDate: 2026-07-02
categories: ['AI']
tags: ['ai', 'automation', 'course-production', 'generative-ai', 'education', 'workflow']
heroImage: '../../../assets/images/posts/ai-animation-pipeline.png'
pinned: false
---

We've all seen the flashy AI video demos. "Create a course on networking." "Explain recursion." They look incredible for exactly thirty seconds. Then the cracks start to show.

They all look impressive for the first thirty seconds.

But anyone who has ever worked on educational content knows that creating a good course isn't a single problem--it's a collection of dozens of smaller problems stitched together. There is writing, storyboarding, illustration, animation, narration, timing, captions, revisions, and finally putting everything together into something that actually keeps a learner engaged.

So instead of asking AI to _create a course_, I asked a much more engineering-oriented question:

> **Can I automate the production pipeline instead?**

A few days ago, I decided to find out.

I took an existing lesson on the Internet of Things (IoT) and attempted to recreate the entire production process using Generative AI. Not a demo. Not a proof of concept with hand-picked examples. An actual lesson that someone could watch.

To my surprise, it almost worked.

## Looking at Course Production Like an Engineer

One thing I have learned while building software is that large problems usually become manageable once you decompose them into deterministic steps.

Most AI workflows today look something like this:

> "Here's my prompt. Generate a complete educational video."

That gives far too much responsibility to a single model.

Instead, I treated course production as a pipeline where every stage has one clearly defined responsibility.

The first step was converting the storyboard into structured JSON. That JSON became the single source of truth for everything that followed. Every scene contained the narration, expected duration, visual assets, slide layout, animations, captions and references to existing media wherever applicable.

Conceptually, it looked something like this:

```json
{
  "scene": 8,
  "duration": 14,
  "voiceover": "Before we look at the cloud, let's understand how the ESP32 chip reads data from the sensor...",
  "slide": {
    "title": "IoT Architecture",
    "layout": "title-left-diagram-right"
  },
  "assets": [
    {
      "type": "diagram",
      "description": "Temperature sensor connected to ESP32 transmitting data to cloud over Wi-Fi"
    },
    {
      "type": "icon",
      "description": "Cloud Database"
    }
  ],
  "animations": ["fade_title", "draw_connection", "highlight_cloud"]
}
```

Once the storyboard became structured data, the rest of the pipeline became surprisingly mechanical.

## Building the Pipeline

With the JSON ready, I wrote a Python orchestrator whose only responsibility was coordinating different AI services.

For every scene, the script would read the asset descriptions and invoke image generation models to create illustrations, diagrams and icons. If an existing asset already existed, it simply reused it instead of generating a new one.

The narration for every scene was passed to ElevenLabs to generate a voice-over.

The generated assets and narration were then assembled into a PowerPoint presentation. Rather than designing every slide manually, the presentation was generated directly from the structured scene definitions.

Once the presentation was ready, it was sent to HeyGen, which converted the slides into a presenter-style educational video.

The final step still required CapCut, where I synchronized the generated narration with the presentation and generated captions.

Visually, the pipeline looked something like this:

```text
Storyboard
        |
        v
Structured JSON
        |
        v
Python Orchestrator
        |
 +------+-------------+
 |      |             |
 v      v             v
Images Voice      Existing Assets
 |      |             |
 +------+-------------+
        |
        v
Generate Presentation
        |
        v
Presenter Video
        |
        v
Caption & Audio Sync
        |
        v
Final Course Video
```

Looking back, what fascinated me wasn't image generation or voice synthesis.

It was the realization that I had accidentally built something that resembled a compiler.

The storyboard was my source code.

JSON became an intermediate representation.

Every stage transformed that representation into another format until the final executable happened to be a course video.

Every individual component could be replaced independently. Tomorrow I could swap the image generation model, use another voice provider, replace the presenter engine, or even eliminate PowerPoint entirely. The architecture wouldn't change because every component spoke through the same structured interface.

That realization was far more exciting than the generated video itself.

## The Results Were Better Than I Expected

The finished lesson genuinely surprised me.

The diagrams looked clean.

The slides were coherent.

The presenter video was convincing.

The narration sounded remarkably natural.

Had someone shown me the finished video without explaining how it was produced, I probably wouldn't have guessed that almost every stage had been automated.

Of course, it wasn't perfect. Some images needed regeneration, a few timings required manual adjustment, and captions still needed a quick review. But considering how little manual work went into the process, the output quality was honestly impressive.

## The Economics Were Surprisingly Reasonable

This experiment wasn't free.

The complete pipeline cost me roughly **USD 55 to produce just under two minutes of finished content.**

That translates to around **INR 3,000 per minute**.

At first glance, that feels expensive.

Then I compared it against the traditional production workflow.

A human animator has to search for assets, create illustrations, design slides, animate transitions, coordinate revisions, wait for voice recordings, synchronize audio and captions, and finally render the completed video.

Suddenly INR 3,000 per minute didn't seem that outrageous anymore.

In fact, it was only marginally more expensive than manual production.

And unlike salaries, API costs tend to decrease over time.

## So Why Didn't I Adopt It?

Because somewhere during the experiment I realized I was solving the wrong problem.

Technically, I had automated content production.

But educational content isn't merely manufactured.

It's authored.

A storyboard contains facts.

It doesn't contain personality.

When an experienced course author writes a lesson, they are constantly making tiny decisions that rarely appear on paper. They know which concept deserves an extra pause, where students usually get confused, when an analogy will explain an idea better than a definition, and when a diagram should unfold gradually instead of appearing all at once.

Those decisions aren't captured in JSON.

They're captured in experience.

The same is true for animation teams.

Before this experiment, I used to think of animation as the process of moving objects around a screen.

Now I appreciate that good animators are storytellers.

They don't simply execute instructions.

They interpret them.

They improvise.

They add visual emphasis where none existed.

They simplify diagrams without changing their meaning.

They instinctively know when a learner needs visual breathing room.

None of those decisions came from my AI pipeline.

Ironically, I found myself spending more and more time writing elaborate prompts describing what I wanted.

"Use a cleaner diagram."

"Don't make it look futuristic."

"Reduce visual clutter."

"Maintain the same illustration style."

Eventually I realized I was replacing animation work with prompt engineering.

The creative effort hadn't disappeared.

It had simply changed form.

Voice generation led to a similar conclusion.

Modern AI voices are genuinely impressive, but they still don't capture the subtle emphasis of a professional voice artist. A human narrator understands pacing, emotion, intentional pauses and emphasis in a way that makes difficult concepts easier to learn.

Those are tiny details individually.

Collectively, they shape the learning experience.

Finally, despite the impressive automation, the overall production cost was still slightly higher than our existing manual workflow.

That equation will almost certainly change over the next few years.

But today, it hasn't.

## The Future Isn't AI Instead of Animators

The biggest lesson from this experiment wasn't that AI is ready to replace production teams.

It was that production teams deserve better tools.

Imagine an animator who no longer spends hours searching for stock illustrations because AI generates five usable concepts in a minute.

Imagine regenerating a diagram in seconds instead of redrawing it from scratch.

Imagine replacing repetitive production work with creative decisions.

That's where this pipeline becomes genuinely exciting.

Not because it removes humans.

Because it gives them more time to be human.

The course author still decides _what_ should be taught.

The animator still decides _how_ it should be shown.

AI simply accelerates everything in between.

## The Real Outcome of the Experiment

When I started this experiment, I wanted to know whether AI could automate course production.

Technically, the answer is yes.

It already can.

But that's no longer the question I'm interested in.

The more interesting question is this:

**How do we use AI to eliminate repetitive production work while preserving the creativity, intuition and personality that make great educators and great animators irreplaceable?**

After automating almost the entire pipeline, I walked away appreciating the humans in the process far more than I did before.

And that's probably the most unexpected outcome an AI experiment could have produced.
