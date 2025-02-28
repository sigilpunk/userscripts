// ==UserScript==
// @name        [Synergy] Mark Advantage
// @namespace   Violentmonkey Scripts
// @match       https://synergypvue.kentwoodps.org/PXP2_Gradebook.aspx*
// @grant       none
// @require     https://raw.githubusercontent.com/brandonaaron/livequery/refs/heads/master/jquery.livequery.min.js
// @version     1.0
// @run-at      document-idle
// @author      -
// @description 10/7/2024, 1:45:54 PM
// ==/UserScript==

const waitForElementToExist = (selector) => {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  });
}

const getAssignments = () => {
  console.debug("called getAssignments()")
  let scores = new Array();
  let calcs = PXP.Actions.GB.AssignmentsGridWhatIfCalcObject;
  let classGrade = calcs.classGrades()[0];
  return calcs.assignments();
}

waitForElementToExist("div.col-md-9").then(element => {
  setTimeout(() => {let assignments = getAssignments();}, 1000)
});

