import store from '../../store/store';
import {Icon, Message, Title} from '../../data';
import {renderTripPoints} from './render-points';
import {default as PointNew} from './point-edit';
import {setTotalPrice} from "../navbar/nav-bar";

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
    newPoint.setErrorBorder(false);
    newPoint.block();
    newPoint.saveBtnTextChange(Message.SAVING);

    store.storePoint(point)
      .then(() => {
        newPoint.unblock();
        setTotalPrice();
        renderTripPoints();
        newPoint.unrender();
      })
      .catch(() => {
        newPoint.setErrorBorder();
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
