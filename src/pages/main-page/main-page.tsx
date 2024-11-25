import {OfferPreviews} from '../../types/offer-preview.ts';
import {Helmet} from 'react-helmet-async';
import OffersList from '../../components/offers-list/offers-list.tsx';
import Header from '../../components/header/header';
import {AppRoute, Cities, SortingOptions} from '../../const.ts';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Map from '../../components/map/map.tsx';
import {useAppSelector} from '../../hooks';
import CitiesList from '../../components/cities-list/cities-list.tsx';

function MainPage(): JSX.Element{
  const offerPreviews = useAppSelector((state) => state.offerPreviewsList);
  const [, setCurrentCityOffers] = useState<OfferPreviews>(offerPreviews);

  const city = useAppSelector((state) => state.city);
  useEffect(() => {
    const filteredOffers = offerPreviews.filter((offerPreview) => offerPreview.city.name === city);
    setCurrentCityOffers(filteredOffers);
  }, [city, offerPreviews]);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const selectedOffer = offerPreviews.find((offer) => offer.id === activeOfferId);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Link className="header__logo-link" to={AppRoute.MainPage}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
            <Header offers={offerPreviews}/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities}/>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${offerPreviews.length} places to stay in ${city}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  {SortingOptions.map((option) => (
                    <li key={option} className="places__option" tabIndex={0}>
                      {option}
                    </li>
                  ))}
                </ul>
              </form>
              <OffersList
                offers={offerPreviews}
                onActiveOfferChange={setActiveOfferId}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={offerPreviews[0].city}
                offers={offerPreviews}
                selectedOffer={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
