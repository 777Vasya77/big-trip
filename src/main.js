import {Title, Icon} from './data';
import {createElement, errorBorder, generateTripPointsTitle, updateObject} from './util';
import moment from 'moment';
import moneyChart from './money-chart';
import transportChart from './transport-chart';
import timeSpentChart from './time-spent-chart';
import Point from './point';
import PointEdit from './point-edit';
import PointNew from './point-new';
import Filter from './filter';
import store from './store';

const LOADING_TEXT = `Loading route...`;
const LOADING_FAILURE_TEXT = `Something went wrong while loading your route info. Check your connection or try again later`;
const FUTURE_FILTER = `future`;
const PAST_FILTER = `past`;
const SAVE = `Save`;
const SAVING = `Saving...`;
const DELETE = `Delete`;
const DELETING = `Deleting...`; // todo я бы сообщения вынес в отдельный модуль

const tripFilterElement = document.querySelector(`.trip-filter`);
const tripDayItemsElement = document.querySelector(`.trip-day__items`);
const tripPointsBlock = document.querySelector(`.trip-points`);
const tripPointsElement = document.querySelector(`.trip__points`);
const statsSwitcher = document.querySelector(`a[href*=stat]`);
const tableSwitcher = document.querySelector(`a[href*=table]`);
const table = document.querySelector(`#table`);
const stats = document.querySelector(`#stats`);
const newEventElement = document.querySelector(`.new-event`);
const tripTotalCostElement = document.querySelector(`.trip__total-cost`);

// todo тут хочется оставить логику отрисовки приложения, а отдельные компоненты по модулям раскидать

const showTableContent = () => {
  stats.classList.add(`visually-hidden`);
  tableSwitcher.classList.add(`view-switch__item--active`);
  table.classList.remove(`visually-hidden`);
  statsSwitcher.classList.remove(`view-switch__item--active`);
};

const showStatsContent = () => {
  table.classList.add(`visually-hidden`);
  tableSwitcher.classList.remove(`view-switch__item--active`);
  statsSwitcher.classList.add(`view-switch__item--active`);
  stats.classList.remove(`visually-hidden`);
};

const sortByPrice = (a, b) => +a.price - +b.price;
const sortByFromDate = (a, b) => +a.timetable.from - +b.timetable.from;
const sortByDuration = (a, b) => {
  const timeDiffA = moment.duration(moment(+a.timetable.to).diff(moment(+a.timetable.from)));
  const timeDiffB = moment.duration(moment(+b.timetable.to).diff(moment(+b.timetable.from)));
  return timeDiffA - timeDiffB;
};

const sortPoints = (points) => {
  const eventTriggerElement = document.querySelector(`label[for="sorting-event"]`);
  const timeTriggerElement = document.querySelector(`label[for="sorting-time"]`);
  const priceTriggerElement = document.querySelector(`label[for="sorting-price"]`);

  eventTriggerElement.addEventListener(`click`, () => {

    points.sort(sortByFromDate); // todo у нас теперь есть стор, можно в нем геттеры сделать
    renderTripPoints(points);
  });

  priceTriggerElement.addEventListener(`click`, () => {
    points.sort(sortByPrice);
    renderTripPoints(points);
  });

  timeTriggerElement.addEventListener(`click`, () => {
    points.sort(sortByDuration);
    renderTripPoints(points);
  });

};

newEventElement.addEventListener(`click`, () => {
  renderNewPointForm();
});

statsSwitcher.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  showStatsContent();

  moneyChart.init(store.state.points);
  transportChart.init(store.state.points);
  timeSpentChart.init(store.state.points);
});

tableSwitcher.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  showTableContent();
});

const getFilters = (filters) => {
  const fragment = document.createDocumentFragment();

  filters.forEach((item) => {
    const filter = new Filter(item);
    filter.render();
    filter.onFilter = () => {
      switch (filter.name) {
        case FUTURE_FILTER:
          const futurePoints = store.state.points.filter((it) => it.timetable.from > +moment().format(`x`));

          renderTripPoints(futurePoints);
          moneyChart.init(futurePoints);
          transportChart.init(futurePoints);
          sortPoints(futurePoints);
          return;

        case PAST_FILTER:
          const pastPoints = store.state.points.filter((it) => it.timetable.to < +moment().format(`x`));

          renderTripPoints(pastPoints);
          moneyChart.init(pastPoints);
          transportChart.init(pastPoints);
          sortPoints(pastPoints);
          return;

        default:
          renderTripPoints();
          moneyChart.init(store.state.points);
          transportChart.init(store.state.points);
          return;
      }
    };

    fragment.appendChild(filter.element);
  });

  return fragment;
};

const getTripPoints = (points, tripDayContainer) => {
  const fragment = document.createDocumentFragment();

  points.forEach((item) => {
    const point = new Point(item);
    const pointEdit = new PointEdit(item);

    const renderPointComponent = (newData = item) => {
      item = newData;

      point.update(item);
      point.render();
      tripDayContainer.querySelector(`.trip-day__items`).replaceChild(point.element, pointEdit.element);
      pointEdit.unrender();
    };
    const renderPointEditComponent = () => {
      pointEdit.destinations = store.state.destinations;
      pointEdit.update(item);
      pointEdit.render();
      tripDayContainer.querySelector(`.trip-day__items`).replaceChild(pointEdit.element, point.element);
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
          setTotalPrice();
          renderPointComponent(newData);
        })
        .catch(() => {
          errorBorder(pointEdit.element);
          pointEdit.shake();
          pointEdit.unblock();
          pointEdit.saveBtnTextChange(SAVE);
        });
    };

    pointEdit.onOffer = (evt) => {
      const offerTitle = evt.target.value.toLowerCase().split(`-`).join(` `);
      // todo лучше все данные в компоненте приготовить и сюда параметром передать
      item.offers.find((it) => it.title.toLowerCase() === offerTitle).accepted = evt.target.checked;
    };

    pointEdit.onDelete = () => {
      errorBorder(pointEdit.element, false);
      pointEdit.block();
      pointEdit.deleteBtnTextChange(DELETING);

      store.deletePoint(item.id)
        .then(() => {
          pointEdit.unblock();
          pointEdit.unrender();
          setTotalPrice();
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
      pointEdit.offers = store.state.offers.find((it) => it.type === evt.target.value);
      pointEdit.type = {title: Title[evt.target.value], icon: Icon[evt.target.value]};
      // todo с разметкой лучше работать там где она объявлена, лучше метод сделать
      pointEdit.element.querySelector(`#travel-way__toggle`).checked = false;
    };

    point.render();
    fragment.appendChild(point.element);
  });

  return fragment;
};

const getTripDayMarkdown = (date, number) => {
  return `
      <section class="trip-day">
        <article class="trip-day__info">
          <span class="trip-day__caption">Day</span>
          <p class="trip-day__number">${number + 1}</p>
          <h2 class="trip-day__title">${date}</h2>
        </article>

        <div class="trip-day__items">
        </div>
      </section>
    `.trim();
};

const getTripDays = (points = store.state.points) => {
  const fragment = document.createDocumentFragment();
  const days = new Set(points.map((item) => moment(item.timetable.from).format(`MMM D`)));

  Array.from(days).forEach((item, index) => {
    const tripDay = createElement(getTripDayMarkdown(item, index));
    const pointsByDate = points.filter((it) => moment(it.timetable.from).format(`MMM D`) === item);
    tripDay.querySelector(`.trip-day__items`).appendChild(getTripPoints(pointsByDate, tripDay));
    fragment.appendChild(tripDay);
  });

  return fragment;
};

const renderTripPoints = (points = store.state.points) => {
  tripPointsBlock.innerHTML = ``;
  tripPointsBlock.appendChild(getTripDays(points));
};

const renderFilters = () => {
  tripFilterElement.appendChild(getFilters(store.state.filters));
};

const renderNewPointForm = () => {
  tripPointsBlock.prepend(getNewPointForm());
};

const countTotalPrice = (points) => { // todo такое лучше в утилиты или в стор
  const pointsPrice = Math.round(points.reduce((prev, cur) => prev + +cur.price, 0));
  const offers = [].concat(...points.map((item) => item.offers));
  const offersPrice = offers.filter((item) => item.accepted).reduce((prev, cur) => prev + cur.price, 0);

  return pointsPrice + offersPrice;
};

const setTotalPrice = () => {
  tripTotalCostElement.innerText = `€ ${countTotalPrice(store.state.points)}`;
};

const appInit = () => { // todo тут в main хорошо бы только это оставить, а остальное по модулям раскидать
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;">${LOADING_TEXT}</h1>`;
  renderFilters();
  renderTripPoints();
  sortPoints(store.state.points);
  setTotalPrice();
  tripPointsElement.insertAdjacentHTML(`beforeend`, generateTripPointsTitle(store.state.points));
};

const showLoadingError = () => {
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;color:red;">${LOADING_FAILURE_TEXT}</h1>`;
};

const getNewPointForm = () => {
  const newPoint = new PointNew();

  newPoint.onCancel = () => {
    newPoint.unrender();
  };

  newPoint.onDelete = () => {
    newPoint.unrender();
  };

  newPoint.onType = (evt) => {
    newPoint.offers = store.state.offers.find((it) => it.type === evt.target.value);
    newPoint.type = {title: Title[evt.target.value], icon: Icon[evt.target.value]};

    newPoint.element.querySelector(`#travel-way__toggle`).checked = false;
  };

  newPoint.onDestination = (evt) => {
    newPoint.destination = store.state.destinations.find((it) => it.name === evt.target.value);
  };

  newPoint.onSubmit = (point) => {
    errorBorder(newPoint.element, false);
    newPoint.block();
    newPoint.saveBtnTextChange(SAVING);

    store.storePoint(point)
      .then(() => {
        newPoint.unblock();
        setTotalPrice();
        renderTripPoints();
        newPoint.unrender();
      })
      .catch(() => {
        errorBorder(newPoint.element);
        newPoint.shake();
        newPoint.unblock();
        newPoint.saveBtnTextChange(SAVE);
      });
  };

  return newPoint.element;
};

store.loadData()
  .then(appInit)
  .catch(showLoadingError);
