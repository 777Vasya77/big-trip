export const getDestinationMarkdown = (data) => {
  return `
    <span ${!data._destination && `style="display:none"`}>
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${data.description}</p>
      <div class="point__destination-images">
        ${data.images}
      </div>
    </span>`;
};
