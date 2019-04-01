export const generateTripPointsTitle = (points) => {
  return points
    .map((item) => item.destination.name)
    .splice(0, 4) // todo тут лучше slice
    .join(`&nbsp;&mdash;&nbsp;`);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const removeFromArray = (array, item) => {
  const index = array.findIndex((it) => it === item);
  array.splice(index, 1);
};

export const updateObject = (oldObject, newObject) => {
  // todo посмотри на Object.assign
  Object.keys(newObject).forEach((key) => {
    oldObject[key] = newObject[key];
  });
};

export const disableForm = (form, action = true) => {
  const inputs = form.querySelectorAll(`input`);
  const buttons = form.querySelectorAll(`button`);

  disableElements(inputs, action);
  disableElements(buttons, action);
};

const disableElements = (elements, action) => {
  Array.from(elements).forEach((item) => {
    return (action) ? // todo тут лучше явно if написать
      item.setAttribute(`disabled`, `disabled`) :
      item.removeAttribute(`disabled`);
  });
};

export const errorBorder = (none, action = true) => { // todo функция просит глагол
  none.style.border = action ? `1px solid red` : `none`;
};
