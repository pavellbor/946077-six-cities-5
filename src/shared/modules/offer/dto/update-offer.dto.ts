import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  City,
  GoodsType,
  HousingType,
  Location,
} from '../../../types/index.js';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, {
    message: CreateUpdateOfferMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateUpdateOfferMessage.description.maxLength,
  })
  public description?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: CreateUpdateOfferMessage.postDate.invalidFormat }
  )
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: CreateUpdateOfferMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @MaxLength(256, {
    message: CreateUpdateOfferMessage.previewImage.maxLength,
  })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.images.invalidFormat })
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(HousingType, { message: CreateUpdateOfferMessage.type.invalid })
  public type?: HousingType;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.bedrooms.minValue })
  @Max(8, { message: CreateUpdateOfferMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.maxAdults.minValue })
  @Max(10, { message: CreateUpdateOfferMessage.maxAdults.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.goods.invalidFormat })
  public goods?: GoodsType[];

  @IsOptional()
  public location?: Location;
}
