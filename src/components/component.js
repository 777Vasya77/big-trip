import {createElement} from '../util';

export default class Component {

  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  get element() {
    return (this._element)
      ? this._element
      : this.render();
  }

  render() {
    this._element = createElement(this.template);
    this._bind();
    return this._element;
  }

  unrender() {
    this._unbind();
    this._element.remove();
    this._element = null;
  }

  update() {}

  _bind() {}

  _unbind() {}

}
