import {Offer, Offers} from './offer.ts';
import {Reviews} from './review.ts';

export type OfferDetails = {
  offer: Offer;
  reviews: Reviews;
  offersNearby: Offers;
}
