import {cities, dataFilters, tripPoints} from './data';
import {generateTripPointsTitle, removeFromArray} from './util';
import Point from './point';
import PointEdit from './point-edit';
import Filter from './filter';
import moment from 'moment';

const FUTURE_FILTER = `future`;
const PAST_FILTER = `past`;

const tripFilterElement = document.querySelector(`.trip-filter`);
const tripDayItemsElement = document.querySelector(`.trip-day__items`);
const tripPointsElement = document.querySelector(`.trip__points`);

const getFilters = (filters) => {
  const fragment = document.createDocumentFragment();

  filters.forEach((item) => {
    const filter = new Filter(item);
    filter.render();

    filter.onFilter = () => {
      switch (filter.name) {
        case FUTURE_FILTER:
          renderTripPoints(
              tripPoints.filter((it) => it.date > moment().unix())
          );
          return;

        case PAST_FILTER:
          renderTripPoints(
              tripPoints.filter((it) => it.date < moment().unix())
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
renderFilters();
renderTripPoints();
