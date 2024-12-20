import {Offer, Offers} from './offer.ts';
import {Reviews} from './review.ts';

<<<<<<<< HEAD:src/types/offer-and-additional-information.ts
export type OfferAndAdditionalInformation = {
========
export type OfferAdditionalInformation = {
>>>>>>>> origin/module8-task2:src/types/offer-additional-information.ts
  offer: Offer;
  reviews: Reviews;
  offersNearby: Offers;
  isReviewSending: boolean;
}
