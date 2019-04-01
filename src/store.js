import API from './api';
import ModelPoint from './model-point';
import {removeFromArray} from './util';

const LOADING_TEXT = `Loading route...`;
const AUTHORIZATION = `Basic eo0w590ik298893a1qq`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const FilterName = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`
};
const tripDayItemsElement = document.querySelector(`.trip-day__items`);

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

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

  loadData() {
    tripDayItemsElement.innerHTML = `<h1 style="text-align:center;">${LOADING_TEXT}</h1>`;
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
    return api.get(`points`)
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
      'type': point.type.title.toLowerCase(),
      'base_price': point.price,
      'date_from': +point.timetable.from,
      'date_to': +point.timetable.to,
      'offers': point.offers,
      'destination': point.destination,
      'is_favorite': false
    };
    return api.create(`points`, {point: pointData})
      .then((response) => ModelPoint.parsePoint(response))
      .then((newPoint) => {
        this.state.points.push(newPoint);
      });
  },

  updatePoint(data) {
    const point = this.state.points.find((item) => item.id === data.id);

    return api.update(`points`, {id: data.id, data: point.toRAW()});
  },

  deletePoint(id) {
    const point = this.state.points.find((item) => item.id === id);

    return api.delete(`points`, {id}).then(removeFromArray(this.state.points, point));
  }
};
