'use strict';

// const KAKAOAK_API_KEY = config.apikey;

import makeElement from "./makeElement.js";

const enTransKr = document.querySelector(".enTransKr");

const textarea = document.querySelector(".textarea");
const btn = document.querySelector(".btn");
const history = document.querySelector(".history");
const historyWrapper = document.querySelector(".historyWrapper");

const historyArray = [
  {folderName: "F1", contentList: [{id: 1, text: "1"}, {id: 2, text: "2"}]},
  {folderName: "F2", contentList: [{id: 1, text: "1"}, {id: 2, text: "2"}]},
];

let transHistoryArray = getHistoryDataFromLocal();
let lastId = transHistoryArray[transHistoryArray.length - 1]?.id || 0;

// localStorage에서 기존 데이터 가지고 오기
function getHistoryDataFromLocal() {
  const items = JSON.parse(localStorage.getItem("items"));
  return items === null ? [] : items;
}

// 번역만 하는 함수
async function translateEnToKr(text) {
  // let response = await fetch(`https://dapi.kakao.com/v2/translation/translate?src_lang=en&target_lang=kr&query=${text}`, {
  //   method: 'POST',
  //   contentType: "application/x-www-form-urlencoded",
  //   headers: {
  //     "Authorization": `KakaoAK ${KAKAOAK_API_KEY}`
  //   },
  // });
  //
  // let result = await response.json();
  // enTransKr.textContent = result.translated_text[0][0];
  addTransHistory(text);
}

// 히스토리에 추가해주는 함수
function addTransHistory(text) {
  // TODO 이 구조를 바꾸어줘야겠군
  //   {folderName: "F1", content: [{id: 1, text: "1"}, {id: 2, text: "2"}]},
  const timestamp = Date.now();
  const newContent = {id: timestamp, text: text.trim()};
  if (transHistoryArray[0]?.folderName === undefined) {
    const newInput = {
      folderName: "none",
      contentList: [
        {...newContent}
      ],
    };
    transHistoryArray.push(newInput);
    console.log(transHistoryArray);
  } else {
    transHistoryArray[0].contentList.push({...newContent});
  }
  localStorage.setItem("items", JSON.stringify(transHistoryArray));
  console.log(historyWrapper);
  displayText(historyWrapper, text, newContent.id);
}

// text 화면에 추가해주는 함수
function displayText(targetElement, text, id) {
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


// 전체 히스토리 삭제
function removeAllHistory() {
  localStorage.clear();
  window.location.reload();
};

// 초기화면 뿌려주는 함수
function spreadHistory() {
  console.log(transHistoryArray);
  transHistoryArray.forEach((folder) => {
    // 폴더목록
    // section > div > button / span (text)
    const folderWrapper = makeElement('div', 'folderWrapper');
    const iconWrapper = makeElement("div", 'iconWrapper');
    const folderBtn = makeElement("button", 'folderIcon', "", {
      eventType: 'click',
      func: (element) => element.classList.toggle('close')
    });
    const folderName = makeElement("span", 'folderName', folder.folderName);
    folderWrapper.appendChild(iconWrapper);
    iconWrapper.appendChild(folderBtn);
    iconWrapper.appendChild(folderName);
    historyWrapper.appendChild(folderWrapper);

    // 컨텐츠들
    folder.contentList.forEach(({text, id}, index) => {
      if (index === 0) {
        const ul = makeElement('ul', 'content-list');
        displayText(ul, text, id);
        historyWrapper.appendChild(ul);
      } else {
        const ul = document.querySelector('.content-list');
        displayText(ul, text, id);
      }
    });
  });
}

spreadHistory();

btn.addEventListener('click', () => translateEnToKr(textarea.value));



