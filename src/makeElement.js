'use strict';

export function makeElement(tagName, className, textContent, event) {
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
