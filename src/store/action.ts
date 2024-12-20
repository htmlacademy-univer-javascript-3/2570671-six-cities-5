import {createAction} from '@reduxjs/toolkit';
import {Offer, Offers} from '../types/offer.ts';
import {SortType} from '../types/sort.ts';
import {OfferAdditionalInformation} from '../types/offer-additional-information.ts';
import {AuthorizationStatus} from '../const.ts';
import {Review} from '../types/review.ts';
import {User} from '../types/user.ts';

export const chooseCity = createAction<string>('chooseCity');
export const chooseSort = createAction<SortType>('chooseSorting');
export const loadOffers = createAction<Offers>('loadOffers');
export const loadFavoriteOffers = createAction<Offers | undefined>('loadFavoriteOffers');
export const setOffersLoadingStatus = createAction<boolean>('setOffersLoadingStatus');
export const updateComment = createAction<string>('updateComment');
export const updateRating = createAction<number>('updateRating');
export const clearFavoriteOffers = createAction('clearFavoriteOffers');
export const loadOfferAdditionalInformation = createAction<Offer>('loadOfferAdditionalInformation');
export const loadChosenOffer = createAction<OfferAdditionalInformation | undefined>('loadSelectedOffer');
export const addReview = createAction<Review>('addReview');
export const setChosenOfferLoadingStatus = createAction<boolean>('setSelectedOfferLoadingStatus');
export const setReviewSendingStatus = createAction<boolean>('setReviewSendingStatus');



export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setUser = createAction<User | undefined>('setUser');
