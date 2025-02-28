// ==UserScript==
// @name        Edfixes
// @namespace   Violentmonkey Scripts
// @match       https://r04.core.learn.edgenuity.com/player/*
// @grant       none
// @version     0.1
// @author      sudo-matcha
// @icon        https://imgur.com/iZufl7T.png
// @description 1/16/2025, 2:06:33 AM
// ==/UserScript==

let iconURL = "https://imgur.com/iZufl7T.png";
let toastFontSize = 12;

function showToast(message, duration = 3000, backgroundColor = "#333355aa") {
	// Create a div for the toast
	const toast = document.createElement("div");
	toast.innerHTML = `<img src="${iconURL}" style="width: ${toastFontSize+5}px; margin: 5px;">`;
	toast.innerHTML += message;

	// Set up base styling
	toast.style.position = "fixed";
	toast.style.bottom = "-100px"; // Start off-screen
	toast.style.left = "50%";
	toast.style.transform = "translateX(-50%)";
	toast.style.backgroundColor = backgroundColor;
	toast.style.color = "#fff";
	toast.style.padding = "10px 20px";
	toast.style.border = "solid 1px #3232cc";
	// toast.style.borderColor = "#00007c"
	toast.style.borderRadius = "15px";
	toast.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
	toast.style.fontSize = `${toastFontSize}px`;
	toast.style.zIndex = "10000";
	toast.style.opacity = "0";
	toast.style.transition = "bottom 0.6s cubic-bezier(0.25, 1.3, 0.5, 1), opacity 0.3s";

	// Append the toast to the document body
	document.body.appendChild(toast);

	// Animate the toast: slide in and bounce
	setTimeout(() => {
		toast.style.opacity = "1";
		toast.style.bottom = "20px"; // Final position after flying in
	}, 10);

	// Remove the toast after the specified duration
	setTimeout(() => {
		toast.style.opacity = "0";
		toast.style.bottom = "-100px"; // Fly out downwards
		setTimeout(() => {
			toast.remove();
		}, 300);
	}, duration);
}

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

try {
	document.querySelector("ul.toolbar").remove();
} catch {}
// document.querySelector("a.footnav.goRight.disabled > thspan").style.color = "#555"

// Auto-skip videos
let stageFrame;
iFrameNotify.listen("ChildFrameLoaded", (e) => {
	// showToast(`<span style="font-family:monospace">iFrameNotify</span> event captured!`, 3000)
	stageFrame = e.source;
	showToast(`<span style="font-family:monospace">stageFrame.API</span> captured!`, 3000)
	stageFrame.API.E2020.freeMovement = true;

	// disbaled to disallow user from scrubbing ahead in the video. this would be cool if it let you skip the video but it doesn't :(
	// stageFrame.API.E2020.reviewMode = true;

	// this just breaks stuff, good idea tho
	// stageFrame.API.Frame.isComplete = function(){return true};

	console.log("hello vro");
	// stageFrame.API.FrameChain.openFrame(stageFrame.API.FrameChain.currentFrame);
	sleep(750).then(() => {
		let videoTime = stageFrame.API.Video.totalDuration - stageFrame.API.Video.maxTimeViewed;
		videoTime = stageFrame.API.Video.totalDuration - stageFrame.API.Video.maxTimeViewed;
		console.log(`Sleeping for ${videoTime} sec...`);
		sleep(videoTime * 1000).then(() => {
			console.log("Done!");
			stageFrame.API.FrameChain.nextFrame();
		});
	});
});
