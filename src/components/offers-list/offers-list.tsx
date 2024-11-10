import {OfferPreviews} from '../../types/offer-preview.ts';
import {useEffect, useState} from 'react';
import OfferCard from '../offer-card/offer-card.tsx';
import {Offers} from '../../types/offer';

type OffersListProps = {
  offers: OfferPreviews | Offers;
  onActiveOfferChange: (offerId: string | null) => void;
}

function OffersList({offers, onActiveOfferChange}: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    onActiveOfferChange(activeOfferId);
  }, [activeOfferId, onActiveOfferChange]);

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
