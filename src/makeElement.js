'use strict';

function makeElement(tagName, className = null, textContent, event) {
  const element = document.createElement(tagName);
  element.className = className;
  if (textContent) {
    element.textContent = textContent;
  }
  if (event) {
    element.addEventListener(event.eventType, () => event.func(element));
  }
  return element;
};

export default makeElement;
