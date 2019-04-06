export const getTableOffersMarkdown = (data) => {
  return data._offers
    .slice(0, 3)
    .map((item) => {
      const title = (item.name) ? item.name : item.title;
      return `
        <li>
          <button class="trip-point__offer">${title} +&euro;&nbsp;${item.price}</button>
        </li>`.trim();
    })
    .join(``);
};
