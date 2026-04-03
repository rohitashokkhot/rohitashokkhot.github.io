// ─────────────────────────────────────────────────────────────
// feedback-text-regen-a1.js
// Feedback text for Regen Studio — Assignment 1
// Initial proposal / platform analysis / regenerative lens
// ─────────────────────────────────────────────────────────────


const OPENERS = {
  good: (name) => `Well done ${name} on the first assignment. Your proposal reads well and you covered the key aspects of the assignment nicely.`,
  strong: (name) => `Well done ${name} on the first assignment! I really enjoyed reading your draft. You have done an excellent job of integrating your personal reflection with a thorough analysis of the platform.`,
  hd: (name) => `Well done ${name} on the first assignment! I really enjoyed reading your draft. You have done an excellent job of integrating your personal reflection with a thorough analysis of the platform, and the document is a genuinely pleasurable read.`,
  short: (name) => `Thank you for submitting Assignment 1, ${name}. The proposal is a good start and covers some of the key aspects of the assignment, though there is room to develop it considerably further.`,
};


const PRAISE_TEXT = {
  'personal-reflection': `You have done an excellent job of integrating your personal reflection with your analysis — this is one of the strongest aspects of the draft.`,
  'nice-template': `Kudos for using a well-designed template that gives the document a professional and polished look.`,
  'good-writing': `Your writing is clear and lucid, and I admire your word choices — the document is a pleasurable read.`,
  'references': `Good to see that you backed your arguments with proper citations and references throughout.`,
  '5-whys': `The 5 Whys analysis is well done and shows careful thinking about root causes.`,
  'images-used': `The use of images and figures to support your argument is commendable — they strengthen the narrative considerably.`,
  'patterns': `Your identified degenerative patterns are insightful and speak to genuine issues worth exploring further.`,
  'cover-page': `Kudos for including a cover page, table of contents, and other professional touches that elevate the document.`,
  'interesting-platform': `Your choice of platform is particularly interesting as it opens up a fresh angle for analysis and allows you to connect your personal experience with broader systemic issues.`,
  'nice-finding': `I particularly enjoyed some of your specific findings — they show careful and curious observation of the platform's design and intent.`,
};


const IMPROVE_TEXT = {

  // ── INTRODUCTION & STRUCTURE ─────────────────────────────────

  'intro-transition': (platform, lensVal) =>
    `The introduction begins well with a personal example, but the transition to the next section feels slightly abrupt — it shifts quite quickly from a warm personal tone to outlining the report's purpose. Consider expanding the opening paragraph to make it clearer why you chose ${platform || 'this platform'} and the lens of "${lensVal || 'your chosen lens'}" for your analysis. While some readers may grasp this connection intuitively, making it explicit would strengthen the overall flow. The current introduction is good but could benefit from this elaboration.`,

  'lens-connection': (platform, lensVal) =>
    `The connection between your personal experience and your choice of the "${lensVal || 'chosen'}" lens could be made more explicit. Why this lens, and why this platform? Making that reasoning clear from the outset helps readers follow your argument and understand the framing of everything that follows.`,

  'avoid-brief-headings': () =>
    `On a minor note, instead of using the questions from the assignment brief directly as headings, consider writing more informative and descriptive headings of your own. This would allow the document to stand on its own without needing the assignment brief for context — a much stronger approach.`,


  // ── CONTENT & ANALYSIS ───────────────────────────────────────

  'add-screenshots': (platform) =>
    `Throughout the document — particularly in the digital day mapping, platform analysis, and degenerative patterns sections — consider adding screenshots and annotated images of ${platform || 'the platform'}. Images allow readers to grasp concepts much faster than text alone, and they will significantly strengthen your arguments.`,

  '5-whys-expand': () =>
    `The 5 Whys analysis is a good start but could be developed further. Ideally, present it as a structured Q&A starting from the observed pattern all the way to the root cause, and then include a brief summary paragraph highlighting the key learnings and what opportunities they open up for regeneration.`,

  'deeper-interaction': (platform) =>
    `The digital day mapping section would benefit from a deeper interaction analysis of one particular pattern. Pick one of your identified behaviours and dig into the specific design elements of ${platform || 'the platform'} that drive it — what UX choices, visual cues, or structural features contribute to it? This level of specificity is what the assignment template asks for and adds real analytical depth.`,

  'degenerative-patterns-depth': () =>
    `The degenerative patterns are interesting but could be explained in more depth. Include the 5 Whys analysis as covered in class to reach the root cause behind each pattern. The section would also benefit from adding images as well as academic citations that support your findings. Conclude each pattern with a key learning for regeneration.`,

  'platform-business-model': (platform) =>
    `Before diving into the degenerative patterns, consider including a clearer explanation of the platform's business model — its main functions, how data flows through it, and how money is generated. This context helps readers understand why the degenerative patterns exist and what incentives the platform has to maintain them.`,

  'explain-key-terms': () =>
    `Consider explaining key terms when they first appear in the document. Concepts like "algorithmic narrowing", "informational diversity", or other specialist terms should be briefly defined so that readers unfamiliar with them can follow your argument without interruption.`,

  'user-agency': () =>
    `The analysis is strong, but at points it focuses on user experience without fully engaging with the question of user agency. Consider expanding on this — not just how the platform affects the experience, but how it shapes, limits, or manipulates the user's sense of control and autonomy over their own attention and data.`,


  // ── REGENERATIVE IDEAS ────────────────────────────────────────

  'regen-detail': () =>
    `Your regenerative ideas are intriguing and directly address the patterns you have identified, but they would benefit from more detail. For each idea, describe how it would look, where it would sit within the interface, how it would be technically or structurally implemented, and how it connects back to the specific degenerative pattern it addresses. Preliminary sketches or even brief written descriptions of the UI would greatly strengthen this section.`,

  'regen-link-patterns': () =>
    `The regenerative ideas would be stronger if each one was more explicitly connected back to a specific degenerative pattern you identified earlier. Showing the through-line from problem to solution makes the argument more coherent and demonstrates systemic thinking.`,

  'add-sketches': () =>
    `Adding preliminary sketches — even rough hand-drawn ones — for your regenerative ideas would significantly strengthen the proposal. Sketches help readers visualise how a redesign would actually look and feel, and they demonstrate that you have thought through the implementation rather than just described it conceptually.`,

  'regen-viability': () =>
    `Consider also addressing how your regenerative ideas could be made viable — for the platform, for users, and for the broader ecosystem. How can we make balancing profit with social or ecological obligation realistic? Engaging with this tension makes the argument more credible and shows that you are thinking about systemic constraints, not just ideal outcomes.`,


  // ── WRITING & FORMATTING ─────────────────────────────────────

  'academic-references': () =>
    `Moving forward, I would suggest using academic references to support your arguments. Citing relevant literature or frameworks we engaged with in class would add more authority and depth to your writing and ground your analysis in broader discourse.`,

  'document-layout': () =>
    `Also see if you could use a template to improve the visual layout of the document. A clean, well-structured layout with clear headings, consistent spacing, and good typography would give the document a more professional appearance and make it more pleasurable to read.`,

  'formatting-details': () =>
    `A few formatting suggestions: aim for consistent line-height and paragraph spacing throughout. Headings could benefit from a slightly different colour or weight to create a clearer typographic hierarchy. Using a modern, clean sans-serif for body text would also elevate the overall presentation. Also aim for consistent alignment throughout — avoid indented subheadings or mixed alignment styles.`,

  'captions': () =>
    `When including images, ensure each has a meaningful figure caption (e.g., "Figure 1: …") that describes the insight you are trying to convey — not just a URL or a generic label. Reference each figure within the text (e.g., "as seen in Figure 1") so images read as evidence rather than decoration.`,

  'ai-acknowledge': () =>
    `Don't forget to acknowledge your use of ChatGPT or AI tools in the document. If you have not used AI, you can proudly state that the work is entirely your own.`,

  'avoid-ai-reliance': () =>
    `Certain parts of the writing seem to be directly derived from AI. While it is perfectly fine to use AI as a supportive tool, ensure that the core critical thinking remains your own. Aim to build upon suggestions made by AI, incorporate your own examples to better illustrate the topic, and allow your unique voice to emerge and be evident in the document.`,

  'expand-answers': () =>
    `The overall proposal appears slightly short. Your writing is nice and you have provided interesting insights but consider the opportunity to expand on them. Use proper headings and subheadings to create a professional looking document, and make use of images to support your arguments.`,

};
