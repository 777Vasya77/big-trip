import moment from 'moment';
import Component from '../component';

export default class Point extends Component {

  constructor(data) {
    super();

    this._type = data.type;
    this._offers = data.offers;
    this._timetable = data.timetable;
    this._price = data.price;

    this._onEdit = null;

    this._onElementClick = this._onElementClick.bind(this);
  }

  update(data) {
    this._type = data.type;
    this._timetable = data.timetable;
    this._offers = data.offers;
    this._price = data.price;
  }

  get timeFrom() {
    return moment(+this._timetable.from).format(`HH:mm`);
  }

  get timeTo() {
    return moment(+this._timetable.to).format(`HH:mm`);
  }

  get timeDiff() {
    const duration = moment.duration(moment(+this._timetable.to).diff(moment(+this._timetable.from)));
    let format = `mm[M]`;

    if (duration.asDays() > 1) {
      format = `D[D] HH[H] mm[M]`;
    }

    if (duration.asDays() < 1 && duration.asHours() > 1) {
      format = `HH[H] mm[M]`;
    }

    return moment
      .utc(duration.as(`milliseconds`))
      .format(format);
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
        const title = (item.name) ? item.name : item.title;
        return `
        <li>
          <button class="trip-point__offer">${title} +&euro;&nbsp;${item.price}</button>
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
