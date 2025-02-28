// ==UserScript==
// @name        Enable/Disable Profile Preview
// @namespace   Violentmonkey Scripts
// @match       https://www.audiotool.com/user/*
// @grant       none
// @version     1.0
// @author      -
// @description 12/8/2024, 10:47:28 PM
// @author      sudo-matcha
// @require     https://code.jquery.com/jquery-3.7.1.min.js
// @require     https://raw.githubusercontent.com/brandonaaron/livequery/refs/heads/master/jquery.livequery.min.js
// @icon        https://www.audiotool.com/favicon.ico
// ==/UserScript==


const styleSheet = document.createElement("style");
styleSheet.textContent  = `
  @keyframes hideAnim {
    0% {
      transform: scale(1);
      opacity: 1.0;
    }
    100% {
      transform: scale(0);
      opacity: 0.0;
    }
  }
`;
document.head.appendChild(styleSheet)

const hideHiddenTracks = function(){
  // document.querySelectorAll("._item._player.hidden").forEach((track) => {track.setAttribute("style","display: hidden !important")});
  document.querySelectorAll("._item._player.hidden").forEach((track) => {track.classList.add("really-hidden")});
}
const showHiddenTracks = function(){
  // document.querySelectorAll("._item._player.hidden").forEach((track) => {track.setAttribute("style","display: grid !important")});
  document.querySelectorAll("._item._player.hidden").forEach((track) => {track.classList.remove("really-hidden")});
}

showHiddenTracks()

const toggleViewButton = document.createElement("li")
const toggleViewAnchor = document.createElement("a")
toggleViewAnchor.classList.add("keep-scroll-pos")
toggleViewAnchor.innerText = "Hide Hidden"
toggleViewButton.classList.add("_filter")
toggleViewAnchor.setAttribute("id", "toggle-visibility")
toggleViewButton.appendChild(toggleViewAnchor)
$(document).livequery("ul._filters", (filters) => {
  filters.appendChild(toggleViewButton)
});

document.querySelector("a#toggle-visibility").addEventListener("click", (event) => {
  const parent = event.target.parentNode;
  if(Array.from(parent.classList).includes("selected")){
    parent.classList.remove("selected")
    showHiddenTracks();
  } else {
    parent.classList.add("selected")
    hideHiddenTracks();
  }
});

$(document).livequery("li.really-hidden", (e) => {
  e.style.display = "none"
  e.style.animation = "hideAnim 0.5s ease forward"
}, (e) => {
  e.style.display = "grid"
});