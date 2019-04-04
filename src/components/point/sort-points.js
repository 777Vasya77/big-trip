import moment from "moment";
import {renderTripPoints} from "./render-points";

const eventTriggerElement = document.querySelector(`label[for="sorting-event"]`);
const timeTriggerElement = document.querySelector(`label[for="sorting-time"]`);
const priceTriggerElement = document.querySelector(`label[for="sorting-price"]`);

const sortByPrice = (a, b) => +a.price - +b.price;
const sortByFromDate = (a, b) => +a.timetable.from - +b.timetable.from;
const sortByDuration = (a, b) => {
  const timeDiffA = moment.duration(moment(+a.timetable.to).diff(moment(+a.timetable.from)));
  const timeDiffB = moment.duration(moment(+b.timetable.to).diff(moment(+b.timetable.from)));
  return timeDiffA - timeDiffB;
};

export const sortPoints = (points) => {
  eventTriggerElement.addEventListener(`click`, () => {

    points.sort(sortByFromDate); // todo у нас теперь есть стор, можно в нем геттеры сделать
    renderTripPoints(points);
  });

  priceTriggerElement.addEventListener(`click`, () => {
    points.sort(sortByPrice);
    renderTripPoints(points);
  });

  timeTriggerElement.addEventListener(`click`, () => {
    points.sort(sortByDuration);
    renderTripPoints(points);
  });

};
