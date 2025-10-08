// Load Google Maps embeds

document.getElementById("accept-maps").addEventListener("click", function () {
  document.querySelectorAll(".map-placeholder").forEach((el) => {
    const src = el.getAttribute("data-src");
    el.innerHTML = `
        <iframe 
            src="${src}" 
            class="embed"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        </iframe>
      `;
  });
});

// Load Insta embeds

// Get the button element by its ID "accept-insta"
const instaButton = document.getElementById("accept-insta");

// A flag to track whether Instagram embeds have been loaded already
let instaLoaded = false;

// Add a click event listener to the button
instaButton.addEventListener("click", () => {
  // Select all elements with the class "insta-placeholder"
  const placeholders = document.querySelectorAll(".insta-placeholder");

  // Check if Instagram embeds have NOT been loaded yet
  if (!instaLoaded) {
    // Loop through each placeholder element
    placeholders.forEach((el) => {
      // Get the Instagram permalink URL from a custom data attribute
      const src = el.getAttribute("data-instgrm-permalink-src");

      // Dynamically create a blockquote element for the Instagram embed
      const block = document.createElement("blockquote");
      block.className = "instagram-media"; // Add Instagram's required class
      block.setAttribute("data-instgrm-permalink", src); // Set the permalink URL
      block.setAttribute("data-instgrm-version", "14"); // Specify Instagram embed version
      block.style.maxWidth = "540px"; // Set styling (max width)
      block.style.margin = "auto"; // Center the block

      // Clear any existing content in the placeholder
      el.innerHTML = "";
      // Append the blockquote to the placeholder
      el.appendChild(block);
    });

    // Check if the Instagram embed script is already on the page
    const existingScript = document.querySelector(
      'script[src*="instagram.com/embed.js"]'
    );

    if (!existingScript) {
      // If not, create a new script element to load Instagram's embed.js
      const s = document.createElement("script");
      s.src = "https://www.instagram.com/embed.js"; // Script source
      s.async = true; // Load asynchronously
      s.onload = () => {
        // Once the script is loaded, process all blockquotes to render Instagram embeds
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      };
      // Append the script to the body so it starts loading
      document.body.appendChild(s);
    } else {
      // If the script is already loaded, just process any new blockquotes
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    }

    // Update the flag to indicate Instagram embeds are now loaded
    instaLoaded = true;
    // Change button text to indicate that clicking will hide Instagram
    instaButton.textContent = "Don't show Insta";
  } else {
    // If Instagram embeds are already loaded, clear the placeholders
    placeholders.forEach((el) => (el.innerHTML = ""));
    // Update the flag
    instaLoaded = false;
    // Change button text to indicate clicking will show Instagram again
    instaButton.textContent = "Show Insta";
  }
});
