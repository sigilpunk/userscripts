// ==UserScript==
// @name        Show Progress
// @namespace   Violentmonkey Scripts
// @match       https://docs.google.com/forms/*
// @grant       none
// @version     0.1.4
// @author      sudo-matcha
// @description 2/26/2025, 2:50:45 PM
// ==/UserScript==

let questionType = {
	"oyXaNc": "multipleChoice",
	"Y6Myld": "checkboxes",
	"vQES8d": "dropdown",
	"AgroKb": "text",
	"e12QUd": "grid"
}

let hexToRgb = function(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

let rgbToHexString = function(rgb) {
	var [r, g, b] = rgb;
	return "#" + (1 << 24 | r << 16 | g << 8 | b)
		.toString(16)
		.slice(1);
}

let rgbToHex = function(rgb) {
	var [r, g, b] = rgb;
	return (1 << 24 | r << 16 | g << 8 | b)
}

let hexToHexString = function(hex) {
	return '#' + hex.toString(16);
}

let hexBrightness = function(hex) {
	if(Array.from(hex)[0] != "#") {
		hex = hexToHexString(hex);
	}
	let rgb = hexToRgb(hex)
	return (0.21 * rgb.r + 0.72 * rgb.g + 0.07 * rgb.b) / 255;
}


let bottomNode = document.querySelector("div.ZQKQlb")
	.parentNode;
let progressDiv = document.createElement("div");
let progressFill = document.createElement("div");
let progressSpan = document.createElement("span");
let formAccentColor = window.getComputedStyle(document.querySelector(".RVEQke"))
	.backgroundColor;
let fg = "#fff"
let bodyBg = window.getComputedStyle(document.body)
	.backgroundColor
bodyBg = bodyBg.slice(4, bodyBg.length - 1)
	.split(", ");
let bg = rgbToHex(bodyBg);
if(hexBrightness(rgbToHexString(bodyBg)) >= 0.5) {
	// darken color
	bg = (bg & 0xfefefe) >> 1;
} else {
	// lighten color
	bg = (bg & 0x7f7f7f) << 1;
}
bg = hexToHexString(bg);
if(hexBrightness(rgbToHexString(formAccentColor)) > 0.5) {
	fg = "#fff"
} else {
	fg = "#000"
}
progressDiv.setAttribute("id", "progress");
progressFill.setAttribute("id", "progress-fill");
progressDiv.appendChild(progressFill);
progressDiv.appendChild(progressSpan);
bottomNode.appendChild(progressDiv);
let injectedStyle = document.createElement("style");
injectedStyle.textContent = `
:root {
  --bg-color: ${bg}dd;
  --fg-color: ${fg};
  --green: #88ff88ff;
  /* --fill-color: #30afe6dd; */
  --fill-color: ${formAccentColor};
  --complete-animation-duration: 300ms;
  --progress-animation-duration: 500ms;
}
/* Define the keyframes for toggling to green */
@keyframes toGreen {
  from {
    background-color: var(--fill-color);
    color: var(--fg-color);
  }
  to {
    background-color: var(--green);
    color: #000000;
  }
}

/* Define the keyframes for toggling back from green */
@keyframes fromGreen {
  from {
    background-color: var(--green);
    color: #000000;
  }
  to {
    background-color: var(--fill-color);
    color: var(--fg-color);
  }
}

/* Default styling for the progress element */
#progress {

  background-color: var(--bg-color);
  color: var(--fg-color);
}

/* Class to apply when toggling to green */
#progress-fill.to-green {
  animation-name: toGreen;
}

/* Class to apply when toggling from green */
#progress-fill.from-green {
  animation-name: fromGreen;
}

div#progress {
    margin: 2%;
    bottom: 0;
    right: 0;
    font-weight: bold;
    overflow: hidden;
    padding: 15px;
    z-index: 999;
    width: 100px;
    border-radius: 15px;
    position: fixed;
    backdrop-filter: blur(10px);
    box-shadow: 0px 0px 10px #00000040;
}

div#progress:hover {
    cursor: pointer;
}
div#progress-fill {
    z-index: 998;
    background-color: var(--fill-color);
    float: left;
    width: 0%;
    height: 100%;
    position: absolute;
    margin: -15px;
    transition: width var(--progress-animation-duration) cubic-bezier(0.240, 0.540, 0.155, 0.985);
    /* Animation settings */
    animation-duration: var(--complete-animation-duration);
    animation-fill-mode: forwards;
    cursor: pointer;
}
div#progress span {
    position: relative;
    z-index: 1000;
    transition: width var(--progress-animation-duration) cubic-bezier(0.240, 0.540, 0.155, 0.985);
}

`
document.head.appendChild(injectedStyle);

function updateProgressState(state) {
	// Remove any existing animation classes
	progressFill.classList.remove('to-green', 'from-green');

	if(state) {
		// Apply the toGreen animation
		progressFill.classList.add('to-green');
		progressSpan.style.color = "#000"
	} else {
		// Apply the fromGreen animation
		progressFill.classList.add('from-green');
		// progressSpan.style.color = "var(--fg-color)"
	}
}

function updateProgressFill(completions, total) {
	// Set the width with percentage - the transition is handled by CSS
	progressFill.style.width = `${(completions/total)*100}%`;
}

function updateTextColor(completions, total) {
	// Calculate the width percentage of the progress fill
	let fillPercentage = progressFill.offsetWidth - 15;

	// If progress is less than 100%, set the text color based on position
	if(fillPercentage < 100) {
		// Use a background clip and gradient to make text different colors
		progressSpan.style.backgroundImage = `linear-gradient(to right,
                                         var(--fg-color) ${fillPercentage}px,
                                         #fff ${fillPercentage}px)`;
		progressSpan.style.webkitBackgroundClip = "text";
		progressSpan.style.backgroundClip = "text";
		progressSpan.style.color = "transparent";
		// progressSpan.style.textShadow = "0px 0px 2px rgba(0,0,0,0.3)";
	}
}

async function update() {
	await new Promise(r => setTimeout(r, 200));
	completions = 0
	for(const question of questions) {
		let isComplete = checkComplete(question);
		if(isComplete) {
			completions++
		}
	}
	progressSpan.innerText = `${completions} / ${questions.length}`;
	updateProgressFill(completions, questions.length);
	updateTextColor(completions, questions.length); // Add this line
	progressFill.style.width = `${(completions/questions.length)*100}%`
	if(completions === questions.length) {
		updateProgressState(true);
	} else {
		updateProgressState(false);
	}
	console.log("update!")
}

let checkComplete = function(q) {
	if(q.previousSibling.className != "z12JJ") {
		return undefined
	}
	let found = false;
	switch(questionType[q.className]) {
		case "multipleChoice":
			var options = Array.from(document.querySelectorAll("div.SG0AAe div.nWQGrd.zwllIb label"));
			for(var o of options) {
				if(Array.from(o.classList)
					.includes("N2RpBe")) {
					found = true;
					break;
				}
			}
			break;
		case "checkboxes":
			var options = Array.from(document.querySelectorAll("div.Y6Myld label"));
			for(var o of options) {
				if(Array.from(o.classList)
					.includes("N2RpBe")) {
					found = true;
					break;
				}
			}
			break;
		case "dropdown":
			var options = Array.from(document.querySelectorAll("div.vQES8d div.OIC90c"));
			for(var o of options) {
				if(o.getAttribute("aria-selected") === "true") {
					found = true;
					break;
				}
			}
			break;
		case "text":
			if(q.querySelector("input")) {
				if(q.querySelector("input")
					.getAttribute("data-initial-value") != "") {
					found = true;
					break;
				}
			} else if(q.querySelector("textarea")) {
				if(q.querySelector("textarea")
					.getAttribute("data-initial-value") != "") {
					found = true;
					break;
				}
			}
			break;
		case "grid":
			var options = q.querySelectorAll('div.V4d7Ke div[jscontroller="D8e5bc"],div[jscontroller="EcW08c"]')
			for(var o of options) {
				if(o.getAttribute("aria-checked") === "true") {
					found = true;
					break;
				}
			}
	}
	if(found) {
		return true;
	} else {
		return false;
	}
}

// let questions = Array.from(document.querySelectorAll(".z12JJ")).map((e)=>{e.nextSibling});
let questions = new Array();
let completions = 0;
Array.from(document.querySelectorAll(".Qr7Oae .z12JJ"))
	.forEach((e) => {
		questions.push(e.nextSibling)
	});
progressSpan.innerText = `0 / ${questions.length}`;

let observer = new MutationObserver(update);
// let observer = new MutationObserver((e)=>{});
observer.observe(document.querySelector("form")
	.parentNode.parentNode, {
		childList: true,
		subtree: true,
	})

document.querySelector("div#progress")
	.addEventListener("click", update)
