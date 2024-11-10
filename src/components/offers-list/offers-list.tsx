import {OfferPreviews} from '../../types/offer-preview.ts';
import {useState} from 'react';
import OfferCard from '../offer-card/offer-card.tsx';
import {Offers} from '../../types/offer';

type OffersListProps = {
  offers: OfferPreviews | Offers;
}

function OffersList({offers}: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);

  const handleMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />))}
    </div>
  );
}

export default OffersList;
