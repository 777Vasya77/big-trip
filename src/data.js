import * as util from './util';

const POINT_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const MIN_POINT_PRICE = 20;
const MAX_POINT_PRICE = 100;
const MAX_OFFERS_COUNT = 2;

const offers = [
  {
    title: `Add luggage`,
    price: util.getRandomInteger(10, 100)
  },
  {
    title: `Switch to comfort class`,
    price: util.getRandomInteger(10, 100)
  },
  {
    title: `Add meal`,
    price: util.getRandomInteger(10, 100)
  },
  {
    title: `Choose seats`,
    price: util.getRandomInteger(10, 100)
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

export const PointType = {
  TAXI: {
    title: `Taxi`,
    icon: `🚕`
  },
  BUS: {
    title: `Bus`,
    icon: `🚌`
  },
  TRAIN: {
    title: `Train`,
    icon: `🚂`
  },
  SHIP: {
    title: `Ship`,
    icon: `🛳️`
  },
  TRANSPORT: {
    title: `Transport`,
    icon: `🚊`
  },
  DRIVE: {
    title: `Drive`,
    icon: `🚗`
  },
  FLIGHT: {
    title: `Flight`,
    icon: `✈️️`
  },
  CHECKIN: {
    title: `Check-in`,
    icon: `🏨`
  },
  SIGHTSEEING: {
    title: `Sightseeing`,
    icon: `🏛️️️`
  },
  RESTAURANT: {
    title: `Restaurant`,
    icon: `🍴️️`
  },
};

export const Offer = {
  ADD_LUGGAGE: {
    title: `Add luggage`,
    price: util.getRandomInteger(10, 100)
  },
  SWITCH_TO_COMFORT_CLASS: {
    title: `Switch to comfort class`,
    price: util.getRandomInteger(10, 100)
  },
  ADD_MEAL: {
    title: `Add meal`,
    price: util.getRandomInteger(10, 100)
  },
  CHOOSE_SEATS: {
    title: `Choose seats`,
    price: util.getRandomInteger(10, 100)
  }
};

export const cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
];

export const getTripPointData = () => (
  {
    date: util.getRandomDate(),
    type: util.getRandomArrayItem(pointTypes),
    timetable: {
      from: util.getRandomTimestampFrom(),
      to: util.getRandomTimestampTo()
    },
    offers: util.getRandomArrayItems(offers, util.getRandomInteger(0, MAX_OFFERS_COUNT)),
    price: util.getRandomInteger(MIN_POINT_PRICE, MAX_POINT_PRICE),
    description: util.getRandomText(POINT_DESCRIPTION),
    images: new Array(3).fill(`http://picsum.photos/300/150}`)
  }
);

export const tripPoints = new Array(7)
  .fill(``)
  .map(() => getTripPointData());
