import store from '../../store/store';
import {Icon, Message, Title} from '../../data';
import * as util from '../../util';
import {renderTripPoints} from './render-points';
import {default as PointNew} from "./point-edit";

const tripPointsBlock = document.querySelector(`.trip-points`);

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

export const renderNewPointForm = () => {
  tripPointsBlock.prepend(getNewPointForm());
};
