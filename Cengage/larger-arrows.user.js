// ==UserScript==
// @name        [Cengage] Larger Arrows
// @namespace   Violentmonkey Scripts
// @match       https://cnow.apps.ng.cengage.com/ilrn/takeAssignment/takeAssignmentMain.do*
// @grant       none
// @version     0.1
// @author      sudo-matcha
// @description 2/6/2025, 10:48:08 AM
// ==/UserScript==

document.querySelectorAll("img.inlineIcon").forEach((e) => {
	if(e.getAttribute("alt") === "Next") {
		e.setAttribute("src", "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+DQo8c3ZnIGZpbGw9IiMwMDAwMDAiIGhlaWdodD0iODAwcHgiIHdpZHRoPSI4MDBweCIgdmVyc2lvbj0iMS4xIiBpZD0iSWNvbnMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNMTYsMkM4LjMsMiwyLDguMywyLDE2czYuMywxNCwxNCwxNHMxNC02LjMsMTQtMTRTMjMuNywyLDE2LDJ6IE0xOC45LDE2LjdsLTQuMiw0LjJjLTAuMiwwLjItMC41LDAuMy0wLjcsMC4zICBzLTAuNS0wLjEtMC43LTAuM2MtMC40LTAuNC0wLjQtMSwwLTEuNGwzLjUtMy41bC0zLjUtMy41Yy0wLjQtMC40LTAuNC0xLDAtMS40czEtMC40LDEuNCwwbDQuMiw0LjJDMTkuMywxNS43LDE5LjMsMTYuMywxOC45LDE2Ljd6ICAiLz4NCjwvc3ZnPg==")
	} else {
		e.setAttribute("src", "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+DQo8c3ZnIGZpbGw9IiMwMDAwMDAiIGhlaWdodD0iODAwcHgiIHdpZHRoPSI4MDBweCIgdmVyc2lvbj0iMS4xIiBpZD0iSWNvbnMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNMTYsMkM4LjMsMiwyLDguMywyLDE2czYuMywxNCwxNCwxNHMxNC02LjMsMTQtMTRTMjMuNywyLDE2LDJ6IE0xOC43LDE5LjVjMC40LDAuNCwwLjQsMSwwLDEuNGMtMC4yLDAuMi0wLjUsMC4zLTAuNywwLjMgIHMtMC41LTAuMS0wLjctMC4zbC00LjItNC4yYy0wLjQtMC40LTAuNC0xLDAtMS40bDQuMi00LjJjMC40LTAuNCwxLTAuNCwxLjQsMHMwLjQsMSwwLDEuNEwxNS4yLDE2TDE4LjcsMTkuNXoiLz4NCjwvc3ZnPg==")
	}
	e.style.height = "20px";
	e.style.width = "auto";
});
