// ==UserScript==
// @name        Shrink Question Box
// @namespace   Violentmonkey Scripts
// @match       https://mylabmastering.pearson.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/18/2024, 8:21:59 PM
// ==/UserScript==
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElm('#introcell').then((elm) => {
    elm.setAttribute("style", "height=20% important!")
});