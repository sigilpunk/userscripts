// ==UserScript==
// @name        CompTIA Theme
// @namespace   Violentmonkey Scripts
// @match       https://labsimapp.testout.com/v6_0_675/index.html*
// @grant       none
// @version     1.0
// @author      sigilpunk
// @description 4/29/2025, 11:58:38 AM
// ==/UserScript==

let injectedStyle = document.createElement("style")
injectedStyle.textContent = `
.to-navbar {
  background: #0e0e0e;
}
ul.to-nav.column > li.flex-column {
  border: 2px solid #fff4;
  border-radius: 7px;
  margin: 5px;
}
.to-accordion .to-accordion-section-header button.to-accordion-expander {
  background: #00000008
}

.drawer .drawer-body {
  background: #0000
}

div.to-col:nth-child(1) {
  background: #1f1f1f;
}

.drawer-body * {
  color: #fff !important
}

.to-filters {
  display: none;
}

.drawer-header {
  background: #0000;
  box-shadow: 5px 5px 10px #0003;
}



`
// h2.to-text {
//   color: #fff;
// }
// document.querySelector(".to-filters").remove()
document.head.appendChild(injectedStyle)
