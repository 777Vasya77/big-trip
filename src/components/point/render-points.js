import Point from './point';
import PointEdit from './point-edit';
import store from '../../store/store';
import * as util from '../../util';
import {Icon, Message, Title} from '../../data';
import {setTotalPrice} from '../navbar/nav-bar';
import moment from 'moment';

const tripPointsBlock = document.querySelector(`.trip-points`);
const tripDayItemsElement = document.querySelector(`.trip-day__items`);

const showLoadingMessage = () => {
  tripDayItemsElement.innerHTML = `<h1 style="text-align:center;">${Message.LOADING_TEXT}</h1>`;
};
showLoadingMessage();

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
    point.onEdit = () => {
      pointEdit.destinations = store.state.destinations;
      pointEdit.update(item);
      pointEdit.render();
      tripDayContainer.querySelector(`.trip-day__items`).replaceChild(pointEdit.element, point.element);
      point.unrender();
    };
    point.onOffer = () => {
      store.updatePoint(item);
      point.updateOffersMarkdown();
      setTotalPrice();
    };

    pointEdit.onCancel = renderPointComponent;

    pointEdit.onSubmit = (newData) => {
      pointEdit.setErrorBorder(false);
      pointEdit.block();
      pointEdit.saveBtnTextChange(Message.SAVING);

      util.updateObject(item, newData);

      store.updatePoint(item)
        .then(() => {
          pointEdit.unblock();
          setTotalPrice();
          renderPointComponent(newData);
        })
        .catch(() => {
          pointEdit.setErrorBorder();
          pointEdit.shake();
          pointEdit.unblock();
          pointEdit.saveBtnTextChange(Message.SAVE);
        });
    };

    pointEdit.onOffer = (offer, value) => {
      offer.accepted = value;
    };

    pointEdit.onDelete = () => {
      pointEdit.setErrorBorder(false);
      pointEdit.block();
      pointEdit.deleteBtnTextChange(Message.DELETING);

      store.deletePoint(item.id)
        .then(() => {
          pointEdit.unblock();
          pointEdit.unrender();
          setTotalPrice();
        })
        .catch(() => {
          pointEdit.setErrorBorder();
          pointEdit.shake();
          pointEdit.unblock();
          pointEdit.deleteBtnTextChange(Message.DELETE);
        });
    };

    pointEdit.onDestination = (evt) => {
      pointEdit.destination = store.state.destinations.find((it) => it.name === evt.target.value);
    };

    pointEdit.onType = (evt) => {
      pointEdit.offers = store.state.offers.find((it) => it.type === evt.target.value);
      pointEdit.type = {title: Title[evt.target.value], icon: Icon[evt.target.value]};
      pointEdit.closeTypeSelect();
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
    const tripDay = util.createElement(getTripDayMarkdown(item, index));
    const pointsByDate = points.filter((it) => moment(it.timetable.from).format(`MMM D`) === item);
    tripDay.querySelector(`.trip-day__items`).appendChild(getTripPoints(pointsByDate, tripDay));
    fragment.appendChild(tripDay);
  });

  return fragment;
};

export const renderTripPoints = (points = store.state.points) => {
  tripPointsBlock.innerHTML = ``;
  tripPointsBlock.appendChild(getTripDays(points));
};
