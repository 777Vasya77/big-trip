const FilterName = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`
};

export const dataFilters = [
  {
    name: FilterName.EVERYTHING,
    checked: true
  },
  {
    name: FilterName.FUTURE,
    checked: false
  },
  {
    name: FilterName.PAST,
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

export const cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
];
