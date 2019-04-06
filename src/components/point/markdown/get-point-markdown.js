export const getPointMarkdown = (data) => {
  return `
    <article class="trip-point">
      <i class="trip-icon">${data._type.icon}</i>
      <h3 class="trip-point__title">${data._type.title}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${data.timeFrom} - ${data.timeTo}</span>
        <span class="trip-point__duration">${data.timeDiff}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${data._price}</p>
      <ul class="trip-point__offers">
        ${data._getOffersMarkdown(data._offers)}
      </ul>
    </article>`.trim();
};
