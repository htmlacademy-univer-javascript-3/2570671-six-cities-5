import {memo, useCallback, useMemo, useState} from 'react';
import {SortType} from '../../types/sort.ts';
import {useDispatch, useSelector} from 'react-redux';
import {Offers} from '../../types/offer.ts';
import {AppState} from '../../store/reducer.ts';
import {AppDispatch} from '../../store';
import {selectCity, selectSort} from '../../store/action.ts';
import {SortOptions} from '../../components/sort-options/sort-options.tsx';
import MemoizedHeader from '../../components/header/header.tsx';
import MemoizedOfferList from '../../components/offers-list/offers-list.tsx';
import MemoizedMap from '../../components/map/map.tsx';
import MemoizedLoadingPage from '../loading-page/loading-page.tsx';

function MainPage() {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const onMouseEnter = useCallback((id: string) => setActiveOfferId(id), []);

  const onMouseLeave = useCallback((id: string) => {
    if (activeOfferId === id) {
      setActiveOfferId(null);
    }
  }, [activeOfferId]);

  const selectedCity = useSelector<AppState, string>((state) => state.selectedCity);
  const selectedSort = useSelector<AppState, SortType>((state) => state.sortType);
  const offers = useSelector<AppState, Offers>((state) => state.offers);
  const cities = useSelector<AppState, string[]>((state) => state.cities);

  const selectedOffers = useMemo(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity);
    return [...filteredOffers].sort((a, b) => {
      switch (selectedSort) {
        case SortType.PriceLowToHigh:
          return a.price - b.price;
        case SortType.PriceHighToLow:
          return b.price - a.price;
        case SortType.TopRatedFirst:
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [selectedCity, offers, selectedSort]);

  const dispatch = useDispatch<AppDispatch>();

  const handleCityChoose = (city: string) => {
    dispatch(selectCity(city));
  };

  const handleSortingChoose = (sortType: SortType) => {
    dispatch(selectSort(sortType));
  };

  return (
    <div className="page page--gray page--main">
      <MemoizedHeader />
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
                      <a className={`locations__item-link tabs__item ${item === selectedCity && 'tabs__item--active'}`}
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
          selectedOffers.length !== 0
            ?
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{selectedOffers.length} places to stay in {selectedCity}</b>
                  <SortOptions
                    sortType={selectedSort}
                    handleSortingChoose={handleSortingChoose}
                  />
                  <MemoizedOfferList
                    offers={selectedOffers}
                    className={'cities__places-list places__list tabs__content'}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                </section>

                <div className="cities__right-section">
                  <MemoizedMap
                    city={selectedOffers[0].city}
                    offers={selectedOffers}
                    activeOfferId={activeOfferId}
                    className="cities__map map"
                  />
                </div>
              </div>
            </div>
            : <MemoizedLoadingPage />
        }
      </main>
    </div>
  );
}

const MemoizedMainPage = memo(MainPage);
export default MemoizedMainPage;
