import {renderNewPointForm} from '../point/render-new-point-form';
import moneyChart from '../chart/money-chart';
import store from '../../store/store';
import transportChart from '../chart/transport-chart';
import timeSpentChart from '../chart/time-spent-chart';
import * as util from '../../util';

const statsSwitcher = document.querySelector(`a[href*=stat]`);
const tableSwitcher = document.querySelector(`a[href*=table]`);
const table = document.querySelector(`#table`);
const stats = document.querySelector(`#stats`);
const newEventElement = document.querySelector(`.new-event`);
const tripTotalCostElement = document.querySelector(`.trip__total-cost`);

export const setTotalPrice = () => {
  tripTotalCostElement.innerText = `€ ${store.countTotalPrice(store.state.points)}`;
};

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

export const navbarInit = () => {
  setTotalPrice();
  util.renderCitiesTitle();

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
};
