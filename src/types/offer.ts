import {User} from './user';
import {City} from './city';
import {Location} from './location';
import {OfferType} from '../const.ts';

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  description: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  host: User;
  goods: string[];
  previewImage: string;
  images: string[];
}

export type Offers = Offer[];
