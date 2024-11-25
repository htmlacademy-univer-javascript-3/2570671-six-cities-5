import {OfferPreviews} from '../types/offer-preview.ts';
import {Reviews} from '../types/review.ts';
import {Offers} from '../types/offer.ts';
import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers.ts';
import {reviews} from '../mocks/reviews.ts';
import {changeCity, setOffers, setOffersList, setReviews} from './action.ts';
import {offerPreviews} from '../mocks/offer-previews.ts';

type State = {
  city: string;
  offerPreviewsList: OfferPreviews;
  reviews: Reviews;
  offers: Offers;
};

const initialState: State = {
  city: 'Paris',
  offerPreviewsList: [],
  reviews: [],
  offers: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, {payload}) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state) => {
      state.offerPreviewsList = offerPreviews;
    })
    .addCase(setReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(setOffers, (state) => {
      state.offers = offers;
    });
});
