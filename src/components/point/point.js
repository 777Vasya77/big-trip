import moment from 'moment';
import Component from '../component';
import {getPointMarkdown} from './markdown/get-point-markdown';
import {getTableOffersMarkdown} from './markdown/get-table-offers-markdown';

export default class Point extends Component {

  constructor(data) {
    super();

    this._type = data.type;
    this._offers = data.offers;
    this._timetable = data.timetable;
    this._price = data.price;

    this._onEdit = () => {};
    this._onOffer = () => {};

    this._onElementClick = this._onElementClick.bind(this);
    this._onOfferClick = this._onOfferClick.bind(this);
  }

  update(data) {
    this._type = data.type;
    this._timetable = data.timetable;
    this._offers = data.offers;
    this._price = data.price;
  }

  updateOffersMarkdown() {
    this._element.querySelector(`.trip-point__offers`).innerHTML = this._getOffersMarkdown();
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
    return getPointMarkdown(this);
  }

  set onEdit(fn) {
    this._onEdit = this.checkFunction(fn) || this._onEdit;
  }

  set onOffer(fn) {
    this._onOffer = this.checkFunction(fn) || this._onOffer;
  }

  _getOffersMarkdown() {
    return getTableOffersMarkdown(this);
  }

  _bind() {
    this._element.addEventListener(`click`, this._onElementClick);
    this._element
      .querySelector(`.trip-point__offers`)
      .addEventListener(`click`, this._onOfferClick);
  }

  _unbind() {
    this._element.removeEventListener(`click`, this._onElementClick);
    this._element
      .querySelector(`.trip-point__offers`)
      .removeEventListener(`click`, this._onOfferClick);
  }

  _onElementClick() {
    this._onEdit();
  }

  _onOfferClick(evt) {
    evt.stopPropagation();
    const offerName = evt.target.innerText
      .split(`+`)[0]
      .trim();
    const offer = this._offers.find((item) => {
      const title = (item.title) ? `title` : `name`;
      return item[title] === offerName;
    });

    if (`accepted` in offer) {
      offer.accepted = true;
    } else {
      Object.defineProperty(offer, `accepted`, {value: true});
    }

    this._onOffer();
  }

}
