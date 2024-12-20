import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store/reducer.ts';
import {Reviews} from '../../types/review.ts';
import {Offer, Offers} from '../../types/offer.ts';
import {AppDispatch} from '../../store';
import {memo, useCallback, useEffect} from 'react';
import {fetchOfferAndAdditionalInformationAction} from '../../store/api-actions.ts';
import MemoizedLoadingPage from '../loading-page/loading-page.tsx';
import MemoizedNotFoundPage from '../not-found-page/not-found-page.tsx';
import MemoizedHeader from '../../components/header/header.tsx';
import MemoizedMap from '../../components/map/map.tsx';
import MemoizedOfferList from '../../components/offers-list/offers-list.tsx';
import MemoizedReviewsList from '../../components/reviews-list/reviews-list.tsx';
import {BookmarkAction} from '../../types/bookmark-action.ts';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import MemoizedReviewSendingForm from '../../components/review-sending-form/review-sending-form.tsx';

type OfferPageProps = {
  onBookmarkStatusChange: (action: BookmarkAction) => void;
}

function OfferPage({onBookmarkStatusChange}: OfferPageProps) {
  const {id} = useParams();
  const reviews = useSelector<AppState, Reviews>((state) => state.chosenOffer?.reviews ?? []);
  const offersNearby = useSelector<AppState, Offers>((state) => state.chosenOffer?.offersNearby ?? []);
  const offer = useSelector<AppState, Offer | undefined>((state) => state?.chosenOffer?.offer);
  const isOfferLoading = useSelector<AppState, boolean>((state) => state?.isChosenOfferLoading);
  const authorizationStatus = useSelector<AppState, AuthorizationStatus>((state) => state.authorizationStatus);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchOfferAndAdditionalInformationAction(id));
    }
  }, [dispatch, id]);

  const handleBookmarkChange = useCallback((action: BookmarkAction) => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      onBookmarkStatusChange(action);
    } else {
      navigate(AppRoute.LoginPage);
    }
  }, [authorizationStatus, navigate, onBookmarkStatusChange]);

  if (isOfferLoading) {
    return <MemoizedLoadingPage />;
  }

  if (offer === undefined) {
    return <MemoizedNotFoundPage />;
  }

  return (
    <div className="page">
      <MemoizedHeader />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                offer.images.map((image) => (
                  <div
                    key={image}
                    className="offer__image-wrapper"
                  >
                    <img className="offer__image" src={image} alt="Photo studio"/>
                  </div>)
                )
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button
                  className={`offer__bookmark-button ${offer.isFavorite && 'offer__bookmark-button--active'} button`}
                  type="button"
                  onClick={() => handleBookmarkChange({offerId: offer.id, isBookmarked: !offer?.isFavorite})}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${Math.floor(offer.rating) * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {
                    offer.goods.map((good) => (
                      <li className="offer__inside-item" key={good}>{good}</li>)
                    )
                  }
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <MemoizedReviewsList reviews={reviews}/>
                {authorizationStatus === AuthorizationStatus.Auth && <MemoizedReviewSendingForm offerId={offer.id}/>}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <MemoizedMap
              city={offersNearby[0].city}
              offers={offersNearby}
              activeOfferId={offer.id}
              className={'offer__map map'}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <MemoizedOfferList
              offers={offersNearby}
              className={'near-places__list places__list'}
              onBookmarkStatusChange={handleBookmarkChange}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

const MemoizedOfferPage = memo(OfferPage);
export default MemoizedOfferPage;
