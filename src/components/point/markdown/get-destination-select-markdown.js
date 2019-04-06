export const getDestinationSelectMarkdown = (data) => {
  return data._destinations.map((item) => {
    return `<option value="${item.name}"></option>`.trim();
  }).join(``);
};
