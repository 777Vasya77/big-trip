import {cities, dataFilters, tripPoints} from './data';
import {generateTripPointsTitle, removeFromArray} from './util';
import moment from 'moment';
import moneyChart from './money-chart';
import transportChart from './transport-chart';
import Point from './point';
import PointEdit from './point-edit';
import Filter from './filter';
import API from './api';
import ModelPoint from "./model-point";

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const FUTURE_FILTER = `future`;
const PAST_FILTER = `past`;

const tripFilterElement = document.querySelector(`.trip-filter`);
const tripDayItemsElement = document.querySelector(`.trip-day__items`);
const tripPointsElement = document.querySelector(`.trip__points`);
const statsSwitcher = document.querySelector(`a[href*=stat]`);
const tableSwitcher = document.querySelector(`a[href*=table]`);
const table = document.querySelector(`#table`);
const stats = document.querySelector(`#stats`);

statsSwitcher.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  table.classList.add(`visually-hidden`);
  stats.classList.remove(`visually-hidden`);
});

tableSwitcher.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  stats.classList.add(`visually-hidden`);
  table.classList.remove(`visually-hidden`);
});

const getFilters = (filters) => {
  const fragment = document.createDocumentFragment();

  filters.forEach((item) => {
    const filter = new Filter(item);
    filter.render();

    filter.onFilter = () => {
      switch (filter.name) {
        case FUTURE_FILTER:
          renderTripPoints(
              tripPoints.filter((it) => it.date > moment().unix())
          );
          return;

        case PAST_FILTER:
          renderTripPoints(
              tripPoints.filter((it) => it.date < moment().unix())
          );
          return;

        default:
          renderTripPoints();
          return;
      }
    };

    fragment.appendChild(filter.element);
  });

  return fragment;
};

const getTripPoints = (points) => {
  const fragment = document.createDocumentFragment();

  points.forEach((item) => {
    const point = new Point(item);
    const pointEdit = new PointEdit(item);

    const renderPointComponent = (newData = item) => {
      item = newData;

      point.update(item);
      point.render();
      tripDayItemsElement.replaceChild(point.element, pointEdit.element);
      pointEdit.unrender();
    };
    const renderPointEditComponent = () => {
      pointEdit.update(item);
      pointEdit.render();
      tripDayItemsElement.replaceChild(pointEdit.element, point.element);
      point.unrender();
    };

    point.onEdit = renderPointEditComponent;
    pointEdit.onCancel = renderPointComponent;

    pointEdit.onSubmit = (newData) => {
      renderPointComponent(newData);
    };

    pointEdit.onDelete = () => {
      removeFromArray(tripPoints, item);
      pointEdit.unrender();
    };

    pointEdit.onFavorite = () => {
      item.isFavorite = !item.isFavorite;
    };

    point.render();
    fragment.appendChild(point.element);
  });

  return fragment;
};

const renderTripPoints = (points = tripPoints) => {
  tripDayItemsElement.innerHTML = ``;
  tripDayItemsElement.appendChild(getTripPoints(points));
};

const renderFilters = () => {
  tripFilterElement.appendChild(getFilters(dataFilters));
};

tripPointsElement.insertAdjacentHTML(`beforeend`, generateTripPointsTitle(cities));

renderFilters();
// renderTripPoints();

moneyChart.render();
transportChart.render();

api.get(`points`)
  .then((points) => ModelPoint.parsePoints(points))
  .then((points) => renderTripPoints(points));
