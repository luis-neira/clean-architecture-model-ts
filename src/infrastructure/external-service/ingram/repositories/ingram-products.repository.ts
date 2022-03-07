import { Got } from 'got';
import createHttpError from 'http-errors';

import { IngramProduct, IIngramProductProps } from '../../../../core/entities';
import { httpClientInstance } from '../http-client';

import {
  IIngramProductsGateway,
  IIngramItemNotFound,
  IngramCategories,
  IngramItemFormats
} from '../../../../core/use-cases/interfaces';

export default class IngramProductsRepository
  implements IIngramProductsGateway
{
  private _pathname: string;
  private _client: Got;

  public constructor() {
    this._pathname = 'v1/inventory';
    this._client = httpClientInstance;
  }

  public async findOne(id: string): Promise<IngramProduct | null> {
    const url = `${this._pathname}/${id}`;

    try {
      const response: IIngramProductProps | IIngramItemNotFound =
        await this._client.get(url, {
          responseType: 'json',
          resolveBodyOnly: true
        });

      const badResponse = response as IIngramItemNotFound;

      if (badResponse.item_not_available) return null;

      const successResponse = response as IIngramProductProps;

      const payload = IngramProduct.create(successResponse, null);

      return payload;
    } catch (err: any) {
      throw this.handleRequestError(err);
    }
  }

  public async find(): Promise<IngramProduct[]> {
    const url = this._pathname;

    try {
      const response: IIngramProductProps[] = await this._client.get(url, {
        responseType: 'json',
        resolveBodyOnly: true
      });

      const payload = response.map((p) => IngramProduct.create(p, null));

      return payload;
    } catch (err: any) {
      throw this.handleRequestError(err);
    }
  }

  public async findByCategory(
    category: IngramCategories
  ): Promise<IngramProduct[]> {
    const ingramSearchCategories = {
      games: 'inventory_games',
      movies: 'inventory_movies',
      audio: 'inventory_audio',
      electronics: 'inventory_electronics',
      accessories: 'inventory_accessories'
    };

    const resourcePath = ingramSearchCategories[category] || category;

    const url = `v1/${resourcePath}`;

    try {
      const response: IIngramProductProps[] = await this._client.get(url, {
        responseType: 'json',
        resolveBodyOnly: true
      });

      const payload = response.map((p) => IngramProduct.create(p, null));

      return payload;
    } catch (err: any) {
      throw this.handleRequestError(err);
    }
  }

  public async findByItemFormat(
    itemFormat: IngramItemFormats
  ): Promise<IngramProduct[]> {
    const ingramSearchItemFormats = {
      dvd: 'inventory_dvd',
      bluray: 'inventory_bluray',
      cd: 'inventory_cd',
      lp: 'inventory_lp'
    };

    const resourcePath = ingramSearchItemFormats[itemFormat] || itemFormat;

    const url = `v1/${resourcePath}`;

    try {
      const response: IIngramProductProps[] = await this._client.get(url, {
        responseType: 'json',
        resolveBodyOnly: true
      });

      const payload = response.map((p) => IngramProduct.create(p, null));

      return payload;
    } catch (err: any) {
      throw this.handleRequestError(err);
    }
  }

  private handleRequestError(err: any): any {
    if (err.code === 'ERR_NON_2XX_3XX_RESPONSE') {
      const statusCode = err.response.statusCode;
      const message = err.message;

      return createHttpError(statusCode, `Third-party API: ${message}`);
    }

    return err;
  }
}
