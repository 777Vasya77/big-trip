import {Icon, Point, Title} from '../../../data';

export const getTravelWaySelectMarkdown = (data) => {
  return `
    <label class="travel-way__label" for="travel-way__toggle">${data.typeIcon}️</label>
    
    <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
    <div class="travel-way__select">
      <div class="travel-way__select-group">
        ${Object.values(Point).map((item) => {
    return `
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${item}" name="travel-way" value="${item}" ${data.typeTitle === Title[item] && `checked`}>
            <label class="travel-way__select-label" for="travel-way-${item}">${Icon[item]} ${Title[item]}</label>
          `.trim();
  }).join(``)}
      </div>
    </div>
    `;
};
