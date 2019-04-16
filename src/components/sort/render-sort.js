import Sort from './sort';
import {SortMethod, SortName} from '../../data';
import store from '../../store/store';
import {renderTripPoints} from '../point/render-points';

const tripSortElement = document.querySelector(`.trip-sorting`);

const getSorts = (sorts) => {
  const fragment = document.createDocumentFragment();

  sorts.forEach((item) => {
    const sort = new Sort(item);
    sort.render();
    sort.onSort = () => {
      switch (sort.name) {
        case SortName.TIME:
          renderTripPoints(
              store.getSortablePoint(SortMethod.SORT_BY_DURATION)
          );
          return;

        case SortName.PRICE:
          renderTripPoints(
              store.getSortablePoint(SortMethod.SORT_BY_PRICE)
          );
          return;

        default:
          renderTripPoints(
              store.getSortablePoint(SortMethod.SORT_BY_FROM_DATE)
          );
          return;
      }
    };

    fragment.appendChild(sort.element);
  });

  return fragment;
};

export const renderSorts = () => {
  tripSortElement.prepend(getSorts(store.state.sorts));
};
