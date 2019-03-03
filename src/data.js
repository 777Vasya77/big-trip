import {getRandomInteger, getRandomText, getRandomTimestampFrom, getRandomTimestampTo} from './util';

const pointDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const dataFilters = [
  {
    name: `Everything`,
    checked: true
  },
  {
    name: `Future`,
    checked: false
  },
  {
    name: `Past`,
    checked: false
  }
];

export const offers = [
  {
    title: `Add luggage`,
    price: getRandomInteger(10, 100)
  },
  {
    title: `Switch to comfort class`,
    price: getRandomInteger(10, 100)
  },
  {
    title: `Add meal`,
    price: getRandomInteger(10, 100)
  },
  {
    title: `Choose seats`,
    price: getRandomInteger(10, 100)
  }
];

const pointTypes = [
  {
    title: `Taxi`,
    icon: `🚕`
  },
  {
    title: `Bus`,
    icon: `🚌`
  },
  {
    title: `Train`,
    icon: `🚂`
  },
  {
    title: `Ship`,
    icon: `🛳️`
  },
  {
    title: `Transport`,
    icon: `🚊`
  },
  {
    title: `Drive`,
    icon: `🚗`
  },
  {
    title: `Flight`,
    icon: `✈️️`
  },
  {
    title: `Check-in`,
    icon: `🏨`
  },
  {
    title: `Sightseeing`,
    icon: `🏛️️️`
  },
  {
    title: `Restaurant`,
    icon: `🍴️️`
  },
];

export const getTripPointData = () => (
  {
    type: pointTypes[getRandomInteger(0, 9)],
    timetable: {
      from: getRandomTimestampFrom(),
      to: getRandomTimestampTo()
    },
    price: getRandomInteger(20, 100),
    description: getRandomText(pointDescription),
    images: [
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
    ]
  }
);
