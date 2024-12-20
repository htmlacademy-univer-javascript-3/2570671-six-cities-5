import {BookmarkAction} from '../../types/bookmark-action.ts';
import {Offers} from '../../types/offer.ts';
import MemoizedFavoriteOfferCard from '../favorite-offer-card/favorite-offer-card.tsx';
import {memo} from 'react';

type FavoriteOffersListProps = {
  city: string;
  offers: Offers;
  onBookmarkStatusChange: (action: BookmarkAction) => void;
}

function FavoriteOffersList({city, offers, onBookmarkStatusChange}: FavoriteOffersListProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <div className="locations__item-link">
            <span>{city}</span>
          </div>
        </div>
      </div>
      <div className='favorites__places'>
        {
          offers
            .map((offer) => (
              <MemoizedFavoriteOfferCard
                key={offer.id}
                offer={offer}
                onBookmarkStatusChange={onBookmarkStatusChange}
              />)
            )
        }
      </div>
    </li>
  );
}

const MemoizedFavoriteOffersList = memo(FavoriteOffersList);
export default MemoizedFavoriteOffersList;
