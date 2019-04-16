export const ApiData = {
  AUTHORIZATION: `Basic tyweefj3333wefhjres44433`,
  END_POINT: `https://es8-demo-srv.appspot.com/big-trip`
};

export const Message = {
  LOADING_TEXT: `Loading route...`,
  LOADING_FAILURE_TEXT: `Something went wrong while loading your route info. Check your connection or try again later`,
  SAVE: `Save`,
  SAVING: `Saving...`,
  DELETE: `Delete`,
  DELETING: `Deleting...`,
};

export const FilterName = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const SortName = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const Point = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  CHECKIN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`,
};

export const Title = {
  [Point.TAXI]: `Taxi`,
  [Point.BUS]: `Bus`,
  [Point.TRAIN]: `Train`,
  [Point.SHIP]: `Ship`,
  [Point.TRANSPORT]: `Transport`,
  [Point.CHECKIN]: `Checkin`,
  [Point.DRIVE]: `Drive`,
  [Point.FLIGHT]: `Flight`,
  [Point.SIGHTSEEING]: `Sightseeing`,
  [Point.RESTAURANT]: `Restaurant`,
};

export const Icon = {
  [Point.TAXI]: `🚕`,
  [Point.BUS]: `🚌`,
  [Point.TRAIN]: `🚂`,
  [Point.SHIP]: `🛳️`,
  [Point.TRANSPORT]: `🚊`,
  [Point.DRIVE]: `🚗`,
  [Point.FLIGHT]: `✈️️`,
  [Point.CHECKIN]: `🏨`,
  [Point.SIGHTSEEING]: `🏛️️️`,
  [Point.RESTAURANT]: `🍴️️`,
};

export const ANIMATION_TIMEOUT = 0.6;
export const IS_FAVORITE = `on`;
export const POINTS_STORE_KEY = `tasks-store-key`;
export const BAR_HEIGHT = 55;
