// text 화면에 추가해주는 함수
import makeElement from "./makeElement.js";
import { transHistoryArray } from "./index.js";

export function displayText(targetElement, text, id) {
  const li = makeElement('li');
  const span = makeElement('li', "", text);

  const speakBtn = makeElement('button', "", "🗣", {
    func: () => playText(text)
  });
  const deleteBtn = makeElement('button', "", "❌", {
    func: () => deleteText(id)
  });
  li.appendChild(span);
  li.appendChild(speakBtn);
  li.appendChild(deleteBtn);
  li.setAttribute("date-set", id);
  targetElement.appendChild(li);
}

// text 읽어주는 함수
function playText(text) {
  const URL = `https://tts-translate.kakao.com/read?format=mpeg&lang=en&txt=${text}`;
  const audioObj = new Audio(URL);
  audioObj.play();
}

// text 삭제
function deleteText(id) {
  transHistoryArray.forEach(item => {
    item.contentList = item.contentList.filter(item => item.id !== id);
  })
  localStorage.setItem("items", JSON.stringify(transHistoryArray));
  window.location.reload();
}

