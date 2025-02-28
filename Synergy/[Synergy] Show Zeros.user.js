// ==UserScript==
// @name        [Synergy] Show Zeros
// @namespace   Violentmonkey Scripts
// @match       https://synergypvue.kentwoodps.org/PXP2_Gradebook.aspx*
// @grant       none
// @require     https://code.jquery.com/jquery-3.7.1.min.js
// @require     https://raw.githubusercontent.com/brandonaaron/livequery/refs/heads/master/jquery.livequery.min.js
// @version     1.0
// @author      -
// @description 10/7/2024, 1:45:54 PM
// ==/UserScript==

const getZeros = function() {
  console.debug("getZeros() called")
  let numZeros = 0;
  $(document).livequery(".col-md-9", function(){
    let itemBottoms = document.querySelectorAll(".item-bottom:not([data-bind])")
    for(var itemBottom of itemBottoms){
      console.debug(itemBottom.innerText)
      if(itemBottom.innerText === "0" || itemBottom.innerText === "0\nMissing"){
        console.debug(`Found zero in ${itemBottom}`)
        numZeros += 1;
      } else {
        console.debug("Not a zero")
      }
    }
  });
  return numZeros;
}

let infoCard;
let zeros;
$(document).livequery(".card-row", function(cardRow) {
  console.debug("Done waiting for .card-row")
  zeros = getZeros();
  console.debug("Called getZeros() from cardRow livequery")
  infoCard = cardRow.querySelector("div.course-info-card").cloneNode(true);
  console.debug("Cloned card")
  infoCard.querySelector("h3").innerText = `${zeros}`
  console.debug(`Changed card h3 to ${zeros}`)
  infoCard.querySelector("h4").innerText = "Assignments Marked as Zero"
  console.debug(`Changed card h4 to Assignments Marked as Zero`)
  cardRow.appendChild(infoCard);
  console.debug("Appended card to cardRow")
});
