export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    invalid: 'type must be Paris or Cologne or etc',
  },
  previewImage: {
    maxLength: 'Too short for field previewImage',
  },
  images: {
    invalidFormat: 'images must be a valid array of string',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a valid boolean',
  },
  type: {
    invalid: 'type must be a valid housing type',
  },
  bedrooms: {
    invalidFormat: 'bedrooms must be a valid number',
    minValue: 'Minimum bedrooms is 1',
    maxValue: 'Maximum bedrooms is 8',
  },
  maxAdults: {
    invalidFormat: 'maxAdults must be a valid number',
    minValue: 'Minimum maxAdults is 1',
    maxValue: 'Maximum maxAdults is 10',
  },
  price: {
    invalidFormat: 'price must be a valid number',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  goods: {
    invalidFormat: 'goods must be a valid array',
    invalid:
      'Must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
  hostId: {
    invalidId: 'hostId field must be a valid id',
  },
} as const;
