// const KAKAOAK_API_KEY = config.apikey;

const enTransKr = document.querySelector(".enTransKr");

const textarea = document.querySelector(".textarea");
const btn = document.querySelector(".btn");
const history = document.querySelector(".history");

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

// Auto Increment 함수
function* infinity() {
  while (true) {
    yield ++lastId;
  }
}

// 히스토리에 추가해주는 함수
function addTransHistory(text) {
  const iter = infinity();
  const newInput = {id: iter.next().value, text: text.trim()};
  transHistoryArray.push(newInput);
  localStorage.setItem("items", JSON.stringify(transHistoryArray));
  displayText(text, newInput.id);
}

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

  history.appendChild(li);
}

// text 읽어주는 함수
function playText(text) {
  const URL = `https://tts-translate.kakao.com/read?format=mpeg&lang=en&txt=${text}`;
  const audioObj = new Audio(URL);
  audioObj.play();
}

// text 삭제
function deleteText(id) {
  const result = transHistoryArray.filter(item => item.id !== id);
  transHistoryArray = result;
  localStorage.setItem("items", JSON.stringify(transHistoryArray));
  window.location.reload();
}


// 전체 히스토리 삭제
function removeAllHistory()  {
  localStorage.clear();
  window.location.reload();
};

// 초기화면 뿌려주는 함수
function spreadHistory() {
  console.log(transHistoryArray);
  transHistoryArray.map(({text, id}) => {
    displayText(text, id);
  });
}

spreadHistory();

btn.addEventListener('click', () => translateEnToKr(textarea.value));
