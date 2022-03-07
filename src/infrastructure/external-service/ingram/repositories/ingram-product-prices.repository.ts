import { Got } from 'got';
import createHttpError from 'http-errors';

import {
  IngramProductPrice,
  IIngramProductPriceProps
} from '../../../../core/entities';
import { httpClientInstance } from '../http-client';

import {
  IIngramProductPricesGateway,
  IIngramItemNotFound
} from '../../../../core/use-cases/interfaces';

export default class IngramProductPricesRepository
  implements IIngramProductPricesGateway
{
  private _pathname: string;
  private _client: Got;

  public constructor() {
    this._pathname = 'v1/price';
    this._client = httpClientInstance;
  }

  public async findOne(id: string): Promise<IngramProductPrice | null> {
    const url = `${this._pathname}/${id}`;

    try {
      const response: IIngramProductPriceProps | IIngramItemNotFound =
        await this._client.get(url, {
          responseType: 'json',
          resolveBodyOnly: true
        });

      const badResponse = response as IIngramItemNotFound;

      if (badResponse.item_not_available) return null;

      const successResponse = response as IIngramProductPriceProps;

      const payload = IngramProductPrice.create(successResponse, null);

      return payload;
    } catch (err: any) {
      throw this.handleRequestError(err);
    }
  }

  public async find(): Promise<IngramProductPrice[]> {
    const url = this._pathname;

    try {
      const response: IIngramProductPriceProps[] = await this._client.get(url, {
        responseType: 'json',
        resolveBodyOnly: true
      });

      const payload = response.map((p) => IngramProductPrice.create(p, null));

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
