// ==UserScript==
// @name        i forgot my glasses :(
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      sudo-matcha
// @require     https://code.jquery.com/jquery-3.7.1.slim.min.js
// @description damn its kinda blurry
// ==/UserScript==

$("body").css({
    filter: "blur(1px)"
});
