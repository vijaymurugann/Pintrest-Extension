/**
 * @file content.js
 * @description This script finds and removes the login overlay on Pinterest.
 * It also re-enables scrolling on the page and restores the native right-click menu.
 * Updated to bring the image to the front using z-index and handle SPA navigation.
 */

/**
 * Brings the actual image to the front by setting its z-index,
 * so that it sits on top of any overlays.
 * @param {HTMLElement} container The parent element with data-test-id="pin-closeup-image".
 */
function bringImageToFront(container) {
  // Find the actual image element within the container.
  const image = container.querySelector("img");

  // We check if the image exists to avoid errors.
  if (image) {
    console.log("Image found. Bringing it to the front with z-index.");
    // To use z-index, the position property must be set to something other than 'static'.
    image.style.position = "absolute";
    image.style.zIndex = "999";

    // The login wall often disables scrolling on the body. Let's re-enable it.
    document.body.style.overflow = "auto";
  }
}

/**
 * Finds any new image container that hasn't been processed yet and attaches event listeners.
 * 1. 'mouseenter': Brings the image to the front.
 * 2. 'contextmenu': Stops Pinterest from showing a custom right-click menu.
 */
function setupEventListenersForImageContainer() {
  // Find an image container that we haven't already attached our listeners to.
  const imageContainer = document.querySelector(
    '[data-test-id="pin-closeup-image"]:not([data-overlay-remover-active])'
  );

  // If we found a new, unprocessed container, we set up our listeners.
  if (imageContainer) {
    console.log("New image container found. Attaching event listeners.");

    // Mark this container as processed so we don't attach listeners to it again.
    imageContainer.setAttribute("data-overlay-remover-active", "true");

    // Listener 1: When the mouse enters the container, bring the image to the front.
    imageContainer.addEventListener("mouseenter", () => {
      bringImageToFront(imageContainer);
    });

    // Listener 2: When right-clicking, stop the event from bubbling up.
    // This prevents Pinterest's custom menu from appearing.
    // The 'true' argument makes this listener run in the "capture" phase,
    // catching the event before Pinterest's script can.
    imageContainer.addEventListener(
      "contextmenu",
      (event) => {
        console.log(
          "Right-click detected. Stopping event propagation to ensure native menu appears."
        );
        event.stopPropagation();
      },
      true
    );
  }
}

// Since Pinterest is a Single Page Application, content changes without a full page reload.
// We need a persistent observer to watch for these changes.
const pageChangeObserver = new MutationObserver(() => {
  // Every time the page content changes, we'll try to find and set up any new image containers.
  setupEventListenersForImageContainer();
});

// Tell the observer to watch the entire body for child elements being added or removed.
pageChangeObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

// Finally, run the function once when the script first loads,
// in case the container is already on the page.
setupEventListenersForImageContainer();
