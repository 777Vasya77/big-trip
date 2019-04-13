export default class Provider {
  constructor({api}) {
    this._api = api;
  }

  get(url) {
    return this._api.get(url);
  }

  create(url, {point}) {
    return this._api.create(url, {point});
  }

  update(url, {id, data}) {
    return this._api.updatePoint(url, {id, data});
  }

  delete(url, {id}) {
    return this._api.delete(url, {id});
  }

}
