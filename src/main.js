import {Title, Icon, Message} from './data';
import * as util from './util';
import moneyChart from './components/chart/money-chart';
import transportChart from './components/chart/transport-chart';
import timeSpentChart from './components/chart/time-spent-chart';
import PointNew from './components/point/point-new';
import store from './store/store';
import {renderFilters} from './components/filter/render-filter';
import {renderTripPoints} from './components/point/render-points';
import {sortPoints} from './components/point/sort-points';

const tripDayItemsElement = document.querySelector(`.trip-day__items`);
const tripPointsBlock = document.querySelector(`.trip-points`);
const tripPointsElement = document.querySelector(`.trip__points`);
const statsSwitcher = document.querySelector(`a[href*=stat]`);
const tableSwitcher = document.querySelector(`a[href*=table]`);
const table = document.querySelector(`#table`);
const stats = document.querySelector(`#stats`);
const newEventElement = document.querySelector(`.new-event`);

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

const renderNewPointForm = () => {
  tripPointsBlock.prepend(getNewPointForm());
};

const appInit = () => { // todo тут в main хорошо бы только это оставить, а остальное по модулям раскидать
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;">${Message.LOADING_TEXT}</h1>`;
  renderFilters();
  renderTripPoints();
  sortPoints(store.state.points);
  util.setTotalPrice();
  tripPointsElement.insertAdjacentHTML(`beforeend`, util.generateTripPointsTitle(store.state.points));
};

const showLoadingError = () => {
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;color:red;">${Message.LOADING_FAILURE_TEXT}</h1>`;
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
    util.setErrorBorder(newPoint.element, false);
    newPoint.block();
    newPoint.saveBtnTextChange(Message.SAVING);

    store.storePoint(point)
      .then(() => {
        newPoint.unblock();
        util.setTotalPrice();
        renderTripPoints();
        newPoint.unrender();
      })
      .catch(() => {
        util.setErrorBorder(newPoint.element);
        newPoint.shake();
        newPoint.unblock();
        newPoint.saveBtnTextChange(Message.SAVE);
      });
  };

  return newPoint.element;
};

store.loadData()
  .then(appInit)
  .catch(showLoadingError);
