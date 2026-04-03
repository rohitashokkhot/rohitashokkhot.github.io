// ─────────────────────────────────────────────────────────────
// REPLACE the PRAISE_TEXT and IMPROVE_TEXT objects in your
// feedback-webdev.html with the versions below.
// Everything else in the file stays exactly the same.
// ─────────────────────────────────────────────────────────────


const PRAISE_TEXT = {
  'reads-well': null, // handled in opener
  'nice-design': 'The overall design is clean, simple, and well-presented.',
  'comments': 'Also good to see comments in your code.',
  'semantic-some': 'Good to see the use of semantic tags in your code.',
  'images-used': 'Good to see the use of images to support your argument — they add helpful context and strengthen your points.',
  'grid-layout': 'I loved the grid-based layout — it gives the page a structured and polished look.',
  'typography': 'The typography is good and contributes to a professional, clean appearance.',
  'colors': 'The color palette is pleasing and creates a cohesive visual experience.',
  'consistent-theme': 'I especially like how you have maintained a consistent theme throughout the assignment, which is further enhanced by good typography and a pleasing choice of colors.',
  'advanced-technique': 'It is impressive to see you experimenting with advanced techniques in your code — keep it up! :)',
  'reset-css': 'Good to see reset.css included to ensure consistency across browsers.',
  'nav-links': 'Also good to see functioning nav links at the top and the breaking of content into multiple sections that are accessible via the top links.',
};


const IMPROVE_TEXT = {

  // ── CONTENT ──────────────────────────────────────────────────

  'expand-answers': () =>
    `The overall answers are slightly short, expand on them so that you are articulating your experience of browsing the website in detail and offering good reasoning for your response.`,

  'add-screenshots': (site) =>
    `Also consider using images or screenshots of ${site ? site : 'the website you are reviewing'} to support your argument and to add more context. By including relevant visuals, you can provide additional support to your points and engage your audience on a deeper level.`,

  'include-questions': () =>
    `You did not include the questions so for the reader it is not clear what you are responding to with each paragraph. While you may have added question numbers as comments in the HTML code, for clarity it would be good to include the complete questions so that there is context for the reader for each paragraph.`,

  'better-title': (site) =>
    `Rather than a generic title like "Assignment 1" or "Interactive Media Assignment 1", think of and include a better title — for example, "Critical review of ${site || 'the website'}" could be a better title for the page. That way you do not need an additional subheading pointing to the site.`,

  'meaningful-comments': () =>
    `Finally, add meaningful comments to both HTML and CSS so that your reasoning behind the layout and color choices are clear. For example, why did you choose a specific color or specific layout for an element? Simply describing what something is rather than why you chose it is less useful.`,


  // ── HTML ─────────────────────────────────────────────────────

  'semantic-tags': () =>
    `Consider using semantic HTML tags such as <section>, <main> and <article> to replace your main content which is currently structured using divs. Divs do not have any semantic meaning and their use should only be restricted for layout. For structuring, rely on more semantically appropriate tags. For example, <h3> and <p> are good choices to represent questions and answers, and you can then enclose each question and answer pair within a semantic tag such as a <section> tag. Similarly, instead of using a <div> with a class of "footer", you can simply use the <footer> tag directly.`,

  'reduce-divs': () =>
    `Additionally, try to minimise the overuse of <div> elements. In cases where you only have a single <p> element inside a <div>, you can apply the class directly to the <p> element instead of using an additional <div>. This will result in cleaner code.`,

  'no-content-outside-body': () =>
    `There are some semantic errors in the document — for example, all visible content should be placed within the <body> tag, including the header. Make sure nothing sits outside of <body> as this leads to unpredictable rendering.`,

  'no-br-spacing': () =>
    `Also you relied a lot on <br> to add gap or space between questions but instead you could make use of margin and padding or flexbox to achieve a similar effect. This keeps your HTML cleaner and your spacing more consistent.`,

  'heading-hierarchy': () =>
    `Ensure heading tags are used in sequential order — from <h1> downward — without skipping levels. For example, avoid jumping from <h1> directly to <h3> or <h5>.`,

  'figure-captions': () =>
    `Figure captions can also be centre-aligned for consistency with the rest of the layout.`,

  'anchor-content': () =>
    `In terms of anchor tags, it is important to note that they typically contain only text or images. Including block-level HTML elements such as <div>s or <button>s within anchor tags can lead to confusion from a user experience perspective. If you wish to make a larger region clickable, consider using a JavaScript click event instead — we will cover click-based event listeners when we discuss DOM handling in class.`,

  'reset-css-order': () =>
    `Also make sure reset.css is linked before style.css in your <head>. This ensures the reset does not accidentally override your own styles.`,

  'add-reset-css': () =>
    `Also include reset.css so that the design remains consistent across different browsers. Without it, default browser styles can introduce unexpected spacing and sizing differences.`,

  'semantic-errors': () =>
    `There are some minor semantic errors in the document to address. For example, check for duplicate closing tags, elements placed outside <body>, or tags that do not exist in standard HTML such as <p1> or <p2> — there is only one <p> tag in HTML corresponding to a paragraph.`,


  // ── CSS ──────────────────────────────────────────────────────

  'no-inline-style': () =>
    `There are some instances of inline styling. Avoid inline styling — remember the separation of concern that I mentioned in class. We should not mix styling, HTML and JS together in HTML; always have them in separate files. Move any inline style="..." attributes into style.css for consistency.`,

  'consolidate-classes': () =>
    `Also if you are using classes, the same class can be applied to multiple elements so you do not need to have multiple classes if they all contain the same properties. For example, you can create a single class called "question" or "ques" and use it for formatting all questions uniformly. The same is true for all the answers. If you wish to apply unique styles to specific items, use IDs or additional modifier classes for that purpose.`,

  'group-selectors': () =>
    `If you have multiple selectors that share the same properties, group them together using commas. This reduces redundancy and makes your CSS more concise. For example: h1, h2, h3 { font-family: Arial, sans-serif; color: #333; }`,

  'font-inheritance': () =>
    `If you are using the same font at multiple places then you can add the font-family to the <body> tag so that all elements will inherit it automatically — you do not need to add it again to individual elements like h1 or h2, and you do not need separate font utility classes applied to every element.`,

  'no-unused-fonts': () =>
    `Also you can remove the font styles and imports that are not in use from your CSS. Since you already added the font via the universal selector or body, you do not need to redeclare the font classes offered by Google Fonts on every element — they will inherit it automatically.`,

  'use-flexbox-grid': () =>
    `The overall layout would benefit from using flexbox and grid for better structure. For example, you can use display: flex with centre alignment to centre-align elements such as the footer, rather than using position: absolute. This is more reliable and easier to maintain.`,

  'overflow-hidden': () =>
    `It is crucial to design the layout in such a way that horizontal scrolling is minimised, as it can disrupt the user experience. If there are instances where content extends beyond the screen width, consider implementing overflow: hidden on the containing element to keep the layout clean and organised.`,

  'prefer-classes-over-ids': () =>
    `When it comes to styling, prefer using classes over IDs if the styles are identical across elements. Classes allow for greater reusability across multiple elements, whereas IDs should generally be reserved for unique elements or JavaScript hooks.`,

  'consistent-width': () =>
    `For a more uniform appearance, consider ensuring that both questions and answers have the same width. Currently the questions are a bit longer while the answers and their bounding box are smaller in comparison.`,

  'css-comment-why': () =>
    `Good to see comments in CSS and HTML, but make them more about your design choice rather than about what they are. For example, why did you choose a specific color or specific layout for that element? That reasoning is far more valuable for anyone reading the code.`,


  // ── VISUAL ───────────────────────────────────────────────────

  'font-pairing': () =>
    `The font you chose for your heading is excellent and adds a vibrant visual appeal to the page, but the body text font feels a bit too simple or plain in comparison. For a more cohesive and harmonious look, consider selecting a font that complements the style of the heading. Pairing two complementary fonts — one for headings and one for body text — will elevate the overall design.`,

  'readability-colors': () =>
    `You may want to reconsider using bright or vibrant colors for your main text. It is generally best to save vibrant colors for smaller elements like buttons or brief headings. For larger blocks of text, opting for black, gray, or more muted shades will enhance readability. You could also introduce subtle color variations between questions and answers to create a visually appealing contrast — making the question slightly darker than the answer, for example.`,

  'line-spacing': () =>
    `Although the typography is good, you can further enhance it by adding some line spacing (line-height) to the body text, and by balancing out the font sizing of the questions and the answers.`,

  'font-sizing': () =>
    `Aim for better consistency in terms of typography — the questions appear slightly larger than the answers, making the answer font seem a bit too small. Consider bringing them closer in size while keeping questions slightly bolder to maintain hierarchy without a jarring contrast.`,

  'margins-padding': () =>
    `The overall look of the website could be improved by including the techniques we learned in class — for example, a good font family, better margins and padding to the content. Also think of using flexbox and grid for a better layout. The text currently appears too close to the edges; adding padding on all sides would give the content room to breathe and result in a much more polished look.`,

  'animation-caution': () =>
    `I liked the use of animation in web design. However, it is important to exercise caution with animations as an excessive amount can detract from the website's readability and engagement, especially when dealing with large text. Be a little more selective when it comes to animation. Scaling text on hover works well for buttons or small text, but from a UX point of view it never really looks good for a large body of text as it causes layout shifts. If you intend to add transition and scaling effects, also guide the user by changing the cursor to pointer — add cursor: pointer to the corresponding selector in CSS so the arrow changes to a hand icon, making it clear to readers that these elements are interactive.`,

  'cursor-pointer': () =>
    `Where elements have hover or click effects, make sure to add cursor: pointer in CSS. This turns the arrow into a hand icon pointer and makes it clear to readers that these elements are interactive and clickable.`,

  'no-center-align-para': () =>
    `Also do not use centre-aligned text for paragraphs that consist of multiple lines. Centre alignment works well for short headings and labels, but for running text it significantly reduces readability.`,

  '75ch-rule': () =>
    `It is advisable to avoid full-width text on your web pages where possible. Following good typography and web UI design principles, a single line of text on a webpage should not have more than 75 characters — it creates a better reading experience, which is why most websites add padding or spacing on both sides. In the reset.css file, the max width of <p> is explicitly set to max-width: 75ch for this reason.`,

  'modern-fonts': () =>
    `The overall appearance can be enhanced by choosing a more distinctive font for the website. Browse through Google Fonts and pick a modern typeface that will elevate the design further.`,

  'sticky-footer-ux': () =>
    `The sticky footer looks interesting but it is more common to have a sticky header that gives context for the page. Sticky footers are rare, particularly for a page with a large body of text — if someone is reading through your answers, the footer comes in between and creates a slightly poor UX experience. You can reconsider the use of a sticky footer in your next designs.`,

  'column-count': () =>
    `When it comes to formatting lengthy paragraphs, it is advisable to avoid a layout with too many columns. From a user experience and readability standpoint, having more than two or three columns can complicate the reading process — it can make the text harder to follow as readers may need to constantly scroll vertically to keep track of where they are. This disrupts the natural left-to-right reading flow. Opting for a maximum of two columns will help maintain clarity and ensure the content remains accessible and easy to digest.`,

};
