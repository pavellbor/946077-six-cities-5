import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { City } from '../../types/city.enum.js';
import { HousingType } from '../../types/housing-type.enum.js';
import { ConveniencesType } from '../../types/conveniences-type.enum.js';
import { UserType } from '../../types/user-type.enum.js';
import { Coordinates } from '../../types/coordinates.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
          title,
          description,
          createdDate,
          city,
          preview,
          photos,
          isPremium,
          isFavorite,
          rating,
          housingType,
          roomsNumber,
          guestsNumber,
          rentalPrice,
          conveniences,
          firstName,
          email,
          avatarPath,
          userType,
          coordinates,
        ]) => ({
          title,
          description,
          postDate: new Date(createdDate),
          city: city as City,
          preview,
          photos: photos.split(';'),
          isPremium: Boolean(isPremium),
          isFavorite: Boolean(isFavorite),
          rating: Number(rating),
          housingType: housingType as HousingType,
          roomsNumber: Number(roomsNumber),
          guestsNumber: Number(guestsNumber),
          rentalPrice: Number(rentalPrice),
          conveniences: conveniences.split(';') as ConveniencesType[],
          author: {
            firstName,
            email,
            avatarPath,
            type: userType as UserType,
          },
          coordinates: coordinates
            .split(';')
            .map((coordinate) => Number(coordinate)) as Coordinates,
        })
      );
  }
}
