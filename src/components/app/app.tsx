import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {Provider} from 'react-redux';
import {store} from '../../store';
import HistoryRouter from '../history-router/history-route.tsx';
import browserHistory from '../../browser-history.ts';
import MemoizedMainPage from '../../pages/main-page/main-page';
import MemoizedFavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import MemoizedOfferPage from '../../pages/offer-page/offer-page.tsx';
import MemoizedNotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import LoginPage from '../../pages/login-page/login-page.tsx';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.MainPage}
            element={<MemoizedMainPage />}
          />
          <Route
            path={AppRoute.LoginPage}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.FavoritesPage}
            element={
              <PrivateRoute>
                <MemoizedFavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.OfferPage}`}
            element={<MemoizedOfferPage />}
          />
          <Route
            path={AppRoute.NotFoundPage}
            element={<MemoizedNotFoundPage />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>
  );
}

export default App;
