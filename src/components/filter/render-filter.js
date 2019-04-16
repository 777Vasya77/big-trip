import Filter from './filter';
import {FilterName} from '../../data';
import store from '../../store/store';
import moneyChart from '../chart/money-chart';
import transportChart from '../chart/transport-chart';
import {renderTripPoints} from '../point/render-points';

const tripFilterElement = document.querySelector(`.trip-filter`);

const getFilters = (filters) => {
  const fragment = document.createDocumentFragment();

  filters.forEach((item) => {
    const filter = new Filter(item);
    filter.render();
    filter.checkFilteredItems();
    filter.onChecked = () => {
      store.checkedFilter(filter);
    };
    filter.onFilter = () => {
      switch (filter.name) {
        case FilterName.FUTURE:
          const futurePoints = store.getFuturePoints();

          renderTripPoints(
              store.getSortablePoint(store.state.currentSort, futurePoints)
          );

          moneyChart.init(futurePoints);
          transportChart.init(futurePoints);
          return;

        case FilterName.PAST:
          const pastPoints = store.getPastPoints();

          renderTripPoints(
              store.getSortablePoint(store.state.currentSort, pastPoints)
          );

          moneyChart.init(pastPoints);
          transportChart.init(pastPoints);
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
  tripFilterElement.innerHTML = ``;
  tripFilterElement.appendChild(getFilters(store.state.filters));
};
