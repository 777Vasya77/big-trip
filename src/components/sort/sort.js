import Component from '../component';

export default class Sort extends Component {
  constructor(data) {
    super();

    this._name = data.name;
    this._checked = data.checked;

    this._onSort = () => {};

    this._onSortClick = this._onSortClick.bind(this);
  }

  get name() {
    return this._name.toLowerCase();
  }

  get template() {
    return `
    <span>
      <input type="radio" name="trip-sorting" id="sorting-${this.name}" value="${this.name}" ${this._checked && `checked`}>
      <label class="trip-sorting__item trip-sorting__item--${this.name}" for="sorting-${this.name}">${this.name}</label>
     </span>
    `.trim();
  }

  set onSort(fn) {
    if (typeof fn === `function`) {
      this._onSort = fn;
    }
  }

  _bind() {
    this._element.addEventListener(`change`, this._onSortClick);
  }

  _unbind() {
    this._element.removeEventListener(`change`, this._onSortClick);
  }

  _onSortClick() {
    return this._onSort && this._onSort();
  }
}
