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
