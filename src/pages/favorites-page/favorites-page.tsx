import Footer from '../../components/footer/footer';
import MemoizedOfferList from '../../components/offers-list/offers-list';
import MemoizedHeader from '../../components/header/header';
import {memo, useMemo} from 'react';
import {useAppSelector} from '../../hooks';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = useMemo(() => offers.filter((offer) => offer.isBookmarked), [offers]);

  return (
    <div className="page">
      <MemoizedHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <MemoizedOfferList
              offers={favoriteOffers}
              className='favorites__places'
            />
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

const MemoizedFavoritesPage = memo(FavoritesPage);
export default MemoizedFavoritesPage;
