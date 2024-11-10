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

export const RentalOffersCount = 312;

export const Cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const SortingOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];
