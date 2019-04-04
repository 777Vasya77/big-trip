import Component from '../component';

export default class Filter extends Component {
  constructor(data) {
    super();

    this._name = data.name;
    this._checked = data.checked;

    this._onFilter = null;

    this._onFilterClick = this._onFilterClick.bind(this);
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
    if (typeof fn === `function`) {
      this._onFilter = fn;
    }
  }

  _bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  _unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }

  _onFilterClick() {
    return this._onFilter && this._onFilter();
  }
}
