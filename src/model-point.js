import {PointType} from './data';

export default class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.type = PointType[data[`type`].toUpperCase().split(`-`).join(``)];
    this.timetable = {
      from: data[`date_from`],
      to: data[`date_to`],
    };
    this.offers = data[`offers`] || [];
    this.price = data[`base_price`];
    this.destination = data[`destination`];
    this.isFavorite = Boolean(data[`is_favorite`]);

  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}
