// ─────────────────────────────────────────────────────────────
// feedback-text-a3.js
// Feedback text objects for Assignment 3 — Final Creative Interactive
// Drop-in for feedback-webdev.html when reviewing A3.
// ─────────────────────────────────────────────────────────────


const OPENERS = {
  good: (name, asgn) => `Well done ${name} on the final assignment! The overall layout is clean and well-executed. I appreciate the overall functionality and the thought that went behind the design. Also good to see comments in your code.`,
  strong: (name, asgn) => `Well done ${name} on the final assignment! Your submission was fantastic. I appreciate the visual appeal and the thoughtfulness behind the design, incorporating typography, color, and layout effectively. It resulted in a sleek and polished design that suits the chosen context perfectly.`,
  hd: (name, asgn) => `Great job, ${name}, on completing the final assignment! What a delightful and imaginative design. From the illustrations to the typography, to the sound selections and thoughtfully crafted interactions, I enjoyed every aspect of it. The end result is a genuinely engaging and polished experience — fantastic job on that! :)`,
  short: (name, asgn) => `Well done ${name} on the final assignment. The overall design is good and I appreciate the thought that went into it. However there are a few things that can be further enhanced.`,
};


const PRAISE_TEXT = {
  'comments': `Also good to see comments in your code.`,
  'detailed-comments': `Also good to see detailed comments and reflections in your code that clearly articulate your design thinking.`,
  'advanced-techniques': `Also good to see the use of advanced techniques that we haven't covered in class. It's impressive that you took the initiative to learn them on your own.`,
  'acknowledgement': `Also good to see the acknowledgement of resources, tutorials, and AI tools that helped you in this assignment.`,
  'illustrations': `The illustrations are wonderful and add a delightful visual touch to the overall experience.`,
  'sound': `The inclusion of sound effects adds a nice evocative and interactive touch to the design.`,
  'strong-visuals': `The color palette, typography, and overall visual aesthetic are highly polished and well-suited to the chosen context.`,
  'interaction-quality': `The interactions are well-thought-out and show genuine consideration for how users will engage with the experience.`,
  'welcome-screen': `The inclusion of a welcome screen that explains the interaction is a great touch and helps orient new users immediately.`,
  'context-fit': `The design choices feel unique and specific to the chosen context — it goes well beyond a generic layout. Well done on that.`,
  'presentation': `It was also great to read your reflections and see your presentation — thank you for sharing the thinking behind the work.`,
};


const IMPROVE_TEXT = {

  // ── UX & INTERACTION ─────────────────────────────────────────

  'add-welcome-screen': () =>
    `You might want to think about adding a welcome screen that offers a brief overview of the experience and your intentions. While most users would get it intuitively, providing some context or instructions for new visitors would help them engage more confidently from the start. Consider including a catchy title and a start or play button that draws them in.`,

  'cursor-pointer': () =>
    `To further improve user interaction, consider adding a cursor: pointer style to all interactive elements — buttons, draggable items, clickable areas. This signals to users that these elements respond to interaction and significantly improves the overall usability of the interface.`,

  'button-feedback': () =>
    `The interactive elements of the buttons feel somewhat simplistic. Adding a subtle box shadow could enhance their depth, and implementing a scaling effect on hover would provide users with valuable feedback — giving the sensation of pressing a physical button. These small touches make a significant difference to the overall feel of the interface.`,

  'add-sound': () =>
    `To further elevate the design, consider adding sound effects that respond to key interactions. Sound can greatly enhance the immersive quality of an experience and provide an additional layer of feedback for the user.`,

  'mute-button': () =>
    `Whenever you incorporate sound into your design, it is important to provide users with the ability to mute or pause it. As discussed in class, users may be in public spaces and having audio play automatically may not be suitable. A small mute or volume toggle is always a welcome addition.`,

  'no-alerts': () =>
    `When it comes to web design, it is best to avoid using browser alert or prompt boxes in your final project. They are meant mainly for debugging and testing, and they come with default browser styles that clash with any custom design. Instead, use a styled message box, a modal, or a dedicated message section — similar to what we covered in class.`,

  'interaction-clarity': () =>
    `The interaction is not immediately clear to a first-time visitor. Consider adding a brief explanation or instruction overlay — even a single sentence — that tells the user what they need to do. Discovery-driven design is fine, but some gentle guidance prevents frustration and helps users get the most out of the experience.`,

  'randomise-content': () =>
    `Currently the content or placement is not randomised, so users who interact a second time will already know what to expect. Consider shuffling the content each time so that repeated visits feel fresh and engaging. You can store your items in a JavaScript array and use a simple shuffle function — similar to the examples we covered in class.`,

  'disable-after-interaction': () =>
    `Once a user has triggered an interaction, consider disabling further clicks on that element until it is appropriate to interact again. Currently, repeated clicks can disrupt the flow of the experience.`,

  'no-inline-js': () =>
    `It is recommended to refrain from using inline styles and embedding scripts within the HTML page. All styles should be consolidated in style.css and all JavaScript in script.js to uphold a clear separation of concerns, as discussed in class.`,


  // ── VISUAL & LAYOUT ──────────────────────────────────────────

  'font-choice': () =>
    `Try experimenting with different graphic fonts to enhance the visual layout. Fonts play a crucial role in the overall design, and by exploring different options, you can find a font that complements the theme and adds an extra touch of creativity to your design.`,

  'font-pairing': () =>
    `The font you chose for the headings or main elements is appealing, but the body text font feels a bit plain in comparison. For a more cohesive look, consider pairing it with a complementary font for the body text that harmonises well with the heading style.`,

  'layout-arrangement': () =>
    `While the layout is visually appealing and effectively uses colors and imagery for a clean and cohesive look, there is room for improvement in the arrangement of elements. At present, items are simply stacked vertically, which works well on smaller screens, but on larger displays, you could take advantage of the extra width by positioning elements side by side.`,

  'center-align': () =>
    `The overall design or some key elements appear to be slightly off-center or leaning to one side on my laptop. Centering them would create a more balanced and symmetrical look.`,

  'spacing-consistency': () =>
    `The spacing between components could be more consistent. Some elements are too close together while others have too much space around them. Aim for a uniform spacing rhythm throughout the design — this alone will significantly improve the professional quality of the page.`,

  'color-contrast': () =>
    `Aim for better color contrast to improve readability. In some areas, the text color does not stand out sufficiently against the background. Choosing a darker or more complementary color for the text in those sections would significantly improve legibility.`,

  'overflow-scroll': () =>
    `The interactions seem to be clipped or cut off on my laptop. Always make sure the design works well on typical laptop screen sizes. An easy fix is to include overflow: scroll on the relevant container so that users can access content that extends beyond the viewport boundaries.`,

  'animation-use-sparingly': () =>
    `While animations add a nice visual touch, it is important to use them judiciously. As a general principle, animations should enhance the experience rather than distract from it. Avoid running looping animations indefinitely, and prefer triggering them on user interaction — hover, click, or scroll — rather than having them run continuously in the background.`,

  'remove-placeholder-elements': () =>
    `There are some placeholder or non-functional elements on the page that appear to be leftover from earlier development. If a feature has not been implemented, it is better to remove it rather than leaving it visible — users who try to interact with it will become confused or frustrated.`,

  'shadow-depth': () =>
    `Adding subtle shadows to key elements — containers, cards, or interactive items — would create a sense of depth and give the design a more tactile, polished quality.`,


  // ── CODE & COMMENTS ──────────────────────────────────────────

  'context-comments': () =>
    `The comments could be more illustrative of your design decisions. Currently you describe the functionality well, but the reasoning behind them could be added to add further strength. Specifically, discuss the points from your presentation and add them briefly as comments — this gives readers who have not seen your presentation an idea about the thinking behind the design.`,

  'explain-advanced-techniques': () =>
    `It is great to see the implementation of modern techniques. However, providing explanations within your code about their usage would instill more confidence in your understanding of the technique. Without this, it may appear that the code is simply sourced from external references. If you received assistance from tutorials or chatGPT, it is essential to acknowledge them in your comments.`,

  'avoid-mixing-selectors': () =>
    `While there is nothing inherently wrong, it is advisable to stick with either getElementById or querySelector instead of mixing both. Similarly, avoid making repeated calls to these methods — it is better and more efficient to retrieve elements once, store them in a variable, and reuse that variable throughout your code.`,

  'outdated-techniques': () =>
    `There are many outdated tutorials and techniques available on the internet that create more issues rather than help. Even chatGPT is not always up to date and can give you code that is overly complex or incorrect. I would recommend following one particular way of writing code instead of mixing and matching, as this can lead to confusion. Your existing code works, but could benefit from simplification using the techniques we have covered in class.`,

  'check-console': () =>
    `Make sure to check the console in Chrome DevTools to identify and resolve any errors in your code. There are a few JavaScript errors currently visible in the console that are affecting the experience — the console will pinpoint exactly where the issues lie.`,

  'use-array-for-data': () =>
    `Similar to the blog post example we discussed in class, consider storing your data — images, text, items — in a JavaScript array and rendering them into the HTML from there. This results in a much cleaner HTML file and makes it far easier to add, remove, or modify content in the future without touching the HTML structure.`,

  'defer-domcontentloaded': () =>
    `If you are using the defer attribute on your script tag, you do not need to wrap everything inside a DOMContentLoaded event listener — defer already ensures the script runs after the DOM is ready. Removing the redundant wrapper will simplify your code.`,

  'external-library-warning': () =>
    `This assignment utilises an external JavaScript library, which is outside the assignment guidelines. The course expects students to demonstrate their creativity using vanilla JS techniques, and the use of external libraries is not permitted. I am not deducting points for this as it is your first instance, but please read the assignment brief carefully and avoid making this mistake in future assignments.`,


  // ── INTERACTION-SPECIFIC ─────────────────────────────────────

  'drag-drop-feedback': () =>
    `The drag and drop interaction works well, but could benefit from more visual feedback. For example, consider highlighting the valid drop zones when the user begins dragging, and providing a clear visual response — such as a color change or scale effect — when an item is successfully dropped.`,

  'floating-items': () =>
    `At present, some items appear to be suspended in mid-air. You might want to think about adding a surface — a hanger, a shelf, a plank, or a rack — for these items to visually rest on. This small addition adds realism and makes the interaction feel more grounded.`,

  'prev-next-disabled': () =>
    `When the experience first loads, consider disabling the "previous" button since there is nothing to go back to. Similarly, on the final item, disable the "next" button. This prevents users from clicking into an undefined state and communicates the boundaries of the experience clearly.`,

  'step-counter': () =>
    `Consider adding a step counter or progress indicator so users can see how many steps have been completed and how many remain. Even a simple "Step 1 of 5" label can significantly improve the sense of orientation within the experience.`,

  'scoreboard-timer': () =>
    `To further elevate the experience, consider adding a timer and a scoreboard that tracks user performance. These elements introduce a competitive aspect and give users a reason to return and improve their score.`,

  'welcome-page-title': () =>
    `While the current title is functional, you could tap into your creativity and choose something more captivating. A well-chosen title, paired with a brief tagline and a logo or icon, sets the tone for the entire experience and immediately communicates what the project is about.`,

};
