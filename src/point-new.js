import Component from './component';
import flatpickr from 'flatpickr';
import moment from 'moment';
import {PointType} from './data';
import {disableForm} from './util';
import store from './store';

const FIRST = Object.keys(PointType)[0];


export default class PointNew extends Component {

  constructor() {
    super();

    this._type = PointType[FIRST];
    this._offers = store.state.offers.find((it) => it.type === this._type.title.toLowerCase()).offers;
    this._timetable = {
      from: new Date(),
      to: new Date(),
    };
    this._price = 0;

    this._onSubmit = null;
    this._onCancel = null;
    this._onDelete = null;
    this._onType = null;

    this._onEscKeyup = this._onEscKeyup.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onTypeChange = this._onTypeChange.bind(this);
  }

  get typeIcon() {
    return this._type.icon;
  }

  get typeTitle() {
    return this._type.title;
  }

  get template() {
    return `
      <article class="point">
        <form>
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day">
            </label>
      
            <div class="travel-way">
              ${this._getTravelWaySelectMarkdown()}
            </div>
            
            <div class="point__time">
              choose time
              <input class="point__input" type="text" value="19:00" name="date-start" placeholder="19:00">
              <input class="point__input" type="text" value="21:00" name="date-end" placeholder="21:00">
            </div>
            
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._price}" name="price">
            </label>
      
            <div class="point__buttons" style="margin-left: auto;">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>
     
          </header>
        
          <section class="point__details">
            
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
      
              <div class="point__offers-wrap">
                ${this._getOffersMarkdown()}
              </div>
      
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>
    `.trim();
  }

  set offers(data) {
    this._offers = (data) ? data.offers : [];
  }

  set type(data) {
    if (data) {
      this._type = data;
    }
  }

  set onCancel(fn) {
    if (typeof fn === `function`) {
      this._onCancel = fn;
    }
  }

  set onDelete(fn) {
    if (typeof fn === `function`) {
      this._onDelete = fn;
    }
  }

  set onSubmit(fn) {
    if (typeof fn === `function`) {
      this._onSubmit = fn;
    }
  }

  set onType(fn) {
    if (typeof fn === `function`) {
      this._onType = fn;
    }
  }

  block() {
    const form = this._element.querySelector(`form`);
    disableForm(form);
  }

  unblock() {
    const form = this._element.querySelector(`form`);
    disableForm(form, false);
  }

  saveBtnTextChange(text) {
    this._element
      .querySelector(`.point__button--save`)
      .innerText = text;
  }

  _getTravelWaySelectMarkdown() {
    return `
      <label class="travel-way__label" for="travel-way__toggle">${this.typeIcon}️</label>
      
      <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
      <div class="travel-way__select">
        <div class="travel-way__select-group">
        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi" ${this.typeTitle === `Taxi` && `checked`}>
        <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>
  
        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus" ${this.typeTitle === `Bus` && `checked`}>
        <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>
  
        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train" ${this.typeTitle === `Train` && `checked`}>
        <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>
  
        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-ship" name="travel-way" value="ship" ${this.typeTitle === `Ship` && `checked`}>
        <label class="travel-way__select-label" for="travel-way-ship">🛳 ship</label>
  
        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-transport" name="travel-way" value="transport" ${this.typeTitle === `Transport` && `checked`}>
        <label class="travel-way__select-label" for="travel-way-transport">🚊 transport</label>
  
        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="flight" ${this.typeTitle === `Flight` && `checked`}>
        <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
      </div>
  
      <div class="travel-way__select-group">
        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in" ${this.typeTitle === `Check-in` && `checked`}>
        <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>
  
        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing" ${this.typeTitle === `Sightseeing` && `checked`}>
        <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
  
        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-restaurant" name="travel-way" value="restaurant" ${this.typeTitle === `Restaurant` && `checked`}>
        <label class="travel-way__select-label" for="travel-way-restaurant">🍴️️ Restaurant</label>
      </div>
    </div>
    `;
  }

  _getOffersMarkdown() {
    return this._offers
      .map((item) => {
        const title = (item.name) ? item.name : item.title;
        return `
        <input
          class="point__offers-input visually-hidden"
          type="checkbox"
          id="${title.toLowerCase().split(` `).join(`-`)}"
          name="offer"
          ${item.accepted && `checked`}
          value="${title.toLowerCase().split(` `).join(`-`)}">
        <label for="${title.toLowerCase().split(` `).join(`-`)}" class="point__offers-label">
          <span class="point__offer-service">${title}</span> + €<span class="point__offer-price">${item.price}</span>
        </label>
        `.trim();
      })
      .join(``);
  }

  _bind() {
    this._element
      .querySelector(`form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);

    document.addEventListener(`keyup`, this._onEscKeyup);

    document.addEventListener(`click`, this._onDocumentClick, true);

    this._element
      .querySelector(`button[type=reset]`)
      .addEventListener(`click`, this._onDeleteButtonClick);

    this.element
      .querySelector(`.travel-way__select`)
      .addEventListener(`change`, this._onTypeChange);

    flatpickr(this._element.querySelector(`.point__input[name=day]`), {
      altInput: true,
      altFormat: `d M`,
      [`time_24hr`]: true,
      defaultDate: +this._timetable.from,
      dateFormat: `U`
    });
    flatpickr(this._element.querySelector(`.point__time > input[name=date-start]`), {
      enableTime: true,
      altInput: true,
      altFormat: `H:i`,
      [`time_24hr`]: true,
      defaultDate: +this._timetable.from,
      dateFormat: `U`
    });
    flatpickr(this._element.querySelector(`.point__time > input[name=date-end]`), {
      enableTime: true,
      altInput: true,
      altFormat: `H:i`,
      [`time_24hr`]: true,
      defaultDate: +this._timetable.to,
      dateFormat: `U`
    });
  }

  _unbind() {
    this._element
      .querySelector(`form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);

    document.removeEventListener(`keyup`, this._onEscKeyup);

    document.removeEventListener(`click`, this._onDocumentClick, true);

    this._element
      .querySelector(`button[type=reset]`)
      .removeEventListener(`click`, this._onDeleteButtonClick);

    this.element
      .querySelector(`.travel-way__select`)
      .removeEventListener(`change`, this._onTypeChange);

    flatpickr(this._element.querySelector(`.point__time > input[name=date-start]`)).destroy();
    flatpickr(this._element.querySelector(`.point__time > input[name=date-end]`)).destroy();
  }

  _onEscKeyup(evt) {
    if (evt.key === `Escape`) {
      this._onCancel();
    }
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.point > form`));
    const newData = this.processForm(formData);

    this._onSubmit(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();

    this._onDelete();
  }

  _onTypeChange(evt) {
    this._onType(evt);
    this._element.querySelector(`.travel-way__label`).innerText = this.typeIcon;

    this._element.querySelector(`.point__offers-wrap`).innerHTML = this._getOffersMarkdown();
  }

  _onDocumentClick(evt) {
    const flatpickrCalendars = document.querySelectorAll(`.flatpickr-calendar`);
    const isOnElementClick = this._element.contains(evt.target);
    const isOnFlatpickrCalendarClick = Array.from(flatpickrCalendars).some((item) => item.contains(evt.target));

    if (!isOnElementClick && !isOnFlatpickrCalendarClick) {
      this._onCancel();
    }
  }

  static createMapper(target) {
    return {
      day() {
        // ToDo: Из формы приходит ["day", ""]. Без понятия что это... Надо разобраться!
      },
      [`travel-way`](value) {
        target.type = PointType[value.split(`-`).join(``).toUpperCase()];
      },
      [`date-start`](value) {
        target.timetable.from = moment.unix(value).format(`x`);
      },
      [`date-end`](value) {
        target.timetable.to = moment.unix(value).format(`x`);
      },
      price(value) {
        target.price = value;
      },
      offer(value) {
        target.offers.forEach((item) => {
          const title = (item.title)
            ? item.title.toLowerCase().split(` `).join(`-`)
            : item.name.toLowerCase().split(` `).join(`-`);

          if (title === value) {
            item.accepted = true;
          }
        });
      },
    };

  }

  processForm(formData) {
    const entry = {
      type: {},
      timetable: {
        from: new Date(),
        to: new Date()
      },
      offers: this._offers,
      price: 0,
    };

    const pointEditMapper = PointNew.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }

    return entry;
  }
}
