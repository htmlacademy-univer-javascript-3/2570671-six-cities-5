import {memo, useCallback, useMemo, useState} from 'react';
import {SortType} from '../../types/sort.ts';
import {useDispatch, useSelector} from 'react-redux';
import {Offers} from '../../types/offer.ts';
import {AppState} from '../../store/reducer.ts';
import {AppDispatch} from '../../store';
import {chooseCity, chooseSort} from '../../store/action.ts';
import SortOptions from '../../components/sort-options/sort-options.tsx';
import MemoizedHeader from '../../components/header/header.tsx';
import MemoizedOfferList from '../../components/offers-list/offers-list.tsx';
import MemoizedMap from '../../components/map/map.tsx';
import MemoizedLoadingPage from '../loading-page/loading-page.tsx';
import {useNavigate} from 'react-router-dom';
import {BookmarkAction} from '../../types/bookmark-action.ts';
import {AppRoute, AuthorizationStatus} from '../../const.ts';

type MainPageProps = {
  onBookmarkStatusChange: (action: BookmarkAction) => void;
};

function MainPage({onBookmarkStatusChange}: MainPageProps) {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const onMouseEnter = useCallback((id: string) => setActiveOfferId(id), []);

  const onMouseLeave = useCallback((id: string) => {
    if (activeOfferId === id) {
      setActiveOfferId(null);
    }
  }, [activeOfferId]);

  const chosenCity = useSelector<AppState, string>((state) => state.chosenCity);
  const chosenSort = useSelector<AppState, SortType>((state) => state.sortType);
  const offers = useSelector<AppState, Offers>((state) => state.offers);
  const cities = useSelector<AppState, string[]>((state) => state.cities);
  const navigate = useNavigate();
  const authorizationStatus = useSelector<AppState, AuthorizationStatus>((state) => state.authorizationStatus);

  const chosenOffers = useMemo(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === chosenCity);
    return [...filteredOffers].sort((a, b) => {
      switch (chosenSort) {
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
  }, [chosenCity, offers, chosenSort]);

  const dispatch = useDispatch<AppDispatch>();

  const handleCityChoose = useCallback(
    (city: string) => {
      dispatch(chooseCity(city));
    },
    [dispatch]
  );

  const handleSortingChoose = useCallback(
    (sortType: SortType) => {
      dispatch(chooseSort(sortType));
    },
    [dispatch]
  );

  const handleBookmarkChange = useCallback(
    (action: BookmarkAction) => {
      if (authorizationStatus === AuthorizationStatus.Auth) {
        onBookmarkStatusChange(action);
      } else {
        navigate(AppRoute.LoginPage);
      }
    },
    [authorizationStatus, navigate, onBookmarkStatusChange]
  );

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
                  <MemoizedOfferList
                    offers={chosenOffers}
                    className={'cities__places-list places__list tabs__content'}
                    onBookmarkStatusChange={handleBookmarkChange}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                </section>
                <div className="cities__right-section">
                  <MemoizedMap
                    city={chosenOffers[0].city}
                    offers={chosenOffers}
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
