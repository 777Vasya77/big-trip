export default (offers) => {
  return offers
    .map((item) => {
      return `
        <li>
          <button class="trip-point__offer">${item.title} +&euro;&nbsp;${item.price}</button>
        </li>
      `;
    })
    .join(``);
};
