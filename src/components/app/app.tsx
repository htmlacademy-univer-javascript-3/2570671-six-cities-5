import MainPage from '../../pages/main-page/main-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {HelmetProvider} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setOffers, setOffersList, setReviews} from '../../store/action.ts';

function App(): JSX.Element {
  const offerPreviews = useAppSelector((state) => state.offerPreviewsList);
  const reviews = useAppSelector((state) => state.reviews);
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  dispatch(setOffersList(offerPreviews));
  dispatch(setReviews(reviews));
  dispatch(setOffers(offers));
  return (
    <HelmetProvider>
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
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.OfferPage}/:id`}
            element={<OfferPage />}
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
