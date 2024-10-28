import MainPage from '../../pages/main-page/main-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {OfferPreviews} from '../../types/offer-preview.ts';
import {Offers} from '../../types/offer.ts';
import {HelmetProvider} from 'react-helmet-async';

type AppProps = {
  offersCount: number;
  offerPreviews: OfferPreviews;
  offers: Offers;
}

function App({offersCount, offerPreviews, offers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.MainPage}
            element={<MainPage offersCount={offersCount} offers={offerPreviews}/>}
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
                <FavoritesPage offers={offerPreviews}/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.OfferPage}/:id`}
            element={<OfferPage offers={offers}/>}
          />
          <Route
            path={AppRoute.NotFoundPage}
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
