import MainPage from '../../pages/main-page/main-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {Provider} from 'react-redux';
import {appStateStore} from '../../store';

function App(): JSX.Element {
  return (
    <Provider store={appStateStore}>
      <BrowserRouter>
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
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
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
      </BrowserRouter>
    </Provider>
  );
}

export default App;
