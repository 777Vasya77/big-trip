export const getPointEditMarkdown = (data) => {
  return `
      <article class="point">
        <form>
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day">
            </label>
      
            <div class="travel-way">
              ${data._getTravelWaySelectMarkdown()}
            </div>
            
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${data.typeTitle} to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${(data._destination) ? data._destination.name : ``}" name="destination" required>
              <datalist id="destination-select">
                ${data._getDestinationSelectMarkdown()}
              </datalist>
            </div>
            
            <div class="point__time">
              choose time
              <input class="point__input" type="text" value="19:00" name="date-start" placeholder="19:00">
              <input class="point__input" type="text" value="21:00" name="date-end" placeholder="21:00">
            </div>
            
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${data._price}" name="price">
            </label>
      
            <div class="point__buttons">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>
      
            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${data._isFavorite && `checked`}>
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
        
          <section class="point__details">
            
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
      
              <div class="point__offers-wrap">
                ${data._getOffersMarkdown()}
              </div>
      
            </section>
            <section class="point__destination">
              ${data.getDestinationMarkdown()}
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>
    `.trim();
};
