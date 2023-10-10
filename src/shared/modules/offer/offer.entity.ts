import {
  Ref,
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { City, GoodsType, HousingType, Location } from "../../types/index.js";
import { UserEntity } from "../user/index.js";

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: "offers",
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title: string;

  @prop({ trim: true })
  public description: string;

  @prop()
  public postDate: Date;

  @prop({ enum: City })
  public city: City;

  @prop()
  public previewImage: string;

  @prop()
  public images: string[];

  @prop()
  public isPremium: boolean;

  @prop()
  public isFavorite: boolean;

  @prop()
  public rating: number;

  @prop({
    type: String,
    enum: HousingType,
  })
  public type: HousingType;

  @prop()
  public bedrooms: number;

  @prop()
  public maxAdults: number;

  @prop()
  public price: number;

  @prop({ type: String, enum: GoodsType })
  public goods: GoodsType[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public hostId: Ref<UserEntity>;

  @prop({ type: Object })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
