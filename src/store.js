import API from './api';
import ModelPoint from './model-point';
import {removeFromArray} from './util';

const AUTHORIZATION = `Basic eo0w590ik298ww8933a`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const FilterName = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`
};

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

export default {
  state: {
    // TODO ставим loading после начала загрузки
    isLoading: true,
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

  getPoints() {
    return this.state.points;
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

  updatePoint(data) {
    const point = this.state.points.find((item) => item.id === data.id);

    return api.update(`points`, {id: data.id, data: point.toRAW()});
  },

  deletePoint(id) {
    const point = this.state.points.find((item) => item.id === id);

    return api.delete(`points`, {id}).then(removeFromArray(this.state.points, point));
  }
};
