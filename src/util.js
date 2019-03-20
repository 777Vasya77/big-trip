import moment from 'moment';

export const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const getRandomDate = () => {
  return moment()
    .subtract(`${getRandomInteger(1, 7)}`, `days`)
    .add(`${getRandomInteger(1, 7)}`, `days`)
    .format(`X`);
};

export const getRandomTimestampFrom = () => {
  return moment()
    .subtract(`${getRandomInteger(1, 12)}`, `hours`)
    .format(`X`);
};

export const getRandomTimestampTo = () => {
  return moment.unix(getRandomTimestampFrom())
    .add(`${getRandomInteger(12, 24)}`, `hours`)
    .format(`X`);
};

export const getRandomText = (text) => {
  return text
    .split(`. `)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .join(``);
};

export const getRandomArrayItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

export const getRandomArrayItems = (array, itemsCount) => {
  return array
    .sort(() => 0.5 - Math.random())
    .slice(0, itemsCount);
};

export const generateTripPointsTitle = (array) => {
  return array.join(`&nbsp;&mdash;&nbsp;`);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const parseTimestamp = (string) => {
  const [from, to] = string.split(` to `);
  return {from, to};
};

export const removeFromArray = (array, item) => {
  const index = array.findIndex((it) => it === item);
  array.splice(index, 1);
};
