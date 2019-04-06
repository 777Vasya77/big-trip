import * as util from './util';
import store from './store/store';
import {renderFilters} from './components/filter/render-filter';
import {renderTripPoints} from './components/point/render-points';
import {sortPoints} from './components/point/sort-points';
import {navbarInit} from './components/navbar/nav-bar';

const appInit = () => {
  navbarInit();
  renderFilters();
  renderTripPoints();
  sortPoints(store.state.points);
  util.setTotalPrice(); // TODO это лучше перенести в navbar
  util.renderCitiesTitle();
};

util.showLoadingMessage(); // TODO это лучше перенести в renderTripPoints
store.loadData()
  .then(appInit)
  .catch(util.showLoadingError);
