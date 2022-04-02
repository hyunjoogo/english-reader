'use strict';

// tagName : String : Html element tag Name
// className : String : 클래스 이름 => default = ""
// textContent? : String : 내부 글자
// event? : Object : 실행할 이벤트 =>
// { eventType : String , func : function(element) }
// eventType => default = "click"

function makeElement(tagName, className = "", textContent, event) {
  const element = document.createElement(tagName);
  element.className = className;
  if (textContent) {
    element.textContent = textContent;
  }
  if (event) {
    element.addEventListener(event.eventType = 'click', () => event.func(element));
  }
  return element;
};

export default makeElement;

