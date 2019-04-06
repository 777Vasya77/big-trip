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
    return getPointMarkdown(this);
  }

  set onEdit(fn) {
    if (typeof fn === `function`) {
      this._onEdit = fn;
    }
  }

  _getOffersMarkdown() {
    return getTableOffersMarkdown(this);
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
