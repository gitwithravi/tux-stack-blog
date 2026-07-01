---
title: "AI Doesn't Need to Become a Better Doctor. It Needs to Become a Better Historian."
description: "When AI spends 30 minutes patiently building a complete medical history and a doctor gets 10, the comparison isn't about intelligence — it's about information. Here's why we should be building AI historians, not AI doctors."
pubDate: 2026-07-01
categories: ['AI']
tags: ['ai', 'healthcare', 'medicine', 'llm']
heroImage: '../../../assets/images/posts/ai-medical-historian.png'
pinned: false
---

Every few weeks, another headline makes its way across social media.

"Claude diagnosed a disease that doctors missed for ten years."

"ChatGPT found the root cause after multiple specialists couldn't."

The comments are almost always the same. Some people claim AI has become a better doctor than physicians. Others dismiss the stories entirely, pointing out that language models hallucinate and should never be trusted with healthcare.

I don't think either reaction captures what's actually happening.

The interesting part of these stories usually isn't the diagnosis itself. It's everything that happened **before** the diagnosis.

In many of these cases, the AI spent twenty or thirty minutes talking to the patient. It asked dozens of follow-up questions, revisited previous answers, requested laboratory reports, considered medication history, and patiently built a detailed understanding of the person's medical history before attempting to reason about the problem.

That process looks remarkably different from a typical doctor's appointment.

## The biggest limitation in medicine isn't always expertise

Imagine two physicians with identical training.

The first physician meets a patient for twelve minutes. The patient vaguely remembers when the symptoms began, forgets to mention a medication started two years ago, has an MRI report somewhere in WhatsApp, and can't recall the exact findings from previous blood tests. Like most consultations, the physician has to reconstruct years of medical history while simultaneously trying to understand the current complaint.

The second physician receives a concise report before the patient even walks into the room. It contains a chronological history of symptoms, previous diagnoses, medications, laboratory investigations, imaging reports, family history, lifestyle changes, allergies, and a list of unanswered questions that still require clarification.

Which physician is more likely to reach the correct diagnosis?

The answer has very little to do with intelligence.

It has everything to do with information.

Medicine is fundamentally an information problem. Clinical reasoning is only as good as the information it is based on. Even an exceptional doctor can miss an important diagnosis if the crucial piece of history is never mentioned.

## AI has one advantage that is surprisingly simple

People often assume the advantage comes from AI having access to vast amounts of medical literature.

That certainly helps.

But I suspect an even bigger advantage is much simpler.

Time.

Doctors are constrained by schedules, waiting rooms, and the realities of modern healthcare. They know the questions they want to ask, but they don't always have enough time to ask all of them.

An AI has no such limitation.

It can patiently continue the conversation for as long as necessary.

A patient might begin by saying:

> "I've been having back pain."

A symptom checker would immediately start matching diseases.

A good medical interviewer would do something very different.

- Where exactly does it hurt?
- When did it begin?
- Did it appear suddenly or gradually?
- Does sitting make it worse?
- Does walking improve it?
- Have you ever injured your back?
- Have you experienced numbness or weakness?
- Any fever? Any weight loss?
- Have you had an MRI before?
- Are you taking any medications?
- What changed around the time the pain first appeared?

Every answer changes the next question. The goal isn't to guess the diagnosis as quickly as possible. The goal is to understand the patient's story as completely as possible.

That distinction matters.

## We've been trying to build AI doctors when we should be building AI historians

Most healthcare AI products today fall into one of two categories.

The first category is symptom checkers. They ask a handful of questions and produce a list of possible conditions.

The second category tries to be an AI doctor, attempting to diagnose illnesses or recommend treatments.

Neither approach feels like the most valuable use of AI.

The biggest opportunity, in my opinion, lies somewhere in between.

Imagine an application whose only responsibility is to prepare patients for their appointment.

It doesn't diagnose.

It doesn't prescribe medication.

It doesn't claim certainty.

Instead, it conducts the most thorough medical interview the patient has ever experienced.

It reads laboratory reports, prescriptions, discharge summaries, imaging reports, and previous consultation notes. It asks intelligent follow-up questions whenever information is missing or contradictory. It keeps digging until it has built a coherent narrative.

The final output isn't a diagnosis.

It's a physician-ready report.

The doctor receives the patient's complete history in a structured format instead of reconstructing it during a ten-minute consultation.

The AI isn't replacing clinical judgment.

It's making sure that clinical judgment begins with the best possible information.

## Your health deserves something better than a folder full of PDFs

The more I think about it, the more I feel we've built the wrong model for personal health records.

Most of us have years of medical information scattered everywhere.

- Blood reports live in email.
- MRI reports sit inside WhatsApp chats.
- Prescriptions disappear into drawers.
- Discharge summaries exist as scanned PDFs.

Nothing connects together.

As software engineers, we would never accept this approach for source code.

Every meaningful change in software is tracked through Git. Every commit tells part of the story. You can understand how the project evolved because the history is preserved.

Healthcare should work in a similar way.

Imagine your medical history as a continuously evolving repository instead of a collection of disconnected documents.

- Every diagnosis becomes part of a timeline.
- Every prescription is linked to the condition it was prescribed for.
- Every laboratory investigation is indexed and searchable.
- Every surgery, allergy, vaccination, medication, and significant lifestyle change becomes part of a structured knowledge graph.

Instead of repeatedly telling your story, you simply grant access to its latest version.

## The real intelligence comes from continuity

This idea becomes even more powerful over time.

After every appointment, the patient uploads the doctor's diagnosis, prescription, and investigation results.

The medical timeline grows richer.

The next interview starts with years of context rather than a blank page.

The AI doesn't become better because a larger model was released.

It becomes better because it now understands _you_ better.

- It knows what medications you've tried before.
- It knows what investigations have already ruled out.
- It knows how your symptoms evolved over months or years.

That continuity is something current symptom checkers rarely have.

## The goal isn't to replace doctors

Whenever people discuss AI in medicine, the conversation quickly shifts toward whether AI will replace physicians.

I think that's asking the wrong question.

Doctors don't spend years in medical school because they're good at collecting information.

They spend years learning how to interpret it.

Clinical reasoning, understanding uncertainty, examining patients, weighing competing possibilities, communicating difficult decisions, and deciding on treatment plans are profoundly human responsibilities.

AI doesn't need to compete there.

Its comparative advantage is different.

It can patiently gather information, organise it, identify what's missing, and present it in a way that helps the doctor think more effectively.

That feels like a partnership worth building.

## Better information creates better medicine

The more I think about these viral "AI diagnosed what doctors missed" stories, the less I believe they're really about AI being smarter than physicians.

They're demonstrations of something much simpler.

Good decisions require good information.

When an AI spends half an hour patiently building a complete medical history while a doctor only has ten minutes to reconstruct it, the comparison isn't fair.

The remarkable part isn't that AI found a diagnosis.

The remarkable part is that it managed to preserve the patient's story.

Perhaps the future of AI in healthcare isn't an artificial doctor after all.

Perhaps it's an artificial historian — one that ensures every doctor begins with the complete story before making the decisions that only a doctor should make.
