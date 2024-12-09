export enum AppRoute{
  MainPage = '/',
  LoginPage = '/login',
  FavoritesPage = '/favorites',
  OfferPage = '/offer/:id',
  NotFoundPage = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const Cities = [
  {
    name: 'Paris',
    id: 1,
  },
  {
    name: 'Cologne',
    id: 2,
  },
  {
    name: 'Brussels',
    id: 3,
  },
  {
    name: 'Amsterdam',
    id: 4,
  },
  {
    name: 'Hamburg',
    id: 5,
  },
  {
    name: 'Dusseldorf',
    id: 6,
  },
];

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum OfferType {
  Room = 'Room',
  Apartment = 'Apartment',
}

export enum APIRoute {
  Offers = '/offers',
  OfferDetails = '/offers/:id',
  OfferReviews = '/comments/:id',
  OffersNearby = '/offers/:id/nearby',
  Login = '/login',
  Logout = '/logout',
}

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
