// ==UserScript==
// @name        Players Circle Quiz Answerer
// @namespace   Violentmonkey Scripts
// @match       https://www.daddario.com/dashboard/learn-earn/*
// @grant       none
// @version     1.0
// @author      -
// @description 1/2/2025, 3:20:19 PM
// ==/UserScript==

const script = document.createElement("script")
script.textContent = `
  async function completeQuiz(){
    for(let page of document.querySelectorAll(".fsForm .fsPage")){
      let correctAnswer = page.querySelector("fieldset div input[value='1']")
      if(correctAnswer){
        correctAnswer.click()
      }
      await new Promise(r => setTimeout(r, 25));
    }
    document.querySelector(".fsForm").submit()
  }
`
document.head.appendChild(script)

let runButton = document.querySelector("button.fsNextButton").cloneNode()
runButton.innerText = "Answer All Questions"
runButton.style.marginLeft = "10px"
runButton.id = "runButton"
runButton.setAttribute("onclick", "completeQuiz()")
document.querySelector("button.fsNextButton").parentNode.appendChild(runButton)

document.querySelectorAll("fieldset div input[value='1']").forEach((input) => {
  input.parentNode.parentNode.setAttribute("style", "border: 3px solid rgb(245, 74, 72)")
});
