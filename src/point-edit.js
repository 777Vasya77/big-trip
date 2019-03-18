import Component from './component';
import flatpickr from 'flatpickr';
import {Offers, PointTypes} from './data';
import moment from "moment";

export default class PointEdit extends Component {

  constructor(data) {
    super();

    this._type = data.type;
    this._offers = data.offers;
    this._timetable = data.timetable;
    this._price = data.price;
    this._description = data.description;
    this._images = data.images;

    this._onSubmit = null;
    this._onCancel = null;

    this._onEscKeyup = this._onEscKeyup.bind(this);
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  get timeFrom() {
    return moment.unix(this._timetable.from).format(`HH:MM`);
  }

  get timeTo() {
    return moment.unix(this._timetable.to).format(`HH:MM`);
  }

  get typeIcon() {
    return this._type.icon;
  }

  get typeTitle() {
    return this._type.title;
  }

  get images() {
    return this._images
      .map((item) => {
        return `<img src="${item}/?r=${Math.random()}" alt="picture from place" class="point__destination-image">`;
      })
      .join(``);
  }

  get template() {
    return `
      <article class="point">
        <form action="" method="get">
          <header class="point__header">
              <label class="point__date">
                choose day
                <input class="point__input" type="text" placeholder="MAR 18" name="day">
              </label>
        
              <div class="travel-way">
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
                </div>
              
              <div class="point__destination-wrap">
                <label class="point__destination-label" for="destination">${this.typeTitle} to</label>
                <input class="point__destination-input" list="destination-select" id="destination" value="Chamonix" name="destination">
                <datalist id="destination-select">
                  <option value="airport"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                  <option value="hotel"></option>
                </datalist>
              </div>
              
              <label class="point__time">
                choose time
                <input class="point__input" type="text" value="${this.timeFrom} — ${this.timeTo}" name="time" placeholder="${this.timeFrom} — ${this.timeTo}">
              </label>
              
              <label class="point__price">
                write price
                <span class="point__price-currency">€</span>
                <input class="point__input" type="text" value="${this._price}" name="price">
              </label>
        
              <div class="point__buttons">
                <button class="point__button point__button--save" type="submit">Save</button>
                <button class="point__button" type="reset">Delete</button>
              </div>
        
              <div class="paint__favorite-wrap">
                <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
                <label class="point__favorite" for="favorite">favorite</label>
              </div>
            </header>
        
          <section class="point__details">
            
              <section class="point__offers" ${(!this._offers.length) ? `style="display:none"` : ``}>
                <h3 class="point__details-title">offers</h3>
        
                <div class="point__offers-wrap">
                  ${this._getOffersMarkdown()}
                </div>
        
              </section>
              <section class="point__destination">
                <h3 class="point__details-title">Destination</h3>
                <p class="point__destination-text">${this._description}</p>
                <div class="point__destination-images">
                  ${this.images}
                </div>
              </section>
              <input type="hidden" class="point__total-price" name="total-price" value="">
            </section>
          </form>
      </article>
    `.trim();
  }

  set onCancel(fn) {
    if (typeof fn === `function`) {
      this._onCancel = fn;
    }
  }

  set onSubmit(fn) {
    if (typeof fn === `function`) {
      this._onSubmit = fn;
    }
  }

  update(data) {
    this._type = data.type;
    this._timetable = data.timetable;
    this._offers = data.offers;
    this._price = data.price;
  }

  _getOffersMarkdown() {
    return this._offers
      .map((item) => {
        return `
        <input
          class="point__offers-input visually-hidden"
          type="checkbox"
          id="${item.title.toLowerCase().split(` `).join(`-`)}"
          name="offer"
          value="${item.title.toLowerCase().split(` `).join(`-`)}">
        <label for="${item.title.toLowerCase().split(` `).join(`-`)}" class="point__offers-label">
          <span class="point__offer-service">${item.title}</span> + €<span class="point__offer-price">${item.price}</span>
        </label>`.trim();
      })
      .join(``);
  }

  _bind() {
    this._element
      .querySelector(`form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    document.addEventListener(`keyup`, this._onEscKeyup);

    flatpickr(this._element.querySelector(`.point__time > .point__input`), {
      range: true,
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: `h:i`,
      dateFormat: `U`
    });
  }

  _unbind() {
    this._element
      .querySelector(`form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    document.removeEventListener(`keyup`, this._onEscKeyup);

    flatpickr(this._element.querySelector(`.point__time > .point__input`)).destroy();
  }

  _onEscKeyup(evt) {
    if (evt.key === `Escape`) {
      this._onCancel();
    }
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.point > form`));
    const newData = PointEdit.processForm(formData);

    this._onSubmit(newData);
  }

  static createMapper(target) {
    return {
      [`travel-way`](value) {
        target.type = PointTypes[value.toUpperCase()];
      },
      timetable(value) {
        target.timetable.from = value;
        target.timetable.to = value;
      },
      offer(value) {
        target.offers.push(Offers[value]);
      },
      price(value) {
        target.price = value;
      }
    };

  }

  static processForm(formData) {
    const entry = {
      type: {},
      timetable: {
        from: new Date(),
        to: new Date()
      },
      offers: [],
      price: 0,
      description: ``,
      images: []
    };

    const pointEditMapper = PointEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }

    return entry;
  }
}