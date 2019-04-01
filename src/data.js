// todo давай тут сделаем модуль для констант

// todo enum нам предлагает удобный способ сделать свой тип данных
export const Point = {
  TAXI: `taxi`,
  BUS: `bus`
};
export const Title = {
  [Point.TAXI]: `Taxi`,
};

export const Icon = {
  [Point.BUS]: `🚕`,
};

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
