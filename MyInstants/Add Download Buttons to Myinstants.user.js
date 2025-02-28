// ==UserScript==
// @name        Add Download Buttons to Myinstants
// @namespace   Violentmonkey Scripts
// @match       https://www.myinstants.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 9/9/2024, 11:37:49 PM
// ==/UserScript==

function updateDownloadButtons() {
    var container = document.getElementById("instants_container");
    if (!container) return;  // Exit if the container is not found

    var instants = container.getElementsByClassName("instant");
    var shareboxes = container.getElementsByClassName("result-page-instant-sharebox");

    for (var i = 0; i < shareboxes.length; i++) {
        try {
            var instantName = instants[i].innerText.trim();
            var buttons = shareboxes[i].getElementsByClassName("instant-action-button");
            var dlButton = buttons[2];
            var instantUrl = dlButton.getAttribute("onclick");

            // Process and clean the instant URL
            instantUrl = "https://www.myinstants.com" + instantUrl.split(",")[2].replaceAll("'", "").trim();
            var instantFilename = instantUrl.split("/").pop()

            // Modify the download button attributes
            dlButton.removeAttribute("title");
            dlButton.setAttribute("title", `Download '${instantName}'`);
            dlButton.removeAttribute("style");
            dlButton.removeAttribute("onclick");

            // Create an anchor element to trigger download
            var a = document.createElement("a");
            a.href = instantUrl;
            a.download = instantFilename;  // Set download attribute with a filename
            a.title = `Download '${instantName}'`
            dlButton.parentNode.replaceChild(a, dlButton); // Replace button with anchor

            // Modify the inner image element of the new download link
            var img = dlButton.firstElementChild;
            img.removeAttribute("style");
            img.setAttribute("style", "scale: 120%");
            img.removeAttribute("src");
            img.setAttribute("src", "https://www.pngall.com/wp-content/uploads/2/Download-Button-PNG-File.png");
            a.appendChild(img);
        } catch (error) {
            // Silently catch errors to avoid breaking the loop
        }
    }
}

// Use MutationObserver to detect changes in the instants container
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
            // Re-run the script when new content is added to or removed from the container
            updateDownloadButtons();
        }
    });
});

// Start observing the container for changes
var container = document.getElementById("instants_container");
if (container) {
    // Observe changes in the child elements (instants and shareboxes) of the container
    observer.observe(container, { childList: true, subtree: true });
}

// Run the script initially in case content is already loaded
updateDownloadButtons();
