import moment from 'moment';

export const clearNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

export const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
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

export const getTimeFromTimestamp = (timestamp) => {
  return moment.unix(timestamp).format(`HH:MM`);
};

export const getTimetableDiff = (from, to) => {
  let hours = moment
    .duration(moment.unix(to).diff(moment.unix(from)))
    .asHours();
  return `${hours}h 00m`;
};

export const getRandomText = (text) => {
  const textArray = text.split(`. `);
  textArray
    .sort(() => 0.5 - Math.random())
    .splice(0, 3)
    .join(``);
};
