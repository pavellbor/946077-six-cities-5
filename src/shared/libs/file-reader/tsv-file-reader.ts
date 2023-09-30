import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import {
  Offer,
  City,
  HousingType,
  GoodsType,
  UserType,
  Location,
} from '../../types/index.js';

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
          previewImage,
          images,
          isPremium,
          isFavorite,
          rating,
          type,
          bedrooms,
          maxAdults,
          price,
          goods,
          name,
          email,
          avatarUrl,
          userType,
          location,
        ]) => ({
          title,
          description,
          postDate: new Date(createdDate),
          city: city as City,
          previewImage,
          images: images.split(';'),
          isPremium: Boolean(isPremium),
          isFavorite: Boolean(isFavorite),
          rating: Number(rating),
          type: type as HousingType,
          bedrooms: Number(bedrooms),
          maxAdults: Number(maxAdults),
          price: Number(price),
          goods: goods.split(';') as GoodsType[],
          host: {
            name,
            email,
            avatarUrl,
            type: userType as UserType,
          },
          location: location.split(';').reduce<Location>(
            (acc, coordinate, index) => {
              acc[index ? 'longitude' : 'latitude'] = Number(coordinate);
              return acc;
            },
            { longitude: 0, latitude: 0 }
          ),
        })
      );
  }
}
