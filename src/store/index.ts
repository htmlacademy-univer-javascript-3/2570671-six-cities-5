import {reducer} from './reducer.ts';
import {configureStore} from '@reduxjs/toolkit';
import {fetchOffersAction} from './api-actions.ts';
import {createAPI} from '../api/api.ts';
import {redirect} from './middlewares/redirect.ts';

export const api = createAPI();

export const store = configureStore(
  {
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }).concat(redirect),
  });

store.dispatch(fetchOffersAction());

export type AppDispatch = typeof store.dispatch;
