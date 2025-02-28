// ==UserScript==
// @name        Search on Google [Stealth] [Forms]
// @namespace   Violentmonkey Scripts
// @match       https://docs.google.com/forms/*/viewform*
// @grant       none
// @version     1.0
// @author      -
// @require     https://code.jquery.com/jquery-3.7.1.slim.min.js
// @description 12/19/2024, 9:06:27 AM
// ==/UserScript==

const googleLogo = document.createElement("img")
googleLogo.setAttribute("src", "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png")
googleLogo.style.width = "15px"

$("form div[role=list]").ready(() => {
  const qPanels = document.querySelector("form div[role=list]").childNodes
  qPanels.forEach((e) => {
    let question = e.querySelector("div[role=heading]").innerText
    question = question.replace("*", "").replaceAll("/ /", "%20")
      let searchAnchor = document.createElement("a")
      let searchUrl = `https://www.google.com/search?q=${question}`
      searchAnchor.setAttribute("href", searchUrl)
      searchAnchor.setAttribute("target", "_blank")
      searchAnchor.setAttribute("title", "Search Google")
      searchAnchor.append(googleLogo.cloneNode())
      let bar = e.querySelector(".z12JJ")
      if(bar){
        bar.appendChild(searchAnchor)
      } else {
        let bar = e.querySelector(".M4DNQ")
        if(bar){
          bar.appendChild(searchAnchor)
        }
      }
  });
});