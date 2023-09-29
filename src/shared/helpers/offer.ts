import {
  City,
  GoodsType,
  HousingType,
  Location,
  Offer,
  UserType,
} from "../types/index.js";

export function createOffer(offerData: string): Offer {
  const [
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
  ] = offerData.replace("\n", "").split("\t");

  return {
    title,
    description,
    postDate: new Date(createdDate),
    city: city as City,
    previewImage,
    images: images.split(";"),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number(rating),
    type: type as HousingType,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    goods: goods.split(";") as GoodsType[],
    host: {
      name,
      email,
      avatarUrl,
      type: userType as UserType,
    },
    location: location.split(";").reduce<Location>(
      (acc, coordinate, index) => {
        acc[index ? "longitude" : "latitude"] = Number(coordinate);
        return acc;
      },
      { longitude: 0, latitude: 0 }
    ),
  };
}
