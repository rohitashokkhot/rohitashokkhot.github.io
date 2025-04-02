// manifest.json
{
  "manifest_version": 3,
  "name": "Nutrition Claims Analyzer",
  "version": "0.1.0",
  "description": "Analyzes YouTube videos for potential nutrition misinformation",
  "permissions": [
    "activeTab",
    "storage"
  ],
  "host_permissions": [
    "*://*.youtube.com/*"
  ],
  "content_scripts": [
    {
      "matches": ["*://*.youtube.com/*"],
      "js": ["content.js"],
      "css": ["overlay.css"]
    }
  ],
  "background": {
    "service_worker": "background.js"
  },
  "icons": {
    "16": "images/icon16.png",
    "48": "images/icon48.png",
    "128": "images/icon128.png"
  },
  "options_page": "options.html",
  "action": {
    "default_popup": "popup.html",
    "default_icon": "images/icon48.png"
  }
}

// background.js - Handles background processes and messaging
let enabledState = true;

// Initialize storage with default settings
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    enabled: true,
    sensitivityLevel: 'medium',
    // Patterns database with confidence levels
    nutritionPatterns: [
      {pattern: "lose \\d+ pounds in \\d+ days", confidence: 0.9, category: "unrealistic_claims"},
      {pattern: "burns fat while you sleep", confidence: 0.85, category: "metabolism_myths"},
      {pattern: "detox", confidence: 0.7, category: "pseudoscience"},
      {pattern: "superfood", confidence: 0.6, category: "marketing_hype"},
      {pattern: "doctors hate (this|him|her)", confidence: 0.95, category: "conspiracy"},
      {pattern: "one simple trick", confidence: 0.8, category: "clickbait"},
      {pattern: "(never|always) eat", confidence: 0.75, category: "absolutism"},
      {pattern: "miracle (food|ingredient|supplement)", confidence: 0.9, category: "exaggeration"},
      {pattern: "this (food|drink) (causes|cures) ", confidence: 0.8, category: "causal_claims"},
      {pattern: "secret (the|big|food) industry", confidence: 0.85, category: "conspiracy"},
      {pattern: "weight loss hack", confidence: 0.7, category: "shortcuts"},
      {pattern: "belly fat", confidence: 0.65, category: "spot_reduction_myth"},
      {pattern: "boost metabolism", confidence: 0.6, category: "metabolism_myths"},
      {pattern: "toxins", confidence: 0.7, category: "pseudoscience"},
      {pattern: "cleanse", confidence: 0.65, category: "pseudoscience"}
    ],
    contextInfo: {
      "unrealistic_claims": "Healthy weight loss typically occurs at 1-2 pounds per week with sustainable lifestyle changes.",
      "metabolism_myths": "Metabolism is regulated by complex systems and generally can't be dramatically altered by specific foods.",
      "pseudoscience": "This term lacks scientific consensus and isn't well-supported by peer-reviewed research.",
      "marketing_hype": "This marketing term doesn't have a scientific definition and overstates nutritional benefits.",
      "conspiracy": "Claims about suppressed information or industry conspiracies rarely reflect scientific consensus.",
      "clickbait": "This phrase is commonly used in misleading headlines to generate clicks.",
      "absolutism": "Nutrition science rarely supports 'never' or 'always' recommendations for most foods.",
      "exaggeration": "This claim significantly overstates the evidence-based effects.",
      "causal_claims": "Single foods rarely cause or cure complex health conditions.",
      "shortcuts": "Sustainable nutritional changes typically require consistent habits, not quick fixes.",
      "spot_reduction_myth": "Research shows targeted fat loss from specific body areas isn't physiologically possible.",
      "toxins": "Claims about removing unspecified 'toxins' generally lack scientific support."
    }
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getSettings") {
    chrome.storage.local.get(null, (settings) => {
      sendResponse({settings: settings});
    });
    return true; // Required for async response
  }
});

// content.js - Main script that runs on YouTube pages
let currentSettings = {};
let videoElements = [];
let activeOverlay = null;

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeExtension);

// Also run on subsequent navigation events within YouTube
window.addEventListener('yt-navigate-finish', initializeExtension);

function initializeExtension() {
  // Request settings from background script
  chrome.runtime.sendMessage({action: "getSettings"}, function(response) {
    if (response && response.settings) {
      currentSettings = response.settings;
      if (currentSettings.enabled) {
        setupVideoDetection();
      }
    }
  });
}

function setupVideoDetection() {
  // Initial scan for video elements
  scanForVideoElements();
  
  // Set up a mutation observer to detect when new videos are loaded
  const observer = new MutationObserver(function(mutations) {
    let shouldScan = false;
    
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        shouldScan = true;
        break;
      }
    }
    
    if (shouldScan) {
      // Throttle the scanning to avoid performance issues
      if (!window.scanTimeout) {
        window.scanTimeout = setTimeout(() => {
          scanForVideoElements();
          window.scanTimeout = null;
        }, 500);
      }
    }
  });
  
  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
}

function scanForVideoElements() {
  // Different selectors for different YouTube page types
  const selectors = {
    // Home page and search results video items
    thumbnails: 'ytd-thumbnail:not([data-nutrition-checked])',
    // Video page recommended videos
    recommendations: 'ytd-compact-video-renderer:not([data-nutrition-checked]), ytd-grid-video-renderer:not([data-nutrition-checked])',
    // Video page title
    videoTitle: 'h1.ytd-video-primary-info-renderer:not([data-nutrition-checked])'
  };
  
  // Process home/search page thumbnails
  document.querySelectorAll(selectors.thumbnails).forEach(element => {
    processThumbnailElement(element);
  });
  
  // Process recommended videos
  document.querySelectorAll(selectors.recommendations).forEach(element => {
    processRecommendationElement(element);
  });
  
  // Process video page title
  document.querySelectorAll(selectors.videoTitle).forEach(element => {
    processVideoTitleElement(element);
  });
}

function processThumbnailElement(element) {
  // Mark as processed
  element.setAttribute('data-nutrition-checked', 'true');
  
  // Find the parent video renderer element
  const videoRenderer = element.closest('ytd-video-renderer, ytd-grid-video-renderer');
  if (!videoRenderer) return;
  
  // Extract the title text
  const titleElement = videoRenderer.querySelector('#video-title, #title-wrapper');
  if (!titleElement) return;
  
  const titleText = titleElement.textContent.trim();
  
  // Add hover event listeners
  element.addEventListener('mouseenter', () => {
    analyzeAndShowOverlay(titleText, element, 'thumbnail');
  });
  
  element.addEventListener('mouseleave', () => {
    removeOverlay();
  });
}

function processRecommendationElement(element) {
  // Mark as processed
  element.setAttribute('data-nutrition-checked', 'true');
  
  // Extract the title text
  const titleElement = element.querySelector('#video-title');
  if (!titleElement) return;
  
  const titleText = titleElement.textContent.trim();
  
  // Add hover event listeners
  element.addEventListener('mouseenter', () => {
    analyzeAndShowOverlay(titleText, element, 'recommendation');
  });
  
  element.addEventListener('mouseleave', () => {
    removeOverlay();
  });
}

function processVideoTitleElement(element) {
  // Mark as processed
  element.setAttribute('data-nutrition-checked', 'true');
  
  // Extract title directly
  const titleText = element.textContent.trim();
  
  // For main video title, analyze immediately but don't show yet
  const result = analyzeContentForNutritionClaims(titleText);
  
  if (result.hasClaims) {
    // Add a subtle indicator next to the title that user can hover over
    const indicator = document.createElement('span');
    indicator.className = 'nutrition-indicator';
    indicator.textContent = '💭'; // Thinking emoji
    indicator.title = 'This video may contain nutrition claims. Hover for more info.';
    
    // Position it after the title
    element.style.position = 'relative';
    element.appendChild(indicator);
    
    // Add hover listeners to the indicator
    indicator.addEventListener('mouseenter', () => {
      analyzeAndShowOverlay(titleText, element, 'mainVideo', result);
    });
    
    indicator.addEventListener('mouseleave', () => {
      removeOverlay();
    });
  }
}

function analyzeAndShowOverlay(text, element, contextType, preAnalyzedResult = null) {
  // Use pre-analyzed result if provided, otherwise analyze the text
  const result = preAnalyzedResult || analyzeContentForNutritionClaims(text);
  
  if (result.hasClaims) {
    showOverlay(element, result, contextType);
  }
}

function analyzeContentForNutritionClaims(text) {
  const patterns = currentSettings.nutritionPatterns;
  const sensitivityThreshold = getSensitivityThreshold();
  
  // Initialize result object
  const result = {
    hasClaims: false,
    claims: [],
    highestConfidence: 0,
    text: text
  };
  
  // Check each pattern
  for (const patternObj of patterns) {
    const regex = new RegExp(patternObj.pattern, 'i');
    if (regex.test(text) && patternObj.confidence >= sensitivityThreshold) {
      // Add the matched claim
      result.claims.push({
        pattern: patternObj.pattern,
        category: patternObj.category,
        confidence: patternObj.confidence,
        context: currentSettings.contextInfo[patternObj.category]
      });
      
      result.hasClaims = true;
      result.highestConfidence = Math.max(result.highestConfidence, patternObj.confidence);
    }
  }
  
  return result;
}

function getSensitivityThreshold() {
  // Convert sensitivity setting to threshold value
  switch(currentSettings.sensitivityLevel) {
    case 'high':
      return 0.5; // More sensitive, lower threshold
    case 'low':
      return 0.8; // Less sensitive, higher threshold
    case 'medium':
    default:
      return 0.65;
  }
}

function showOverlay(element, result, contextType) {
  // Remove any existing overlay
  removeOverlay();
  
  // Create new overlay
  const overlay = document.createElement('div');
  overlay.className = 'nutrition-overlay';
  
  // Select only the top 3 claims with highest confidence
  const topClaims = result.claims
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
  
  let overlayContent = `
    <div class="nutrition-overlay-header">
      <span class="nutrition-overlay-icon">💭</span>
      <span class="nutrition-overlay-title">Think Before You Watch</span>
      <button class="nutrition-overlay-close">×</button>
    </div>
    <div class="nutrition-overlay-content">
      <p>This video title contains patterns often associated with nutrition misinformation:</p>
      <ul>
  `;
  
  topClaims.forEach(claim => {
    overlayContent += `<li>${claim.context}</li>`;
  });
  
  overlayContent += `
      </ul>
      <div class="nutrition-overlay-questions">
        <p>Consider asking:</p>
        <ul>
          <li>Is this claim backed by peer-reviewed research?</li>
          <li>Does it promise unrealistic or extremely quick results?</li>
          <li>Does it use absolutist language ("never", "always")?</li>
        </ul>
      </div>
    </div>
  `;
  
  overlay.innerHTML = overlayContent;
  
  // Position the overlay based on the element and context type
  positionOverlay(overlay, element, contextType);
  
  // Add event listener to close button
  overlay.querySelector('.nutrition-overlay-close').addEventListener('click', (e) => {
    e.stopPropagation();
    removeOverlay();
  });
  
  // Add the overlay to the document
  document.body.appendChild(overlay);
  activeOverlay = overlay;
}

function positionOverlay(overlay, element, contextType) {
  // Get position of the target element
  const rect = element.getBoundingClientRect();
  
  // Set basic positioning
  overlay.style.position = 'absolute';
  overlay.style.zIndex = '9999';
  
  // Position differently based on context
  switch(contextType) {
    case 'thumbnail':
      // Position to the right of the thumbnail
      overlay.style.top = `${rect.top + window.scrollY}px`;
      overlay.style.left = `${rect.right + window.scrollX + 10}px`;
      overlay.style.maxWidth = '300px';
      break;
      
    case 'recommendation':
      // Position below the recommendation
      overlay.style.top = `${rect.bottom + window.scrollY + 10}px`;
      overlay.style.left = `${rect.left + window.scrollX}px`;
      overlay.style.maxWidth = `${rect.width}px`;
      break;
      
    case 'mainVideo':
      // Position below the main video title
      overlay.style.top = `${rect.bottom + window.scrollY + 10}px`;
      overlay.style.left = `${rect.left + window.scrollX}px`;
      overlay.style.maxWidth = '400px';
      break;
  }
  
  // Ensure overlay is visible within viewport
  setTimeout(() => {
    const overlayRect = overlay.getBoundingClientRect();
    
    // Check if overlay is outside viewport horizontally
    if (overlayRect.right > window.innerWidth) {
      overlay.style.left = `${window.innerWidth - overlayRect.width - 20 + window.scrollX}px`;
    }
    
    // Check if overlay is outside viewport vertically
    if (overlayRect.bottom > window.innerHeight) {
      overlay.style.top = `${rect.top + window.scrollY - overlayRect.height - 10}px`;
    }
  }, 0);
}

function removeOverlay() {
  if (activeOverlay) {
    activeOverlay.remove();
    activeOverlay = null;
  }
}

// overlay.css
.nutrition-overlay {
  background-color: white;
  border: 2px solid #3ea6ff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  font-family: 'Roboto', Arial, sans-serif;
  color: #0f0f0f;
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.97;
  transition: opacity 0.3s ease;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 0.97; transform: translateY(0); }
}

.nutrition-overlay-header {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 8px 12px;
  border-bottom: 1px solid #e5e5e5;
  border-radius: 6px 6px 0 0;
}

.nutrition-overlay-icon {
  font-size: 16px;
  margin-right: 8px;
}

.nutrition-overlay-title {
  flex: 1;
  font-weight: 500;
  color: #0d57d6;
}

.nutrition-overlay-close {
  background: none;
  border: none;
  color: #606060;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.nutrition-overlay-close:hover {
  background-color: #e5e5e5;
  color: #0f0f0f;
}

.nutrition-overlay-content {
  padding: 12px;
}

.nutrition-overlay-content p {
  margin: 0 0 10px 0;
}

.nutrition-overlay-content ul {
  margin: 8px 0;
  padding-left: 24px;
}

.nutrition-overlay-content li {
  margin-bottom: 6px;
}

.nutrition-overlay-questions {
  background-color: #f0f7ff;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
  border-left: 3px solid #3ea6ff;
}

.nutrition-indicator {
  display: inline-block;
  margin-left: 8px;
  font-size: 16px;
  cursor: help;
  opacity: 0.7;
  transition: opacity 0.2s;
  vertical-align: middle;
}

.nutrition-indicator:hover {
  opacity: 1;
}

// options.html - Extension configuration page
<!DOCTYPE html>
<html>
<head>
  <title>Nutrition Claims Analyzer - Options</title>
  <style>
    body {
      font-family: 'Roboto', Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #0f0f0f;
    }
    
    .header {
      margin-bottom: 30px;
    }
    
    h1 {
      color: #0d57d6;
    }
    
    .option-section {
      margin-bottom: 24px;
      padding: 16px;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    select, input[type="checkbox"] {
      margin-bottom: 16px;
    }
    
    .pattern-list {
      margin-top: 16px;
    }
    
    .pattern-item {
      display: flex;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid #e5e5e5;
    }
    
    .pattern-item:nth-child(even) {
      background-color: #f0f0f0;
    }
    
    .pattern-text {
      flex: 1;
    }
    
    .pattern-confidence {
      width: 100px;
      text-align: center;
    }
    
    .pattern-category {
      width: 150px;
      text-align: center;
    }
    
    .button {
      background-color: #0d57d6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .button:hover {
      background-color: #0a45b0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Nutrition Claims Analyzer Settings</h1>
    <p>Configure how the extension detects and responds to potential nutrition misinformation.</p>
  </div>
  
  <div class="option-section">
    <label>
      <input type="checkbox" id="enabled"> Enable extension
    </label>
    
    <label for="sensitivity">Detection Sensitivity:</label>
    <select id="sensitivity">
      <option value="low">Low (fewer alerts, higher confidence)</option>
      <option value="medium" selected>Medium (balanced)</option>
      <option value="high">High (more alerts, may include false positives)</option>
    </select>
  </div>
  
  <div class="option-section">
    <h2>Detection Patterns</h2>
    <p>These patterns are used to identify potential nutrition misinformation:</p>
    
    <div class="pattern-list" id="patternList">
      <!-- Patterns will be populated here by JavaScript -->
    </div>
  </div>
  
  <button id="save" class="button">Save Settings</button>
  <button id="reset" class="button" style="background-color: #606060;">Reset to Defaults</button>
  
  <script src="options.js"></script>
</body>
</html>

// options.js - Options page functionality
document.addEventListener('DOMContentLoaded', () => {
  // Load current settings
  chrome.storage.local.get(null, (settings) => {
    // Initialize enabled checkbox
    const enabledCheckbox = document.getElementById('enabled');
    enabledCheckbox.checked = settings.enabled;
    
    // Initialize sensitivity dropdown
    const sensitivitySelect = document.getElementById('sensitivity');
    sensitivitySelect.value = settings.sensitivityLevel;
    
    // Populate patterns list
    const patternList = document.getElementById('patternList');
    settings.nutritionPatterns.forEach((pattern, index) => {
      const patternItem = document.createElement('div');
      patternItem.className = 'pattern-item';
      
      patternItem.innerHTML = `
        <div class="pattern-text">${pattern.pattern}</div>
        <div class="pattern-confidence">${(pattern.confidence * 100).toFixed(0)}% confidence</div>
        <div class="pattern-category">${pattern.category.replace('_', ' ')}</div>
      `;
      
      patternList.appendChild(patternItem);
    });
  });
  
  // Save settings
  document.getElementById('save').addEventListener('click', () => {
    const enabledCheckbox = document.getElementById('enabled');
    const sensitivitySelect = document.getElementById('sensitivity');
    
    chrome.storage.local.set({
      enabled: enabledCheckbox.checked,
      sensitivityLevel: sensitivitySelect.value
    }, () => {
      // Show saved confirmation
      const saveButton = document.getElementById('save');
      saveButton.textContent = 'Saved!';
      setTimeout(() => {
        saveButton.textContent = 'Save Settings';
      }, 2000);
    });
  });
  
  // Reset to defaults
  document.getElementById('reset').addEventListener('click', () => {
    if (confirm('Reset all settings to default values?')) {
      chrome.runtime.sendMessage({action: "resetSettings"}, () => {
        window.location.reload();
      });
    }
  });
});

// popup.html - Browser toolbar popup
<!DOCTYPE html>
<html>
<head>
  <title>Nutrition Claims Analyzer</title>
  <style>
    body {
      width: 300px;
      font-family: 'Roboto', Arial, sans-serif;
      padding: 16px;
      color: #0f0f0f;
    }
    
    h2 {
      margin-top: 0;
      color: #0d57d6;
    }
    
    .status {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    .status-active {
      background-color: #4caf50;
    }
    
    .status-inactive {
      background-color: #f44336;
    }
    
    .toggle-button {
      background-color: #0d57d6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 16px;
    }
    
    .toggle-button:hover {
      background-color: #0a45b0;
    }
    
    .stats {
      background-color: #f9f9f9;
      padding: 12px;
      border-radius: 8px;
      font-size: 14px;
    }
    
    .footer {
      margin-top: 16px;
      font-size: 12px;
      text-align: center;
    }
    
    .footer a {
      color: #0d57d6;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <h2>Nutrition Claims Analyzer</h2>
  
  <div class="status">
    <div id="statusIndicator" class="status-indicator"></div>
    <div id="statusText">Checking status...</div>
  </div>
  
  <button id="toggleButton" class="toggle-button">Toggle Extension</button>
  
  <a href="#" id="optionsLink">Open Settings</a>
  
  <div class="footer">
    <p>Help promote critical thinking about nutrition information.</p>
  </div>
  
  <script src="popup.js"></script>
</body>
</html>

// popup.js - Browser toolbar popup functionality
document.addEventListener('DOMContentLoaded', () => {
  // Update status display
  function updateStatus(isEnabled) {
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    const toggleButton = document.getElementById('toggleButton');
    
    if (isEnabled) {
      statusIndicator.className = 'status-indicator status-active';
      statusText.textContent = 'Extension is active';
      toggleButton.textContent = 'Disable Extension';
    } else {
      statusIndicator.className = 'status-indicator status-inactive';
      statusText.textContent = 'Extension is inactive';
      toggleButton.textContent = 'Enable Extension';
    }
  }
  
  // Load current settings
  chrome.storage.local.get(['enabled'], (result) => {
    updateStatus(result.enabled);
  });
  
  // Toggle button functionality
  document.getElementById('toggleButton').addEventListener('click', () => {
    chrome.storage.local.get(['enabled'], (result) => {
      const newState = !result.enabled;
      
      chrome.storage.local.set({enabled: newState}, () => {
        updateStatus(newState);
      });
    });
  });
  
  // Options link
  document.getElementById('optionsLink').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
});