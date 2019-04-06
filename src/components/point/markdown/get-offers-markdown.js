export const getOffersMarkdown = (data) => {
  return data._offers
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
};
