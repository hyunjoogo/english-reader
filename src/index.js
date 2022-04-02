'use strict';

// const KAKAOAK_API_KEY = config.apikey;

import makeElement from "./makeElement.js";
import { displayText } from "./displayText.js";

const enTransKr = document.querySelector(".enTransKr");

const textarea = document.querySelector(".textarea");
const btn = document.querySelector(".btn");
const history = document.querySelector(".history");
console.log('tkd');
const historyWrapper = document.querySelector(".historyWrapper");


export let transHistoryArray = getHistoryDataFromLocal();

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
  const timestamp = Date.now();
  const newContent = {id: timestamp, text: text.trim()};
  if (transHistoryArray[0]?.folderName === undefined) {
    const newInput = {folderName: "무제", contentList: [{...newContent}]};
    transHistoryArray.push(newInput);
  } else {
    transHistoryArray[0].contentList.push({...newContent});
  }
  localStorage.setItem("items", JSON.stringify(transHistoryArray));
  const list = document.querySelector('.content-list');
  displayText(list, text, newContent.id);
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
      func: (element) => {
        const list = document.querySelector('.content-list');
        list.classList.toggle('close');
        element.classList.toggle('close');
      }
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



