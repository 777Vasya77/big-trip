import API from '../api';
import ModelPoint from '../models/model-point';
import PointProvider from '../provider';
import OfflineStore from './offline-store';
import {removeFromArray} from '../util';
import {ApiData, FilterName, POINTS_STORE_KEY} from '../data';
import moment from 'moment';

const api = new API({
  endPoint: ApiData.END_POINT,
  authorization: ApiData.AUTHORIZATION
});
const offlineStore = new OfflineStore({
  key: POINTS_STORE_KEY,
  storage: localStorage
});
const provider = new PointProvider(api, offlineStore, () => String(Date.now()));

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncPoints();
});

export default {
  state: {
    points: [],
    offers: [],
    destinations: [],
    filters: [
      {
        name: FilterName.EVERYTHING,
        checked: true
      },
      {
        name: FilterName.FUTURE,
        checked: false
      },
      {
        name: FilterName.PAST,
        checked: false
      }
    ]
  },

  getTypeOffers(type) {
    return this.state.offers.find((item) => item.type === type.toLowerCase()).offers;
  },

  getDestination(name) {
    return this.state.destinations.find((item) => item.name === name);
  },

  getPastPoints() {
    return this.state.points.filter((it) => it.timetable.to < +moment().format(`x`));
  },

  getFuturePoints() {
    return this.state.points.filter((it) => it.timetable.from > +moment().format(`x`));
  },

  getPastPointsCount() {
    return this.getPastPoints().length;
  },

  getFuturePointsCount() {
    return this.getFuturePoints().length;
  },

  loadData() {
    return Promise.all([
      this.fetchPoints(),
      this.fetchOffers(),
      this.fetchDestinations()
    ])
      .then(() => {
        this.state.isLoading = false;
      })
      .catch((error) => {
        throw new Error(error);
      });
  },

  fetchPoints() {
    return provider.get(`points`)
      .then((data) => ModelPoint.parsePoints(data))
      .then((data) => {
        this.state.points = data;
      });
  },

  fetchOffers() {
    return api.get(`offers`)
      .then((data) => {
        this.state.offers = data;
      });
  },

  fetchDestinations() {
    return api.get(`destinations`)
      .then((data) => {
        this.state.destinations = data;
      });
  },

  storePoint(point) {
    const pointData = {
      'day': point.day,
      'type': point.type.title.toLowerCase(),
      'base_price': +point.price,
      'date_from': +point.timetable.from,
      'date_to': +point.timetable.to,
      'offers': point.offers,
      'destination': point.destination,
      'is_favorite': false
    };
    return provider.create(`points`, {point: pointData})
      .then((response) => ModelPoint.parsePoint(response))
      .then((newPoint) => {
        this.state.points.unshift(newPoint);
      });
  },

  updatePoint(data) {
    const point = this.state.points.find((item) => item.id === data.id);

    return provider.update(`points`, {id: data.id, data: point.toRAW()});
  },

  deletePoint(id) {
    const point = this.state.points.find((item) => item.id === id);

    return provider.delete(`points`, {id}).then(removeFromArray(this.state.points, point));
  },

  countTotalPrice() {
    const pointsPrice = Math.round(this.state.points.reduce((prev, cur) => prev + +cur.price, 0));
    const offers = [].concat(...this.state.points.map((item) => item.offers));
    const offersPrice = offers.filter((item) => item.accepted).reduce((prev, cur) => prev + cur.price, 0);

    return pointsPrice + offersPrice;
  }
};
