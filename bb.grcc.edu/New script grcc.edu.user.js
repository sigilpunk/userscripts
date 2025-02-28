// ==UserScript==
// @name        New script grcc.edu
// @namespace   Violentmonkey Scripts
// @match       https://bb.grcc.edu/ultra/courses/_17688933_1/cl/outline*
// @grant       none
// @version     1.0
// @require     https://code.jquery.com/jquery-3.7.1.min.js
// @author      -
// @description 12/15/2024, 2:51:50 AM
// ==/UserScript==

function updatePercents(){
    Array.from(document.querySelectorAll(".cell.grade")).slice(1,-1).forEach((div) => {
      var grade = div.querySelector(".grade").innerText.replace("-", "0")
      var total = div.querySelector(".pointsPossible").innerText.replace("\/","")
      var percent = (Number(grade)/Number(total)) * 100
      var percentSpan = document.createElement("span")
      percentSpan.innerText = `${percent}%`
      percentSpan.classList.add("pointsPossible")
      percentSpan.classList.add("pointsPossible percentage")
      div.querySelectorAll(".percentage").forEach((e) => {
        e.remove()
      });
      div.appendChild(percentSpan)
  });
}

$("#grades_wrapper").ready(updatePercents())