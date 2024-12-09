import MainPage from '../../pages/main-page/main-page';
import {Route, Routes} from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import {AppRoute} from '../../const.ts';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {Provider} from 'react-redux';
import {store} from '../../store';
import HistoryRouter from '../history-router/history-route.tsx';
import browserHistory from '../../browser-history.ts';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.MainPage}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.LoginPage}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.FavoritesPage}
            element={
              <PrivateRoute>
                <FavoritesPage
                  offers = {[]}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.OfferPage}`}
            element={<OfferPage />}
          />
          <Route
            path={AppRoute.NotFoundPage}
            element={<NotFoundPage />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>
  );
}

export default App;
