import store from './store/store';
import {showLoadingError} from './util';
import {renderFilters} from './components/filter/render-filter';
import {renderTripPoints} from './components/point/render-points';
import {sortPoints} from './components/point/sort-points';
import {navbarInit} from './components/navbar/nav-bar';

const appInit = () => {
  navbarInit();
  renderFilters();
  renderTripPoints();
  sortPoints(store.state.points);
};

store.loadData()
  .then(appInit)
  // .catch(showLoadingError);
