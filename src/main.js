import {cities, dataFilters, PointType} from './data';
import {generateTripPointsTitle, removeFromArray} from './util';
import moment from 'moment';
// import moneyChart from './money-chart';
// import transportChart from './transport-chart';
import Point from './point';
import PointEdit from './point-edit';
import Filter from './filter';
import store from './store';

const FUTURE_FILTER = `future`;
const PAST_FILTER = `past`;

const tripFilterElement = document.querySelector(`.trip-filter`);
const tripDayItemsElement = document.querySelector(`.trip-day__items`);
const tripPointsElement = document.querySelector(`.trip__points`);
const statsSwitcher = document.querySelector(`a[href*=stat]`);
const tableSwitcher = document.querySelector(`a[href*=table]`);
const table = document.querySelector(`#table`);
const stats = document.querySelector(`#stats`);
const tripPoints = [];
const offers = [];
const destinations = [];

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
              tripPoints.filter((it) => it.timetable.from > +moment().format(`x`))
          );
          return;

        case PAST_FILTER:
          renderTripPoints(
              tripPoints.filter((it) => it.timetable.to < +moment().format(`x`))
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
      pointEdit.destinations = destinations;
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

    pointEdit.onDestination = (evt) => {
      pointEdit.destination = destinations.find((it) => it.name === evt.target.value);
    };

    pointEdit.onType = (evt) => {
      const type = evt.target.value.toUpperCase().split(`-`).join(``);

      pointEdit.offers = offers.find((it) => it.type === evt.target.value);
      pointEdit.type = PointType[type];
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

const appInit = () => {
  tripPoints.push(...store.state.points);
  offers.push(...store.state.offers);
  destinations.push(...store.state.destinations);

  renderFilters();
  renderTripPoints();
};

if (store.state.isLoading) {
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;">Loading...</h1>`;
}

store.loadData().then(appInit);

// moneyChart.render();
// transportChart.render();
