import {useState} from 'react';
import Map from '../../components/map/map.tsx';
import {SortType} from '../../types/sort.ts';
import {useDispatch, useSelector} from 'react-redux';
import {Offers} from '../../types/offer.ts';
import {AppState} from '../../store/reducer.ts';
import {AppDispatch} from '../../store';
import {selectCity, selectSort} from '../../store/action.ts';
import {SortOptions} from '../../components/sort-options/sort-options.tsx';
import OffersList from '../../components/offers-list/offers-list.tsx';
import LoadingPage from '../loading-page/loading-page.tsx';
import Header from '../../components/header/header.tsx';

function MainPage() {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  function onMouseEnter(id: string) {
    setActiveOfferId(id);
  }

  function onMouseLeave(id: string) {
    if (activeOfferId === id) {
      setActiveOfferId(null);
    }
  }

  const chosenCity = useSelector<AppState, string>((state) => state.selectedCity);
  const chosenSort = useSelector<AppState, SortType>((state) => state.sortType);
  const offers = useSelector<AppState, Offers>((state) => state.offers);
  const cities = useSelector<AppState, string[]>((state) => state.cities);

  const chosenOffers = offers
    .filter((offer) => offer.city.name === chosenCity)
    .sort(
      (left, right) => {
        if (chosenSort === SortType.PriceHighToLow) {
          return right.price - left.price;
        } else if (chosenSort === SortType.PriceLowToHigh) {
          return left.price - right.price;
        } else if (chosenSort === SortType.TopRatedFirst) {
          return right.rating - left.rating;
        }

        return 0;
      }
    );

  const dispatch = useDispatch<AppDispatch>();

  const handleCityChoose = (city: string) => {
    dispatch(selectCity(city));
  };

  const handleSortingChoose = (sortType: SortType) => {
    dispatch(selectSort(sortType));
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                cities
                  .map((item) => (
                    <li
                      key={item}
                      className="locations__item"
                      onClick={() => handleCityChoose(item)}
                    >
                      <a className={`locations__item-link tabs__item ${item === chosenCity && 'tabs__item--active'}`}
                        href="#"
                      >
                        <span>{item}</span>
                      </a>
                    </li>)
                  )
              }
            </ul>
          </section>
        </div>
        {
          chosenOffers.length !== 0
            ?
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{chosenOffers.length} places to stay in {chosenCity}</b>
                  <SortOptions
                    sortType={chosenSort}
                    handleSortingChoose={handleSortingChoose}
                  />
                  <OffersList
                    offers={chosenOffers}
                    className={'cities__places-list places__list tabs__content'}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                </section>

                <div className="cities__right-section">
                  <Map
                    city={chosenOffers[0].city}
                    offers={chosenOffers}
                    activeOfferId={activeOfferId}
                    className="cities__map map"
                  />
                </div>
              </div>
            </div>
            : <LoadingPage />
        }
      </main>
    </div>
  );
}

export default MainPage;
