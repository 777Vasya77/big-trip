import Component from '../component';
import {FilterName} from '../../data';
import store from '../../store/store';

export default class Filter extends Component {
  constructor(data) {
    super();

    this._name = data.name;
    this._checked = data.checked;

    this._onFilter = () => {};
    this._onChecked = () => {};

    this._onFilterClick = this._onFilterClick.bind(this);
    this._onFilterChecked = this._onFilterChecked.bind(this);
  }

  get name() {
    return this._name.toLowerCase();
  }

  get template() {
    return `
    <span>
      <input
          type="radio"
          id="filter-${this.name}"
          name="filter"
          value="${this.name}"
          ${this._checked && `checked`}
       >
      <label class="trip-filter__item" for="filter-${this.name}">
          ${this.name}
       </label>
     </span>
    `.trim();
  }

  set onFilter(fn) {
    this._onFilter = this.checkFunction(fn) || this._onFilter;
  }

  set onChecked(fn) {
    this._onChecked = this.checkFunction(fn) || this._onChecked;
  }

  checkFilteredItems() {
    switch (this.name) {
      case FilterName.FUTURE:
        return store.getFuturePointsCount() === 0 && this._disabled();

      case FilterName.PAST:
        return store.getPastPointsCount() === 0 && this._disabled();

      default:
        return false;
    }
  }

  _disabled() {
    this._element
      .querySelector(`input[name=filter]`)
      .setAttribute(`disabled`, `disabled`);
  }

  _bind() {
    this._element.addEventListener(`change`, this._onFilterClick);
    this._element
      .querySelector(`input[name=filter]`)
      .addEventListener(`change`, this._onFilterChecked);
  }

  _unbind() {
    this._element.removeEventListener(`change`, this._onFilterClick);
    this._element
      .querySelector(`input[name=filter]`)
      .removeEventListener(`change`, this._onFilterChecked);
  }

  _onFilterClick() {
    return this._onFilter && this._onFilter();
  }

  _onFilterChecked() {
    return this._onChecked() && this._onChecked();
  }
}
