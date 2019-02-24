import {dataFilters} from './data';
import {getRandomInteger, clearNode} from './util';
import getFilterItem from './get-filter-item';
import getTripPointItem from './get-trip-point-item';

const tripFilterElement = document.querySelector(`.trip-filter`);
const tripDayItemsElement = document.querySelector(`.trip-day__items`);

const getAllFilters = (filters) => {
  return filters.map((item) => getFilterItem(item));
};

const getAllTripPoints = (pointCount = 7) => {
  const points = new Array(pointCount);
  return points
    .fill()
    .map(() => getTripPointItem());
};

tripFilterElement.addEventListener(`click`, (evt) => {
  const pointCount = getRandomInteger(1, 10);
  if (evt.target.tagName === `INPUT`) {
    clearNode(tripDayItemsElement);
    tripDayItemsElement.insertAdjacentHTML(`beforeend`, getAllTripPoints(pointCount).join(``));
  }
});

tripFilterElement.insertAdjacentHTML(`beforeend`, getAllFilters(dataFilters).join(``));
tripDayItemsElement.insertAdjacentHTML(`beforeend`, getAllTripPoints().join(``));
