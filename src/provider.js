const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export default class Provider {
  constructor(api, store, generateId) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
    this._needSync = false;
  }

  get(url) {
    if (this._isOnline()) {
      return this._api.get(url)
        .then((points) => {
          points.map((it) => this._store.setItem({key: it.id, item: it}));
          return points;
        });
    } else {
      const rawPointsMap = this._store.getAll();
      const rawPoints = objectToArray(rawPointsMap);

      return Promise.resolve(rawPoints);
    }
  }

  create(url, {point}) {
    if (this._isOnline()) {
      return this._api.create(url, {point})
        .then((newPoint) => {
          this._store.setItem({key: newPoint.id, item: newPoint});
          return newPoint;
        });
    } else {
      point.id = this._generateId();
      this._needSync = true;

      this._store.setItem({key: point.id, item: point});
      return Promise.resolve(point);
    }
  }

  update(url, {id, data}) {
    if (this._isOnline()) {
      return this._api.update(url, {id, data})
        .then((point) => {
          this._store.setItem({key: point.id, item: point});
          return point;
        });
    } else {
      const point = data;
      this._needSync = true;
      this._store.setItem({key: point.id, item: point});
      return Promise.resolve(point);
    }
  }

  delete(url, {id}) {
    if (this._isOnline()) {
      return this._api.delete(url, {id})
        .then(() => {
          this._store.removeItem({key: id});
        });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  syncPoints() {
    return this._api.syncPoints(objectToArray(this._store.getAll()));
  }

  _isOnline() {
    return window.navigator.onLine;
  }

}
