import {Offers} from '../types/offer.ts';
import {SortingType} from '../types/sorting-type.ts';
import {OfferAndAdditionalInformation} from '../types/offer-and-additional-information.ts';
import {createReducer} from '@reduxjs/toolkit';
import {
  requireAuthorization,
  chooseCity,
  chooseSort,
  loadOffers,
  setOffersLoadingStatus,
  loadChosenOffer,
  setChosenOfferLoadingStatus,
  setUser,
  loadFavoriteOffers,
  updateComment,
  updateRating,
  clearFavoriteOffers,
  addReview, loadOfferAndAdditionalInformation, setReviewSendingStatus
} from './action.ts';
import {AuthorizationStatus} from '../const.ts';
import {User} from '../types/user.ts';

export type AppState = {
  offers: Offers;
  bookmarkedOffers?: Offers;
  cities: string[];
  chosenCity: string;
  sortType: SortingType;
  chosenOffer?: OfferAndAdditionalInformation;
  isOffersLoading: boolean;
  isChosenOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user?: User;
  comment: string;
  rating: number;
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
  chosenCity: 'Paris',
  sortType: SortingType.Popular,
  chosenOffer: undefined,
  isOffersLoading: false,
  isChosenOfferLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  comment: '',
  rating: 0,
};

export const reducer = createReducer<AppState>(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      state.chosenCity = action.payload;
    })
    .addCase(chooseSort, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      const favoriteOffers = action.payload;
      state.offers.forEach((offer) => {
        favoriteOffers?.forEach((favoriteOffer) => {
          if(offer.id === favoriteOffer.id) {
            offer.isFavorite = true;
          }
        });
      });
      state.bookmarkedOffers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(updateComment, (state, {payload}) => {
      state.comment = payload;
    })
    .addCase(updateRating, (state, {payload}) => {
      state.rating = payload;
    })
    .addCase(clearFavoriteOffers, (state) => {
      state.bookmarkedOffers = undefined;
      state.offers.forEach((offer) => {
        offer.isFavorite = false;
      });
      if (state.chosenOffer?.offer !== undefined) {
        state.chosenOffer.offer.isFavorite = false;
      }
    })
    .addCase(loadOfferAndAdditionalInformation, (state, {payload}) => {
      state.offers = state.offers.map((offer) =>
        offer.id === payload.id ? payload : offer,
      );
      if (state.chosenOffer?.offer.id === payload.id) {
        state.chosenOffer.offer = payload;
      }
      if (state.chosenOffer?.offersNearby !== undefined) {
        state.chosenOffer.offersNearby = state.chosenOffer?.offersNearby.map((offer) =>
          offer.id === payload.id ? payload : offer,
        );
      }
      state.bookmarkedOffers = state.bookmarkedOffers?.filter((offer) => offer.id !== payload.id);
      if (payload.isFavorite) {
        state.bookmarkedOffers?.push(payload);
      }
    })
    .addCase(loadChosenOffer, (state, action) => {
      state.chosenOffer = action.payload;
    })
    .addCase(addReview, (state, { payload }) => {
      if (state.chosenOffer !== undefined) {
        state.chosenOffer.reviews.unshift(payload);
      }
    })
    .addCase(setChosenOfferLoadingStatus, (state, action) => {
      state.isChosenOfferLoading = action.payload;
    })
    .addCase(setReviewSendingStatus, (state, action) => {
      if (state.chosenOffer !== undefined) {
        state.chosenOffer.isReviewSending = action.payload;
      }
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});
