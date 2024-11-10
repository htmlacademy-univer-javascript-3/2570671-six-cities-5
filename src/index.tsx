import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offerPreviews} from './mocks/offer-previews.ts';
import {offers} from './mocks/offers.ts';
import {RentalOffersCount} from './const.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount={RentalOffersCount}
      offerPreviews={offerPreviews}
      offers={offers}
    />
  </React.StrictMode>
);
