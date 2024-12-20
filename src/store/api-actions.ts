import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {
  requireAuthorization,
  loadOffers,
  setOffersLoadingStatus,
  loadChosenOffer,
  setChosenOfferLoadingStatus,
  setUser,
  loadFavoriteOffers,
  setReviewSendingStatus,
  addReview,
  updateComment, clearFavoriteOffers, loadOfferAdditionalInformation
} from './action.ts';
import {Offer, Offers} from '../types/offer.ts';
import {APIRoute, AuthorizationStatus} from '../const.ts';
import {Review, Reviews} from '../types/review.ts';
import {OfferAdditionalInformation} from '../types/offer-additional-information.ts';
import {AppState} from './reducer.ts';
import {User} from '../types/user.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {Auth} from '../types/auth.ts';
import {BookmarkAction} from '../types/bookmark-action.ts';
import {ReviewAction} from '../types/review-action.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersLoadingStatus(true));
      dispatch(loadChosenOffer(undefined));
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(setOffersLoadingStatus(false));
      dispatch(loadOffers(data));
    } catch {
      dispatch(setOffersLoadingStatus(false));
    }
  },
);

export const fetchOfferAdditionalInformationAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOfferDetails',
  async (offerId: string, {dispatch, extra: api}) => {
    dispatch(setChosenOfferLoadingStatus(true));

    try {
      const offer = await api.get<Offer>(APIRoute.OfferDetails.replace(':id', offerId));
      const reviews = await api.get<Reviews>(APIRoute.OfferReviews.replace(':id', offerId));
      const offersNearby = await api.get<Offers>(APIRoute.OffersNearby.replace(':id', offerId));

      const offerDetails: OfferAdditionalInformation = {
        offer: offer.data,
        reviews: reviews.data.sort((a: Review, b: Review) => (new Date(b.date).getTime() - new Date(a.date).getTime())),
        offersNearby: offersNearby.data,
        isReviewSending: false,
      };

      dispatch(setChosenOfferLoadingStatus(false));
      dispatch(loadChosenOffer(offerDetails));
    } catch {
      dispatch(setChosenOfferLoadingStatus(false));
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.FavoriteOffers);
    dispatch(loadFavoriteOffers(data));
  },
);

export const changeBookmarkStatusAction = createAsyncThunk<void, BookmarkAction, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/setFavoriteStatus',
  async ({offerId: offerId, isBookmarked}, {dispatch, extra: api}) => {
    const numberStatus = isBookmarked ? 1 : 0;
    const route = APIRoute.ChangeFavoriteStatus
      .replace(':id', offerId)
      .replace(':status', numberStatus.toString());
    const {data} = await api.post<Offer>(route);
    dispatch(loadOfferAdditionalInformation(data));
  }
);

export const addReviewAction = createAsyncThunk<void, ReviewAction, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({offerId: offerId, comment, rating}, {dispatch, extra: api}) => {
    dispatch(setReviewSendingStatus(true));
    const route = APIRoute.OfferReviews.replace(':id', offerId);
    await new Promise((res) => setTimeout(res, 3000));
    const {data} = await api.post<Review>(route, { comment: comment, rating: rating });
    dispatch(addReview(data));
    dispatch(updateComment(''));
    dispatch(setReviewSendingStatus(false));
  }
);

export const checkAuthorizationAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/checkAuthorizationStatus',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const {data} = await api.get<User>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(fetchFavoriteOffersAction());
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, Auth, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email: email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<User>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(fetchFavoriteOffersAction());
    } catch (err) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(undefined));
    dispatch(clearFavoriteOffers());
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
