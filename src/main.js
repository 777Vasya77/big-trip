import {cities, PointType} from './data';
import {errorBorder, generateTripPointsTitle, updateObject} from './util';
import moment from 'moment';
// import moneyChart from './money-chart';
// import transportChart from './transport-chart';
import Point from './point';
import PointEdit from './point-edit';
import Filter from './filter';
import store from './store';

const LOADING_TEXT = `Loading route...`;
const LOADING_FAILURE_TEXT = `Something went wrong while loading your route info. Check your connection or try again later`;
const FUTURE_FILTER = `future`;
const PAST_FILTER = `past`;
const SAVE = `Save`;
const SAVING = `Saving...`;
const DELETE = `Delete`;
const DELETING = `Deleting...`;

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
  tableSwitcher.classList.remove(`view-switch__item--active`);
  statsSwitcher.classList.add(`view-switch__item--active`);
  stats.classList.remove(`visually-hidden`);
  // TODO отрисовка статистики
});

tableSwitcher.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  stats.classList.add(`visually-hidden`);
  tableSwitcher.classList.add(`view-switch__item--active`);
  table.classList.remove(`visually-hidden`);
  statsSwitcher.classList.remove(`view-switch__item--active`);
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
              store.state.points.filter((it) => it.timetable.from > +moment().format(`x`))
          );
          return;

        case PAST_FILTER:
          renderTripPoints(
              store.state.points.filter((it) => it.timetable.to < +moment().format(`x`))
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
      pointEdit.destinations = store.state.destinations;
      pointEdit.update(item);
      pointEdit.render();
      tripDayItemsElement.replaceChild(pointEdit.element, point.element);
      point.unrender();
    };

    point.onEdit = renderPointEditComponent;
    pointEdit.onCancel = renderPointComponent;

    pointEdit.onSubmit = (newData) => {
      errorBorder(pointEdit.element, false);
      pointEdit.block();
      pointEdit.saveBtnTextChange(SAVING);

      updateObject(item, newData);

      store.updatePoint(item)
        .then(() => {
          pointEdit.unblock();
          renderPointComponent(newData);
        })
        .catch(() => {
          errorBorder(pointEdit.element);
          pointEdit.shake();
          pointEdit.unblock();
          pointEdit.saveBtnTextChange(SAVE);
        });
    };

    pointEdit.onDelete = () => {
      errorBorder(pointEdit.element, false);
      pointEdit.block();
      pointEdit.deleteBtnTextChange(DELETING);

      store.deletePoint(item.id)
        .then(() => {
          pointEdit.unblock();
          pointEdit.unrender();
        })
        .catch(() => {
          errorBorder(pointEdit.element);
          pointEdit.shake();
          pointEdit.unblock();
          pointEdit.deleteBtnTextChange(DELETE);
        });
    };

    pointEdit.onFavorite = () => {
      item.isFavorite = !item.isFavorite;
    };

    pointEdit.onDestination = (evt) => {
      pointEdit.destination = store.state.destinations.find((it) => it.name === evt.target.value);
    };

    pointEdit.onType = (evt) => {
      const type = evt.target.value.toUpperCase().split(`-`).join(``);

      pointEdit.offers = store.state.offers.find((it) => it.type === evt.target.value);
      pointEdit.type = PointType[type];
    };

    point.render();
    fragment.appendChild(point.element);
  });

  return fragment;
};

const renderTripPoints = (points = store.state.points) => {
  tripDayItemsElement.innerHTML = ``;
  tripDayItemsElement.appendChild(getTripPoints(points));
};

const renderFilters = () => {
  tripFilterElement.appendChild(getFilters(store.state.filters));
};
// TODO использовать актуальные города
tripPointsElement.insertAdjacentHTML(`beforeend`, generateTripPointsTitle(cities));

const appInit = () => {
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;">${LOADING_TEXT}</h1>`;
  renderFilters();
  renderTripPoints();
};

const showLoadingError = () => {
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;color:red;">${LOADING_FAILURE_TEXT}</h1>`;
};

store.loadData()
  .then(appInit)
  .catch(showLoadingError);

// moneyChart.render();
// transportChart.render();
