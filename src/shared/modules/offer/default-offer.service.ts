import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import {
  CreateOfferDto,
  DEFAULT_OFFER_COUNT,
  PREMIUM_OFFER_MAX_COUNT,
  UpdateOfferDto,
} from './index.js';

const commentCountAndRatingPipline = () => [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } },
        { $project: { _id: 1, rating: 1 } },
      ],
      as: 'comments',
    },
  },
  {
    $addFields: {
      id: { $toString: '$_id' },
      rating: { $avg: '$comments.rating' },
      commentCount: { $size: '$comments' },
    },
  },
  { $unset: 'comments' },
];

const hostPipline = () => [
  {
    $lookup: {
      from: 'users',
      let: { hostId: '$hostId' },
      pipeline: [{ $match: { $expr: { $eq: ['$$hostId', '$_id'] } } }],
      as: 'hostId',
    },
  },
  {
    $set: {
      hostId: { $arrayElemAt: ['$hostId', 0] },
    },
  },
];

const favoritesPipeline = () => [
  {
    $lookup: {
      from: 'users',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $in: ['$$offerId', '$favorites'] } } },
        { $project: { _id: 1 } },
      ],
      as: 'favoredByUsers',
    },
  },
];

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .aggregate([
        {
          $match: {
            $expr: {
              $eq: ['$_id', { $toObjectId: offerId }],
            },
          },
        },
        ...commentCountAndRatingPipline(),
        ...hostPipline(),
        ...favoritesPipeline(),
      ])
      .exec()
      .then(([result]) => result ?? null);
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    return this.offerModel
      .aggregate([
        ...commentCountAndRatingPipline(),
        ...hostPipline(),
        ...favoritesPipeline(),
        { $limit: limit },
        { $sort: { createdAt: SortType.Down } },
      ])
      .exec();
  }

  public async deleteById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    const toBeDeleted = await this.findById(offerId);
    await this.offerModel.findByIdAndDelete(offerId).exec();

    return toBeDeleted;
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    await this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).exec();

    return this.findById(offerId);
  }

  public async findPremiumByCity(
    city: string
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $match: {
            city,
            isPremium: true,
          },
        },
        ...commentCountAndRatingPipline(),
        ...hostPipline(),
        ...favoritesPipeline(),
        { $limit: PREMIUM_OFFER_MAX_COUNT },
        { $sort: { createdAt: SortType.Down } },
      ])
      .exec();
  }

  public async findFavoriteByUserId(
    userId: string
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        ...favoritesPipeline(),
        {
          $match: {
            $expr: {
              $in: [{ _id: { $toObjectId: userId } }, '$favoredByUsers'],
            },
          },
        },
        ...commentCountAndRatingPipline(),
        ...hostPipline(),
      ])
      .exec();
  }

  public async exists(offerId: string): Promise<boolean> {
    const result = await this.findById(offerId);
    return !!result;
  }
}
