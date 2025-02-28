// ==UserScript==
// @name        challenge mode
// @namespace   Violentmonkey Scripts
// @match       https://*.*/*
// @grant       none
// @version     1.0
// @author      -
// @description 12/9/2024, 1:39:02 PM
// ==/UserScript==
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes what {
    0% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    25% {
      transform: rotateX(95deg) rotateY(75deg) rotateZ(180deg);
    }
    50% {
      transform: rotateX(210deg) rotateY(150deg) rotateZ(360deg);
    }
    75% {
      transform: rotateX(95deg) rotateY(75deg) rotateZ(180deg);
    }
    100% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
  }

  body {
    animation: what 40s ease infinite;
    transform: scale3d(500, 500, 500);
  }
`;
document.head.appendChild(styleSheet);
