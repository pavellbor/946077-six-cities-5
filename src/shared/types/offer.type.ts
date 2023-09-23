import { City } from './city.enum.js';
import { ConveniencesType } from './conveniences-type.enum.js';
import { Coordinates } from './coordinates.type.js';
import { HousingType } from './housing-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomsNumber: number;
  guestsNumber: number;
  rentalPrice: number;
  conveniences: ConveniencesType[];
  author: User;
  coordinates: Coordinates;
};
