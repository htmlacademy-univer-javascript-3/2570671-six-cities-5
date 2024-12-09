import OffersList from '../../components/offers-list/offers-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import {Offers} from '../../types/offer.ts';

type FavoritesPageProps = {
  offers: Offers;
}

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <OffersList
              offers={offers.filter((offer) => offer.isBookmarked)}
              className='favorites__places'
            />
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesPage;
