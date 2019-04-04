import Filter from './filter';
import {FilterName} from '../../data';
import store from '../../store/store';
import moment from 'moment';
import moneyChart from '../chart/money-chart';
import transportChart from '../chart/transport-chart';
import {renderTripPoints} from '../point/render-points';

const tripFilterElement = document.querySelector(`.trip-filter`);

const getFilters = (filters) => {
  const fragment = document.createDocumentFragment();

  filters.forEach((item) => {
    const filter = new Filter(item);
    filter.render();
    filter.onFilter = () => {
      switch (filter.name) {
        case FilterName.FUTURE:
          const futurePoints = store.state.points.filter((it) => it.timetable.from > +moment().format(`x`));

          renderTripPoints(futurePoints);
          moneyChart.init(futurePoints);
          transportChart.init(futurePoints);
          // sortPoints(futurePoints);
          return;

        case FilterName.PAST:
          const pastPoints = store.state.points.filter((it) => it.timetable.to < +moment().format(`x`));

          renderTripPoints(pastPoints);
          moneyChart.init(pastPoints);
          transportChart.init(pastPoints);
          // sortPoints(pastPoints);
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

export const renderFilters = () => {
  tripFilterElement.appendChild(getFilters(store.state.filters));
};
