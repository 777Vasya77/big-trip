export default (filter) => {
  return `
    <input 
        type="radio" 
        id="filter-${filter.name.toLowerCase()}" 
        name="filter" 
        value="${filter.name.toLowerCase()}" 
        ${filter.checked ? `checked` : ``}
     >
    <label class="trip-filter__item" for="filter-${filter.name.toLowerCase()}">
        ${filter.name.toUpperCase()}
     </label>
  `;
};
