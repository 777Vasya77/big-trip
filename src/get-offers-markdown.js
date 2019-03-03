import {getRandomInteger} from './util';

export default (offers) => {
  return offers.sort(() => 0.5 - Math.random())
    .slice(0, getRandomInteger(0, 2))
    .map((item) => {
      return `
        <li>
          <button class="trip-point__offer">${item.title} +&euro;&nbsp;${item.price}</button>
        </li>
      `;
    })
    .join(``);
};
