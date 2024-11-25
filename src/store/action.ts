import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offer.ts';
import {Reviews} from '../types/review.ts';
import {OfferPreviews} from '../types/offer-preview.ts';

export const setOffersList = createAction<OfferPreviews>('offers/setOffersList');
export const setReviews = createAction<Reviews>('reviews/setReviews');
export const setOffers = createAction<Offers>('offers/setOffers');
export const changeCity = createAction<string>('city/changeCity');
