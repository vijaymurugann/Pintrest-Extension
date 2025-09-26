# Pinterest Image Unblocker

<div align="center">
  <img src="icon128.png" alt="Extension Icon" width="128" height="128">
</div>

A browser extension that removes the login overlay on Pinterest pages, allowing you to copy and save images without being forced to sign up or log in.

## Features

- **Removes Login Overlays**: Bypasses Pinterest's login prompts that block image access
- **Enables Image Saving**: Right-click to save images directly to your device
- **Restores Native Right-Click**: Prevents Pinterest's custom context menu from appearing
- **Re-enables Scrolling**: Removes scroll restrictions imposed by login overlays
- **SPA Support**: Automatically handles Pinterest's single-page application navigation
- **Multi-Domain Support**: Works across all Pinterest international domains

## Installation

### Chrome/Chromium Browsers

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension will appear in your browser toolbar

### Firefox

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on..."
5. Select the `manifest.json` file from the extension folder

## How It Works

The extension injects a content script into Pinterest pin pages that:

1. **Monitors Page Changes**: Uses a MutationObserver to detect when new content loads (Pinterest's SPA navigation)
2. **Brings Images Forward**: Sets high z-index values to ensure images appear above any overlays
3. **Handles Events**: Attaches event listeners to image containers for mouse interactions
4. **Prevents Event Blocking**: Stops Pinterest's scripts from intercepting right-click events

## Supported Sites

The extension works on Pinterest pin pages across multiple domains:

- pinterest.com
- pinterest.co.uk
- pinterest.ca
- pinterest.de
- pinterest.fr
- pinterest.jp
- pinterest.com.au
- pinterest.it
- pinterest.es
- pinterest.in

## Usage

1. Navigate to any Pinterest pin page
2. The extension will automatically remove any login overlays
3. Right-click on images to save them directly
4. Scroll and interact with the page normally

## Version History

- **v1.2**: Enhanced SPA (Single Page App) navigation support and improved image detection
- **v1.1**: Added multi-domain support
- **v1.0**: Initial release with basic overlay removal

## Author

Created by Coding Partner

## License

This project is open source and available under the MIT License.
