import {reducer} from './reducer.ts';
import {configureStore} from '@reduxjs/toolkit';
import {fetchOffersAction} from './api-actions.ts';
import {createAPI} from '../api/api.ts';

export const api = createAPI();

export const appStateStore = configureStore(
  {
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  },
);

appStateStore.dispatch(fetchOffersAction());

export type AppDispatch = typeof appStateStore.dispatch;
