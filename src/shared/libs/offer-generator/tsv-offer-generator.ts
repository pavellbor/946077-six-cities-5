import dayjs from 'dayjs';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';
import { MockServerData, UserType } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';

const IMAGES_COUNT = 6;

const TRUE_VALUE = 1;
const FALSE_VALUE = 0;

const MIN_BEDROOMS_COUNT = 1;
const MAX_BEDROOMS_COUNT = 8;

const MIN_ADULTS_COUNT = 1;
const MAX_ADULTS_COUNT = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_LATITUDE = 48.85661;
const MAX_LATITUDE = 53.550341;

const MIN_LONGITUDE = 2.351499;
const MAX_LONGITUDE = 10.000654;

const LOCATION_NUMS_AFTER_DIGIT = 6;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const images = getRandomItems(this.mockData.images, IMAGES_COUNT).join(';');
    const isPremium = getRandomItem([TRUE_VALUE, FALSE_VALUE]);
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(
      MIN_BEDROOMS_COUNT,
      MAX_BEDROOMS_COUNT
    );
    const maxAdults = generateRandomValue(MIN_ADULTS_COUNT, MAX_ADULTS_COUNT);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const goods = getRandomItems(this.mockData.goods).join(';');
    const user = getRandomItem(this.mockData.users);
    const avatarUrl = getRandomItem(this.mockData.avatars);
    const email = getRandomItem(this.mockData.emails);
    const userType = getRandomItem(Object.values(UserType));
    const latitude = generateRandomValue(
      MIN_LATITUDE,
      MAX_LATITUDE,
      LOCATION_NUMS_AFTER_DIGIT
    );
    const longitude = generateRandomValue(
      MIN_LONGITUDE,
      MAX_LONGITUDE,
      LOCATION_NUMS_AFTER_DIGIT
    );
    const location = [latitude, longitude].join(';');

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      user,
      email,
      avatarUrl,
      userType,
      location,
    ].join('\t');
  }
}
