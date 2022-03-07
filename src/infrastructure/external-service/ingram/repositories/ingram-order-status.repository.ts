import { Got } from 'got';
import createHttpError from 'http-errors';

import { httpClientInstance } from '../http-client';
import {
  IngramOrderStatus,
  IIngramOrderStatusProps
} from '../../../../core/entities';

import {
  IIngramOrderStatusGateway,
  IOrderStatusCredentials
} from '../../../../core/use-cases/interfaces';

export default class IngramOrderStatusRepository
  implements IIngramOrderStatusGateway
{
  private _pathname: string;
  private _client: Got;

  public constructor() {
    this._pathname = 'v1/order_status';
    this._client = httpClientInstance;
  }

  public async find(): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async findOne(id: string): Promise<any | null> {
    throw new Error('Method not implemented');
  }

  public async findByContext(
    context: IOrderStatusCredentials
  ): Promise<IngramOrderStatus[] | null> {
    const url = `${this._pathname}`;

    const requestBody = {
      order_status: [
        {
          order: context
        }
      ]
    };

    try {
      const response: any = await this._client.post(url, {
        responseType: 'json',
        resolveBodyOnly: true,
        json: requestBody
      });

      if (!response.order_status) return null;
      if (typeof response.order_status[0] === 'string') return null;

      const orderStatus: IngramOrderStatus[] = response.order_status.map(
        (status: IIngramOrderStatusProps) => {
          return IngramOrderStatus.create(status, null);
        }
      );

      return orderStatus;
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
