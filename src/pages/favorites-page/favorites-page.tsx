import Footer from '../../components/footer/footer';
import MemoizedHeader from '../../components/header/header';
import {memo, useMemo} from 'react';
import MemoizedLoadingPage from '../loading-page/loading-page.tsx';
import {BookmarkAction} from '../../types/bookmark-action.ts';
import {useSelector} from 'react-redux';
import {AppState} from '../../store/reducer.ts';
import {Offers} from '../../types/offer.ts';
import MemoizedFavoriteOffersList from '../../components/favorite-offers-list/favorite-offers-list.tsx';

type FavoritesPageProps = {
  onBookmarkStatusChange: (action: BookmarkAction) => void;
};

function FavoritesPage({onBookmarkStatusChange}: FavoritesPageProps): JSX.Element {
  const favoriteOffers = useSelector<AppState, Offers | undefined>((state) => state.bookmarkedOffers);
  const cities = useMemo(() => favoriteOffers ? Array.from(new Set(favoriteOffers.map((offer) => offer.city.name))) : [], [favoriteOffers]);

  if (favoriteOffers === undefined) {
    return (<MemoizedLoadingPage />);
  }

  return (
    <div className="page">
      <MemoizedHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length <= 0 ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  cities.map((city) => (
                    <MemoizedFavoriteOffersList
                      key={city}
                      city={city}
                      offers={favoriteOffers.filter((offer) => offer.city.name === city)}
                      onBookmarkStatusChange={onBookmarkStatusChange}
                    />)
                  )
                }
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

const MemoizedFavoritesPage = memo(FavoritesPage);
export default MemoizedFavoritesPage;
