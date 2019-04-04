import {Title, Icon} from '../data';

export default class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.type = {
      title: Title[data[`type`]],
      icon: Icon[data[`type`]]
    };
    this.timetable = {
      from: data[`date_from`],
      to: data[`date_to`],
    };
    this.offers = data[`offers`] || [];
    this.price = data[`base_price`];
    this.destination = data[`destination`];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type.title.toLowerCase(),
      'date_from': +this.timetable.from,
      'date_to': +this.timetable.to,
      'destination': this.destination,
      'base_price': +this.price,
      'is_favorite': this.isFavorite,
      'offers': this.offers
    };
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}
