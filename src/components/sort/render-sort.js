import Sort from './sort';
import {SortName} from '../../data';
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
              store.getSortablePoint(`sortByDuration`)
          );
          return;

        case SortName.PRICE:
          renderTripPoints(
              store.getSortablePoint(`sortByPrice`)
          );
          return;

        default:
          renderTripPoints(
              store.getSortablePoint(`sortByFromDate`)
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
