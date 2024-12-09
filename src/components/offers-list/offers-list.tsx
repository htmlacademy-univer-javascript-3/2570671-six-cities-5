import {Offers} from '../../types/offer';
import MemoizedOfferCard from '../offer-card/offer-card.tsx';
import {memo} from 'react';

type OffersListProps = {
  offers: Offers;
  className: string;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: (id: string) => void;
}

function OffersList({offers, className, onMouseEnter, onMouseLeave}: OffersListProps): JSX.Element {
  return (
    <div className={className}>
      {offers.map((offer) => (
        <MemoizedOfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={(id) => onMouseEnter?.(id)}
          onMouseLeave={(id) => onMouseLeave?.(id)}
        />))}
    </div>
  );
}

const MemoizedOfferList = memo(OffersList);
export default MemoizedOfferList;
