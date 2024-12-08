import OfferCard from '../offer-card/offer-card.tsx';
import {Offers} from '../../types/offer';

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
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={(id) => onMouseEnter?.(id)}
          onMouseLeave={(id) => onMouseLeave?.(id)}
        />))}
    </div>
  );
}

export default OffersList;
