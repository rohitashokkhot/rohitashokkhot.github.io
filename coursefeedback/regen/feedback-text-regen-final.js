// ─────────────────────────────────────────────────────────────
// feedback-text-regen-final.js
// Feedback text for Regen Studio — Final Assignment
// Written reflection / documentation of group project
// ─────────────────────────────────────────────────────────────


const OPENERS = {
  good: (name) => `Well done ${name} on the final assignment! I enjoyed reading your personal reflection on the project that illustrates your skills in writing and decoding a design process. Your writing is strong and clear.`,
  strong: (name) => `Well done ${name} on the final assignment! I really enjoyed reading your personal reflection on the project. Your writing is strong, clear, and shows a genuine engagement with the design process and the ideas we explored throughout the studio.`,
  hd: (name) => `Well done ${name} on the final assignment! I truly enjoyed reading your personal reflection. Your writing is eloquent, clear, and demonstrates a sophisticated understanding of both the design process and the regenerative principles at the heart of this studio. Wonderful work.`,
  short: (name) => `Well done ${name} on the final assignment. I enjoyed reading your personal reflection on the project and appreciate the effort you put into documenting your design journey.`,
};


const PRAISE_TEXT = {
  'addresses-brief': `You have addressed most of the questions outlined in the assignment brief, specifically discussing different features of your design and how they came about nicely.`,
  'careful-planning': `I liked the careful planning and detailing of each design step. It shows your critical thinking on design and approaching the problem holistically through all angles.`,
  'group-work': `I also enjoyed the articulation of the group work and how effectively you collaborated together to get the project done.`,
  'group-work-hurdles': `I also enjoyed the articulation of the group work and how effectively you collaborated together to get the project done despite the hurdles of technology and lack of in-person meetings.`,
  'closing-reflection': `The closing section around how the project helps you grow as a designer is well articulated.`,
  'key-takeaways': `I particularly loved the key takeaways that you will carry forward in your journey as a designer — a lovely and thoughtful way to close the reflection.`,
  'visuals-included': `I loved the inclusion of visuals and screenshots that showcase how your design matured over time.`,
  'impact-drafted': `The impact section has been drafted thoughtfully and I enjoyed the mention of testing and consideration of what remains to be explored.`,
  'strong-writing': `Your writing is lucid and the word choices are considered — the document is a pleasurable read.`,
};


const IMPROVE_TEXT = {

  // ── DEPTH OF REFLECTION ──────────────────────────────────────

  'deepen-reflection': () =>
    `You addressed most of the required questions, but the level of reflection leaves something to be desired. Important aspects of your design may be glossed over — digging deeper into the key parts of your group project and articulating how your work supports the regenerative design principles would add considerable strength to the document.`,

  'core-philosophy': () =>
    `The core philosophy of your project could be articulated more strongly in writing. As mentioned in the assignment brief, you could articulate the vision, purpose, and guiding principles of your concept more explicitly. Specifically, is the "why" behind your project powerful and clear to the reader? In this section, you should also analyze the strengths and weaknesses of both deliverables — the video and the prototype. What aspects were most successful? If you had more time, what would you improve or change?`,

  'core-philosophy-short': () =>
    `The core philosophy of your project could be articulated more strongly in writing. As mentioned in the assignment brief, you could articulate the vision, purpose, and guiding principles of your concept. Specifically, is the "why" behind your project powerful and clear to the reader?`,

  'regen-principles-link': () =>
    `The documentation of the project could benefit from more explicitly linking specific design choices to regenerative principles. The regenerative design philosophy of the app UI can also be included as part of the reflection — for example, the reasoning behind the color palette, typography, and the interactivity of the app, and why and how these choices are regenerative. Our class notes around regenerative aesthetics and interactions would help in drafting a stronger narrative here.`,

  'regen-lost': () =>
    `The current draft reads as an elegant response to the subject matter, which is not necessarily bad, but in doing so the core ideology of regenerative design is slightly getting lost or overshadowed. Digging deeper into the key parts of your group project and articulating more explicitly how your work supports regenerative design principles would add strength to the document.`,

  'impact-section': () =>
    `The impact of your work could be argued more strongly. Think about consequences and success — what are the potential positive impacts of your design, and are there ways to measure these impacts and "regenerative success" beyond generic metrics? Moving beyond surface-level observations to more specific, measurable outcomes would significantly elevate this section.`,

  'explain-regen-solution': () =>
    `You mention the problem of mindless scrolling and attention extraction, but it would strengthen the document considerably to explain more clearly how your project addresses these issues and what specifically makes this solution regenerative rather than just different. This is the heart of the assignment and deserves more space and depth.`,

  'strengths-weaknesses': () =>
    `In the section reflecting on your deliverables, you should analyze the strengths and weaknesses of both the video and the prototype more honestly. What aspects were most successful? If you had more time, what would you improve or change? This kind of candid self-assessment is a hallmark of strong design reflection.`,


  // ── DESIGN PROCESS & VISUALS ─────────────────────────────────

  'elaborate-process': () =>
    `The design process could be made more elaborate, with images and sketches showing the journey from early ideas to the final outcome. Currently most of the imagery focuses on the final design, which looks wonderful, but as a design journey, readers would also appreciate understanding how you arrived there — the iterations, the pivots, the moments of discovery.`,

  'add-visuals': () =>
    `The documentation of the project could benefit from more visuals to support your written arguments. For example, when you explain decisions around color, typography, and the interactivity of the app, including annotated screenshots or design mockups would allow readers to grasp the concepts faster and make the narrative much more compelling.`,

  'explain-visuals': () =>
    `I loved the inclusion of visuals and screenshots, but each image would benefit from a written explanation that connects it to your design thinking. Currently the images stand somewhat on their own — weaving them into the written narrative with specific explanations for each design decision would make the document considerably stronger.`,


  // ── WRITING & FORMATTING ─────────────────────────────────────

  'academic-references': () =>
    `Moving forward, I would suggest using academic references to support your arguments — it will add more authority and strength to your writing. Citing relevant literature, theorists, or frameworks we engaged with in class would demonstrate a deeper engagement with the ideas and ground your reflection in broader discourse.`,

  'document-layout': () =>
    `Also see if you could use a template to improve the visual layout of the document. A clean, well-structured layout with clear headings, consistent spacing, and good typography would give the document a more professional appearance and make it more pleasurable to read.`,

  'avoid-brief-headings': () =>
    `On a minor note, instead of using the questions from the assignment brief directly as headings, consider writing more informative and descriptive headings of your own. This would allow the document to stand on its own without needing the assignment brief for context — a stronger approach for any professional portfolio or future submission.`,

  'avoid-overusing-word': () =>
    `On a minor note, the word "regenerative" appears quite frequently throughout the document. Repeated use of the same term can slightly weaken readability and dilute its impact. Instead, look for ways to explain and demonstrate the regenerative concepts in practice — show rather than label.`,

  'avoid-bullet-points': () =>
    `Also avoid writing in bullet points and instead try to include complete, flowing paragraphs supported with imagery. Bullet points can feel like a list of notes rather than a considered reflection — prose writing allows you to develop your ideas more fully and demonstrates stronger critical thinking.`,

  'expand-writing': () =>
    `Your current writing is good but a little short, and some sections would benefit from being expanded. Elaborating on the key points will make the draft considerably stronger and demonstrate a deeper engagement with the brief.`,

  'consistent-spacing': () =>
    `The spacing between paragraphs is currently uneven and slightly excessive in places. Aim for a clean and consistent professional layout throughout the document — consistent line height and paragraph spacing will significantly improve readability and the overall impression.`,

};
