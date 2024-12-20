import {Offer, Offers} from './offer.ts';
import {Reviews} from './review.ts';

export type OfferAdditionalInformation = {
  offer: Offer;
  reviews: Reviews;
  offersNearby: Offers;
  isReviewSending: boolean;
}
