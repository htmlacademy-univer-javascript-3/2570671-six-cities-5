import {OfferPreviews} from '../../types/offer-preview.ts';
import {Helmet} from 'react-helmet-async';
import OffersList from '../../components/offers-list/offers-list.tsx';
import Header from '../../components/header/header';
import {AppRoute, Cities} from '../../const.ts';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Map from '../../components/map/map.tsx';
import {useAppSelector} from '../../hooks';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';

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

  const [currentSortingType, setCurrentSortingType] = useState('popular');

  const handleSortingChange = (sortingType: string) => {
    setCurrentSortingType(sortingType);
  };

  const sortedOffers = () => {
    switch (currentSortingType) {
      case 'lowToHigh':
        return [...offerPreviews].sort((a, b) => a.price - b.price);
      case 'highToLow':
        return [...offerPreviews].sort((a, b) => b.price - a.price);
      case 'topRated':
        return [...offerPreviews].sort((a, b) => b.rating - a.rating);
      default:
        return offerPreviews;
    }
  };

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
              <SortingOptions onSortingChange={handleSortingChange} currentSortingType={currentSortingType} />
              <OffersList offers={sortedOffers()} onActiveOfferChange={setActiveOfferId}/>
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
