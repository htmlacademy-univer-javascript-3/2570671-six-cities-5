import {Offers} from '../types/offer.ts';
import {SortType} from '../types/sort.ts';
import {OfferDetails} from '../types/offer-details.ts';
import {createReducer} from '@reduxjs/toolkit';
import {
  requireAuthorization,
  selectCity,
  selectSort,
  setOffers,
  setOffersLoadingStatus,
  setSelectedOffer,
  setSelectedOfferLoadingStatus
} from './action.ts';
import {AuthorizationStatus} from '../const.ts';

export type AppState = {
  offers: Offers;
  cities: string[];
  selectedCity: string;
  sortType: SortType;
  selectedOffer?: OfferDetails;
  isOffersLoading: boolean;
  isSelectedOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
}

const initialState: AppState = {
  offers: [],
  cities: [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf'
  ],
  selectedCity: 'Paris',
  sortType: SortType.Popular,
  selectedOffer: undefined,
  isOffersLoading: false,
  isSelectedOfferLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
};

export const reducer = createReducer<AppState>(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(selectSort, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setSelectedOfferLoadingStatus, (state, action) => {
      state.isSelectedOfferLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
