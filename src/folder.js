'use strict';

import { makeElement } from "./makeElement.js";

const textarea = document.querySelector(".textarea");
const btn = document.querySelector(".btn");
const history = document.querySelector(".history");
const historyWrapper = document.querySelector(".historyWrapper");


const historyArray = [
  {folderName: "F1", content: [{id: 1, text: "1"}, {id: 2, text: "2"}]},
  {folderName: "F2", content: [{id: 1, text: "1"}, {id: 2, text: "2"}]},
];

let transHistoryArray = historyArray;

// text 화면에 추가해주는 함수
function displayText(text, id) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const button2 = document.createElement("button");
  span.innerText = text;
  li.appendChild(span);


  button.innerText = "💡";
  li.appendChild(button);
  button.addEventListener('click', () => playText(text));

  button2.innerText = "❌";
  li.appendChild(button2);
  button2.addEventListener('click', () => deleteText(id));

  li.setAttribute("date-set", id);
  history.appendChild(li);
}

function spreadHistory() {
  transHistoryArray.map((value) => {
    // section > div > button / span (text)
    const section = makeElement('section', 'folderWrapper');
    const div = makeElement("div", 'iconWrapper');
    const button = makeElement("button", 'folderIcon', "", {
      eventType: 'click',
      func: (element) => element.classList.toggle('close')
    });
    const span = makeElement("span", 'folderName', value.folderName);
    section.appendChild(div);
    div.appendChild(button);
    div.appendChild(span);
    historyWrapper.appendChild(section);
    console.log(value);
  });
}


spreadHistory();
