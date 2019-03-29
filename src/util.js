export const generateTripPointsTitle = (array) => {
  return array.join(`&nbsp;&mdash;&nbsp;`);
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
    return (action) ?
      item.setAttribute(`disabled`, `disabled`) :
      item.removeAttribute(`disabled`);
  });
};

export const errorBorder = (none, action = true) => {
  none.style.border = action ? `1px solid red` : `none`;
};
