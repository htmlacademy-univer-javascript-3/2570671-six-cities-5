import {City} from './city';
import {Location} from './location';

export type OfferPreview = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isBookmarked: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type OfferPreviews = OfferPreview[];
