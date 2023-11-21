export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024',
  },
  rating: {
    invalidFormat: 'rating must be a valid number',
    minValue: 'min rating is 1',
    maxValue: 'max rating is 5',
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
} as const;
