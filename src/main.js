import store from './store/store';
import {showLoadingError} from './util';
import {renderFilters} from './components/filter/render-filter';
import {renderTripPoints} from './components/point/render-points';
import {navbarInit} from './components/navbar/nav-bar';
import {renderSorts} from './components/sort/render-sort';

const appInit = () => {
  navbarInit();
  renderSorts();
  renderFilters();
  renderTripPoints();
};

store.loadData()
  .then(appInit)
  .catch(showLoadingError);
