import {Helmet} from 'react-helmet-async';
import OffersList from '../../components/offers-list/offers-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import {AppRoute} from '../../const.ts';
import {Link} from 'react-router-dom';
import {Offers} from '../../types/offer.ts';

type FavoritesPageProps = {
  offers: Offers;
}

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.MainPage}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <Header offers={offers}/>
          </div>
        </div>
      </header>

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
