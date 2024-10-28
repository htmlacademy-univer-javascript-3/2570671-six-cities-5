import {OfferPreview} from '../../types/offer-preview.ts';
import {Offer} from '../../types/offer.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

type OfferCardProps = {
  offer: OfferPreview | Offer;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function OfferCard({offer, onMouseEnter, onMouseLeave}: OfferCardProps): JSX.Element {
  let imageSrc = '';
  if ('previewImage' in offer) {
    imageSrc = offer.previewImage;
  } else if (offer.images.length > 0) {
    imageSrc = offer.images[0];
  }

  return (
    <article className="cities__card place-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isBookmarked && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.OfferPage}/${offer.id}`}>
          <img className="place-card__image" src={imageSrc} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isBookmarked ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isBookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OfferPage}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type[0].toUpperCase() + offer.type.substring(1)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
