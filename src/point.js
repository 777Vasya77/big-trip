import moment from 'moment';
import Component from './component';

export default class Point extends Component {

  constructor(data) {
    super();

    this._type = data.type;
    this._timetable = data.timetable;
    this._offers = data.offers;
    this._price = data.price;

    this._onEdit = null;

    this._onElementClick = this._onElementClick.bind(this);
  }

  get timeFrom() {
    return moment.unix(this._timetable.from).format(`HH:MM`);
  }

  get timeTo() {
    return moment.unix(this._timetable.to).format(`HH:MM`);
  }

  get timeDiff() {
    const hours = moment
      .duration(moment.unix(this._timetable.to).diff(moment.unix(this._timetable.from)))
      .asHours();
    return `${hours}h 00m`;
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${this._type.icon}</i>
        <h3 class="trip-point__title">${this._type.title}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${this.timeFrom} - ${this.timeTo}</span>
          <span class="trip-point__duration">${this.timeDiff}</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
        <ul class="trip-point__offers">
          ${this._getOffersMarkdown(this._offers)}
        </ul>
      </article>`.trim();
  }

  set onEdit(fn) {
    if (typeof fn === `function`) {
      this._onEdit = fn;
    }
  }

  _getOffersMarkdown() {
    return this._offers
      .map((item) => {
        return `
        <li>
          <button class="trip-point__offer">${item.title} +&euro;&nbsp;${item.price}</button>
        </li>`.trim();
      })
      .join(``);
  }

  _bind() {
    this._element.addEventListener(`click`, this._onElementClick);
  }

  _unbind() {
    this._element.removeEventListener(`click`, this._onElementClick);
  }

  _onElementClick() {
    this._onEdit();
  }

}
