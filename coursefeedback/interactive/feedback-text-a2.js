// ─────────────────────────────────────────────────────────────
// feedback-text-a2.js
// Feedback text objects for Assignment 2 — Media Player
// Drop-in replacement for feedback-text.js when reviewing A2.
// ─────────────────────────────────────────────────────────────


const OPENERS = {
  good: (name, asgn) => `Well done ${name} on ${asgn}. I appreciate the visual appeal and the thoughtfulness behind the design, incorporating colors, typography, and layout effectively. The end result is a good clean design that fits nicely with the chosen context.`,
  strong: (name, asgn) => `Well done ${name} on ${asgn}! Your submission was fantastic. I appreciate the visual appeal and the thoughtfulness behind the design, incorporating typography, color, and layout effectively. It resulted in a sleek and polished design that suits the chosen context perfectly.`,
  hd: (name, asgn) => `Excellent job, ${name}, on ${asgn}! Your submission was truly impressive. I really admire the visual attractiveness and the careful attention to detail in the design, especially the effective use of typography, colors, and layout. The end result is a sleek and polished design that suits the chosen context beautifully.`,
  short: (name, asgn) => `Well done ${name} on ${asgn}. The overall design is good and good to see that you were able to add some functionality to the media player. However there are a few things that can be further enhanced.`,
};


const PRAISE_TEXT = {
  'comments': `Also good to see detailed comments in your code.`,
  'advanced-techniques': `Also good to see the use of advanced techniques such as arrow functions, even though we haven't covered them in class. It's impressive that you took the initiative to learn them on your own.`,
  'acknowledgement': `Also good to see the acknowledgement of resources and tutorials that helped you in this assignment.`,
  'playlist': `I loved the inclusion of a playlist and the way it integrates with the media player.`,
  'context-fit': `The design choices feel unique to the chosen context and go beyond a generic media player — well done on that.`,
  'extra-feature': `The inclusion of additional features such as the timer, comments section, or study tools was a fantastic touch that enriched the experience.`,
  'strong-visuals': `I loved the use of imagery, typography, and color — the overall aesthetic is highly polished and engaging.`,
  'figma-readme': `It is also fantastic to see a well-crafted readme or mood board that clearly explains the reasoning behind your work.`,
  'code-clean': `The code is clean and well-structured, making it easy to follow.`,
  'functions-working': `Great to see that you were able to implement the key playback functionalities such as play, pause, volume, and track navigation correctly.`,
};


const IMPROVE_TEXT = {

  // ── CONTEXT & DESIGN ─────────────────────────────────────────

  'context-not-clear': () =>
    `Consider enhancing the overall layout to better align with the chosen context. Think about ways to make the context stand out more. Currently, the design is clean and suitable for any media player, but it doesn't feel unique to the context — it is also not immediately clear which context you are working in just by looking at the page. For the chosen context, aim to improve the overall appearance not only through colors but also by choosing a better background, adding elements that feel specific to the context, and making it feel like a purposeful design decision rather than a default layout.`,

  'better-title': () =>
    `You could choose a better title than just "media player website" or the name of the context. Maybe you could think of a cool, creative name for your media player and use that as the title, with a short descriptive subheading below it. A distinctive title immediately communicates the intent of the design to the user.`,

  'design-too-basic': () =>
    `By looking at the code, I could not see many additions or enhancements beyond the layout or example we worked on in class. Consider expanding on the design to better align with the chosen context. Think about what unique elements you could add — for example, an artist biography, recipe steps, study goals, a tracklist, or imagery that ties directly to the theme.`,

  'layout-side-by-side': () =>
    `While the layout is visually appealing, there is room for improvement in the arrangement of elements. At present, items are simply stacked vertically, which works well on smaller screens, but on larger displays, you could take advantage of the extra width. Instead of placing the player and the secondary content one below the other, consider positioning them side by side for a more spacious and dynamic layout.`,

  'context-comments': () =>
    `The comments could be more illustrative of your design decisions. Currently you describe the functionality well, but the reasoning behind the decisions could be added to add further strength. Specifically, you did not mention the context and how the context motivates your design. For readers it would be good if you could add it in the comments and explain your reasoning behind — first, why this context, and then how you modified the original design to fit it.`,

  'hide-footer-resources': () =>
    `Another suggestion is to hide the footer and replace it with a small button that acknowledges the resources. This will help declutter the layout and give your website a cleaner, more polished appearance.`,


  // ── MEDIA PLAYER CONTROLS ─────────────────────────────────────

  'single-play-pause-btn': () =>
    `Instead of using separate buttons for play and pause, think about implementing a single toggle button, similar to our class example. Since these actions cannot happen at the same time, a single button that switches between play and pause would be more efficient and cleaner. Refer to the class example for guidance.`,

  'hide-default-controls': () =>
    `Since you are building your own controls, you can hide the default browser controls by removing the controls attribute from the <video> or <audio> element. This gives you full control over the layout and styling of the player.`,

  'single-audio-element': () =>
    `Rather than using a separate audio element for each playlist item, consider implementing a single audio player that changes its source when a new track is selected. This approach eliminates the need for multiple audio elements in your HTML. Refer to the class examples where we discussed loading different tracks — multiple audio elements are only needed if you want to play sounds simultaneously.`,

  'progress-bar-placement': () =>
    `The placement of the progress bar could be improved. Consider positioning it in the middle of the controls row, similar to the class example, rather than above or below the buttons. This creates a more cohesive and familiar media player layout.`,

  'remove-controls-attribute': () =>
    `Since you are implementing your own controls, you can remove the controls attribute from the video or audio tag to hide the browser's default controls. This will give your design a more polished and intentional look.`,

  'timer-pause-reset': () =>
    `You introduced a timer feature, but it would be great to also have options to pause and reset it. Right now I am able to start the timer but there is no way to stop or pause it, which limits its usefulness.`,

  'timer-icons': () =>
    `Given the appealing icon-based buttons in your media player, it would be beneficial to apply similar icons for the timer instead of text labels like "start", "stop", and "reset". You can find suitable icons on Icons8, or if you are artistically inclined, designing your own would further elevate the visual experience.`,


  // ── VISUAL & UX ──────────────────────────────────────────────

  'button-depth': () =>
    `The overall design of the page is stunning, yet the interactive features for the media buttons feel somewhat simplistic. Adding a subtle box shadow to the buttons could enhance their depth. Additionally, implementing a scaling effect on hover would provide users with valuable feedback and elevate the visual experience through the feeling of pressing a physical button.`,

  'button-consistency': () =>
    `Aim for uniformity in color, size, and shape across all buttons. Currently some buttons are styled differently to others, which creates a slightly inconsistent look. Choosing one style and applying it throughout will give the interface a more cohesive and professional appearance.`,

  'cursor-pointer': () =>
    `Add cursor: pointer to all interactive elements such as buttons, playlist items, and any clickable areas. This provides users with clear feedback that the element is interactive and improves the overall usability of the interface.`,

  'hover-playlist': () =>
    `Consider adding a hover effect on playlist items so that when users hover over them, there is visual feedback. When a track is selected and playing, there should also be a noticeable change — perhaps through a background color or a highlighted state — so users can clearly see which track is active.`,

  'animation-caution': () =>
    `While animations add a nice visual touch, it is important to use them judiciously. Avoid running looping animations indefinitely as they can become distracting. It is better to trigger animations on user interaction — such as hover or click — rather than having them run continuously in the background.`,

  'semi-transparent-bg': () =>
    `Consider giving the media player container a semi-transparent or lightly colored background to create a cohesive look between the video and its controls, which currently feel slightly disconnected from each other. A glass-like effect using a semi-transparent background could complement the overall theme nicely.`,

  'font-choice': () =>
    `Try experimenting with different graphic fonts to enhance the visual layout. Fonts play a crucial role in the overall design, and by exploring different options, you can find a font that complements the theme and adds an extra touch of creativity to your design.`,

  'font-pairing': () =>
    `The font you chose for the heading is excellent and adds a vibrant visual appeal to the page, but the body text font feels a bit too plain or mismatched in comparison. For a more cohesive look, consider selecting a complementary font for the body text that works well alongside the heading font.`,

  'color-contrast': () =>
    `Aim for better color contrast to improve readability. In some areas, the text color does not stand out sufficiently against the background. Choosing a darker or more complementary color for the text in those sections would significantly improve legibility.`,

  'range-slider-color': () =>
    `To enhance the visual appeal of your range slider, consider changing its color to better align with the overall aesthetic. This can be achieved easily using the accent-color property in CSS — for example: accent-color: #yourcolor;`,

  'serif-font-warning': () =>
    `While the current font is not bad, to enhance readability on the web it is generally best to choose sans-serif fonts. Serif fonts may look elegant in print, but they can be a bit overwhelming on digital screens. You might want to explore Google Fonts for a suitable sans-serif option.`,


  // ── JAVASCRIPT & CODE ─────────────────────────────────────────

  'explain-advanced-techniques': () =>
    `It's great to see the implementation of modern techniques like arrow functions. However, providing explanations within your code about their usage would instill more confidence in your understanding of the technique. Without this, it may appear that the code is simply sourced from external references. Lastly, if you have utilised any external resources including chatGPT, it is always a good idea to acknowledge them in your comments.`,

  'avoid-mixing-selectors': () =>
    `While there is nothing inherently wrong, it is advisable to stick with either getElementById or querySelector instead of mixing both. Similarly, avoid making repeated calls to these methods — it is better and more efficient to retrieve elements once, store them in a variable, and reuse that variable throughout your code.`,

  'no-inline-js': () =>
    `It is recommended to refrain from using inline styles and embedding scripts within the HTML page. All styles should be consolidated in style.css and all JavaScript should be contained in script.js, to uphold a clear separation of concerns as discussed in class. Currently there are two distinct scripts on the same page; ideally consolidate these into a single script file.`,

  'check-console': () =>
    `Make sure to check the console in Chrome DevTools to identify and resolve any errors in your code. There are a few issues that are preventing the media from functioning correctly — the console will help you pinpoint and fix them efficiently.`,

  'outdated-techniques': () =>
    `Be cautious of outdated tutorials and techniques online that may complicate rather than assist your coding efforts. Even tools like ChatGPT may not always provide the most current or effective code. Your existing code is functional but could benefit from simplification using the techniques we have covered in class. I suggest adopting a consistent coding style instead of blending different methods, as this can lead to confusion.`,

  'use-input-not-prompt': () =>
    `It is advisable to use the <input> element for gathering user input instead of browser prompts. Prompts, like the <audio> and <video> elements, come with default browser styles that we cannot easily customise, which can clash with the design. The <input> element is a more flexible and stylistically consistent option for collecting user data.`,

  'defer-keyword': () =>
    `You may have accidentally forgotten to add the defer keyword to the script tag in your HTML. Without defer, the script may run before the DOM is fully loaded, which can cause issues. Adding defer is generally cleaner than wrapping everything in a DOMContentLoaded event listener.`,

};
