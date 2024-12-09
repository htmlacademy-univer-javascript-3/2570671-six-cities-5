import {Offer} from '../../types/offer.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {memo, useMemo} from 'react';

type OfferCardProps = {
  offer: Offer;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
}

function OfferCard({ offer, onMouseEnter, onMouseLeave }: OfferCardProps) {
  const isBookmarked = useMemo(() => offer.isBookmarked ? 'place-card__bookmark-button--active' : '', [offer.isBookmarked]);

  const link = AppRoute.OfferPage.replace(':id', offer.id);

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => onMouseEnter(offer.id)}
      onMouseLeave={() => onMouseLeave(offer.id)}
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={link} >
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isBookmarked} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.floor(offer.rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const MemoizedOfferCard = memo(OfferCard);
export default MemoizedOfferCard;
