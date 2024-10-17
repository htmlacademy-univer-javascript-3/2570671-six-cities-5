import MainPage from '../../pages/main-page/main-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {PrivateRoute} from '../private-route/private-route.tsx';

type AppProps = {
  offersCount: number;
}

function App({ offersCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.MainPage}
          element={<MainPage offersCount={offersCount} />}
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
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.OfferPage}
          element={<OfferPage />}
        />
        <Route
          path={AppRoute.NotFoundPage}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
