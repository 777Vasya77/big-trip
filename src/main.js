import {cities, PointType} from './data';
import {disableForm, errorBorder, generateTripPointsTitle, updateObject} from './util';
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

const tripFilterElement = document.querySelector(`.trip-filter`);
const tripDayItemsElement = document.querySelector(`.trip-day__items`);
const tripPointsElement = document.querySelector(`.trip__points`);
const statsSwitcher = document.querySelector(`a[href*=stat]`);
const tableSwitcher = document.querySelector(`a[href*=table]`);
const table = document.querySelector(`#table`);
const stats = document.querySelector(`#stats`);
// TODO брать данные из store
const dataFilters = store.state.filters;
const tripPoints = [];
const offers = [];
const destinations = [];

statsSwitcher.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  // TODO classList.toggle
  table.classList.add(`visually-hidden`);
  stats.classList.remove(`visually-hidden`);
  // TODO отрисовка статистики
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
      // TODO взять из компонента если нужно
      const pointElement = document.querySelector(`.point`);
      const pointFormElement = document.querySelector(`.point > form`);
      const saveBtn = pointFormElement.querySelector(`.point__button--save`);
      // TODO вынести в метод
      saveBtn.innerText = `Saving...`;
      errorBorder(pointElement, false);
      disableForm(pointFormElement);
      updateObject(item, newData);

      store.updatePoint(item)
        .then(() => {
          disableForm(pointFormElement, false);
          renderPointComponent(newData);
        })
        .catch(() => {
          // TODO вынести в метод
          errorBorder(pointElement);
          pointEdit.shake();
          disableForm(pointFormElement, false);
          saveBtn.innerText = `Save`;
        });
    };

    pointEdit.onDelete = () => {
      // TODO тут как в onSubmit
      const pointElement = document.querySelector(`.point`);
      const pointFormElement = document.querySelector(`.point > form`);
      const deleteBtn = pointFormElement.querySelector(`.point__button[type=reset]`);
      deleteBtn.innerText = `Deleting...`;

      errorBorder(pointElement, false);
      disableForm(pointFormElement);
      store.deletePoint(item.id)
        .then(() => {
          disableForm(pointFormElement, false);
          pointEdit.unrender();
        })
        .catch(() => {
          errorBorder(pointElement);
          pointEdit.shake();
          disableForm(pointFormElement, false);
          deleteBtn.innerText = `Delete`;
        });
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
      // TODO отрендерить изменения
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
// TODO использовать актуальные города
tripPointsElement.insertAdjacentHTML(`beforeend`, generateTripPointsTitle(cities));

const appInit = () => {
  tripPoints.push(...store.state.points);
  offers.push(...store.state.offers);
  destinations.push(...store.state.destinations);

  renderFilters();
  renderTripPoints();
};

const showLoadingError = () => {
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;color:red;">${LOADING_FAILURE_TEXT}</h1>`;
};

// TODO перенести сообщение в старт загрузки
if (store.state.isLoading) {
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;">${LOADING_TEXT}</h1>`;
}

store.loadData()
  .then(appInit)
  .catch(showLoadingError);

// moneyChart.render();
// transportChart.render();
