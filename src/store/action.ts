import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offer.ts';
import {SortType} from '../types/sort.ts';
import {OfferDetails} from '../types/offer-details.ts';

export const selectCity = createAction<string>('chooseCity');

export const selectSort = createAction<SortType>('chooseSorting');

export const setOffers = createAction<Offers>('loadOffers');
export const setOffersLoadingStatus = createAction<boolean>('setOffersLoadingStatus');

export const setSelectedOffer = createAction<OfferDetails | undefined>('setSelectedOffer');
export const setSelectedOfferLoadingStatus = createAction<boolean>('setSelectedOfferLoadingStatus');
