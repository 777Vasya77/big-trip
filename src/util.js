import store from './store/store';

const tripTotalCostElement = document.querySelector(`.trip__total-cost`);

export const generateTripPointsTitle = (points) => {
  return points
    .map((item) => item.destination.name)
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

export const setErrorBorder = (none, action = true) => {
  none.style.border = action ? `1px solid red` : `none`;
};

export const countTotalPrice = (points) => {
  const pointsPrice = Math.round(points.reduce((prev, cur) => prev + +cur.price, 0));
  const offers = [].concat(...points.map((item) => item.offers));
  const offersPrice = offers.filter((item) => item.accepted).reduce((prev, cur) => prev + cur.price, 0);

  return pointsPrice + offersPrice;
};

export const setTotalPrice = () => {
  tripTotalCostElement.innerText = `€ ${countTotalPrice(store.state.points)}`;
};
