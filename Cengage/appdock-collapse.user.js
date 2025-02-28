// ==UserScript==
// @name        AppDock Collapse
// @namespace   Violentmonkey Scripts
// @match       https://ng.cengage.com/static/nb/ui/evo/*
// @grant       none
// @version     1.0
// @author      -
// @description 1/14/2025, 9:55:17 AM
// @require     https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://raw.githubusercontent.com/brandonaaron/livequery/refs/heads/master/jquery.livequery.js
// ==/UserScript==

$(document).livequery(".AppDock", (dock)=>{
  console.log(dock)
})
