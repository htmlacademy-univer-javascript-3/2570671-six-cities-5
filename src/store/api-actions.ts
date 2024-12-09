import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {
  redirectToRoute,
  requireAuthorization,
  setOffers,
  setOffersLoadingStatus,
  setSelectedOffer,
  setSelectedOfferLoadingStatus, setUserEmail
} from './action.ts';
import {Offer, Offers} from '../types/offer.ts';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const.ts';
import {Reviews} from '../types/review.ts';
import {OfferDetails} from '../types/offer-details.ts';
import {AppState} from './reducer.ts';
import {User} from '../types/user.ts';
import {dropToken, saveToken} from '../api/token.ts';
import {Auth} from '../types/auth.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    dispatch(setSelectedOffer(undefined));

    const { data } = await api.get<Offers>(APIRoute.Offers);

    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
  },
);

export const fetchOfferDetailsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOfferDetails',
  async (offerId: string, { dispatch, extra: api }) => {
    dispatch(setSelectedOfferLoadingStatus(true));

    const offerData = await api.get<Offer>(APIRoute.OfferDetails.replace(':id', offerId));
    const reviewsData = await api.get<Reviews>(APIRoute.OfferReviews.replace(':id', offerId));
    const offersNearbyData = await api.get<Offers>(APIRoute.OffersNearby.replace(':id', offerId));

    const offerDetails: OfferDetails = {
      offer: offerData.data,
      reviews: reviewsData.data,
      offersNearby: offersNearbyData.data,
    };

    dispatch(setSelectedOfferLoadingStatus(false));
    dispatch(setSelectedOffer(offerDetails));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const response = await api.get(APIRoute.Login);
      const data = response.data as { email: string };
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserEmail(data.email));
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
  async (payload, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<User>(APIRoute.Login, payload);
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserEmail(payload.email));
    dispatch(redirectToRoute(AppRoute.MainPage));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.MainPage));
  },
);
