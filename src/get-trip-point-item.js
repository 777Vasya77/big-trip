import {getTimeFromTimestamp, getTimetableDiff} from './util';
import getOffersMarkdown from './get-offers-markdown';

export default (point) => {
  return `
    <article class="trip-point">
      <i class="trip-icon">${point.type.icon}</i>
      <h3 class="trip-point__title">${point.type.title}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${getTimeFromTimestamp(point.timetable.from)} - ${getTimeFromTimestamp(point.timetable.to)}</span>
        <span class="trip-point__duration">${getTimetableDiff(point.timetable.from, point.timetable.to)}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
      <ul class="trip-point__offers">
        ${getOffersMarkdown(point.offers)}
      </ul>
    </article>
  `;
};
