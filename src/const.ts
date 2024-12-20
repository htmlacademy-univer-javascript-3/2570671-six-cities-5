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

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum OfferType {
  Room = 'room',
  Apartment = 'apartment',
  House = 'house',
  Hotel = 'hotel',
}

export enum APIRoute {
  Offers = '/offers',
  OfferDetails = '/offers/:id',
  OfferReviews = '/comments/:id',
  OffersNearby = '/offers/:id/nearby',
  FavoriteOffers = '/favorite',
  ChangeFavoriteStatus = '/favorite/:id/:status',
  Login = '/login',
  Logout = '/logout'
}

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const REVIEW_COMMENT_MAX_LENGTH = 300;

export const REVIEW_COMMENT_MIN_LENGTH = 50;

export const MIN_RATING = 1;
