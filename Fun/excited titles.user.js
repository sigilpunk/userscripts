// ==UserScript==
// @name        excited titles
// @namespace   Violentmonkey Scripts
// @match       *://*.*/*
// @grant       none
// @version     1.0
// @author      -
// @description 12/15/2024, 3:47:58 PM
// ==/UserScript==


var orig = document.title
document.title = document.title.toLowerCase() + " !!"
console.debug(document.title)