import store from './store/store';
import {Message} from './data';

const tripDayItemsElement = document.querySelector(`.trip-day__items`);
const tripPointsElement = document.querySelector(`.trip__points`);

export const generateTripPointsTitle = (points) => {
  return points
    .map((item) => {
      return item.destination.name;
    })
    .slice(0, 4)
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
  Object.assign(oldObject, newObject);
};

export const disableForm = (form, action = true) => {
  const inputs = form.querySelectorAll(`input`);
  const buttons = form.querySelectorAll(`button`);

  disableElements(inputs, action);
  disableElements(buttons, action);
};

const disableElements = (elements, action) => {
  Array.from(elements).forEach((item) => {
    item.removeAttribute(`disabled`);
    if (action) {
      item.setAttribute(`disabled`, `disabled`);
    }
  });
};

export const showLoadingError = () => {
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;color:red;">${Message.LOADING_FAILURE_TEXT}</h1>`;
};

export const renderCitiesTitle = () => {
  tripPointsElement.insertAdjacentHTML(`beforeend`, generateTripPointsTitle(store.state.points));
};
