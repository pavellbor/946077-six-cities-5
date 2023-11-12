import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
} from '../../libs/rest/index.js';
import { City, Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { fillDTO, parseAsString } from '../../helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './create-offer-request.js';
import { UpdateOfferRequest } from './update-offer-request.js';
import { UserRdo } from '../user/rdo/user.rdo.js';
import { OfferPreviewRdo } from './rdo/offer-preview.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremiumByCity,
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOne,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Put,
      handler: this.favorite,
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferPreviewRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.create(body);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async getPremiumByCity(
    { query }: Request,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.findPremiumByCity(
      query.city as City
    );
    const responseData = fillDTO(OfferPreviewRdo, offers);
    this.ok(res, responseData);
  }

  public async getFavorites(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async getOne({ params }: Request, res: Response): Promise<void> {
    const offerId = parseAsString(params.offerId);

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `${params.offerId} is not a valid ID`,
        'OfferController'
      );
    }

    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} does not exist`,
        'OfferController'
      );
    }

    const responseData = fillDTO(OfferRdo, offer);
    responseData.host = fillDTO(UserRdo, responseData.host);

    this.ok(res, responseData);
  }

  public async update(
    { params, body }: UpdateOfferRequest,
    res: Response
  ): Promise<void> {
    const offerId = parseAsString(params.offerId);

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `${params.offerId} is not a valid ID`,
        'OfferController'
      );
    }

    const isExist = await this.offerService.exists(offerId);

    if (!isExist) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} does not exist`,
        'OfferController'
      );
    }

    const updatedOffer = await this.offerService.updateById(offerId, body);
    const responseData = fillDTO(OfferRdo, updatedOffer);
    responseData.host = fillDTO(UserRdo, responseData.host);

    this.ok(res, responseData);
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    const offerId = parseAsString(params.offerId);

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `${params.offerId} is not a valid ID`,
        'OfferController'
      );
    }

    const isExist = await this.offerService.exists(offerId);

    if (!isExist) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} does not exist`,
        'OfferController'
      );
    }

    const deletedOffer = await this.offerService.deleteById(offerId);
    const responseData = fillDTO(OfferRdo, deletedOffer);
    responseData.host = fillDTO(UserRdo, responseData.host);

    this.ok(res, responseData);
  }

  public async favorite(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }
}
