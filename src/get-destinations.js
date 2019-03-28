import API from './api';

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

export const getDestinations = () => {
  return api.get(`destinations`);
};
