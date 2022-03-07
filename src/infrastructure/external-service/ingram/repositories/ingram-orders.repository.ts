import { Got } from 'got';
import createHttpError from 'http-errors';

import { httpClientInstance } from '../http-client';
import { httpClientInstanceUnsafe } from '../http-client';
import {
  IngramOrder,
  IngramOrderStatus,
  IIngramOrderItemProps
} from '../../../../core/entities';

import { IIngramOrdersGateway } from '../../../../core/use-cases/interfaces';

interface IOrder {
  order: IIngramOrderItemProps[];
}

export default class IngramOrdersRepository implements IIngramOrdersGateway {
  private _pathname: string;
  private _client: Got;

  public constructor() {
    this._pathname = 'v1/orders';
    this._client = httpClientInstance;
  }

  public async create(entity: IngramOrder): Promise<IngramOrderStatus[]> {
    const url = `${this._pathname}`;

    const requestBody = {
      orders: [
        {
          order: entity.getOrder()
        }
      ]
    };

    try {
      const response: any = await this._client.post(url, {
        responseType: 'json',
        resolveBodyOnly: true,
        json: requestBody
      });

      if (!response.orders) {
        throw processUnknownClientResponse(response);
      }

      const orderStatus = entity.orderLineItems.map((lineItem) => {
        return IngramOrderStatus.create(
          {
            order_id: response.orders[0].order_id,
            ingram_order_id: response.orders[0].ingram_order_id,
            item: lineItem.itemNumber,
            item_status: response.orders[0].status,
            quantity: lineItem.qty
          },
          null
        );
      });

      return orderStatus;
    } catch (err: any) {
      throw this.handleRequestError(err);
    }
  }

  public async createMany(
    entity: IngramOrder[]
  ): Promise<{ orderStatus: IngramOrderStatus[] }[]> {
    const url = `${this._pathname}`;

    const requestBody = {
      orders: entity.reduce((accum, order, i) => {
        accum.push({ order: order.getOrder() });
        return accum;
      }, [] as IOrder[])
    };

    try {
      await pingService(url).catch((e) => {});

      const response: any = await this._client.post(url, {
        responseType: 'json',
        resolveBodyOnly: true,
        json: requestBody
      });

      if (!response.orders) {
        throw processUnknownClientResponse(response);
      }

      const orderStatuses = entity.reduce((accum, order, i) => {
        accum.push({
          orderStatus: order.orderLineItems.map((lineItem) => {
            return IngramOrderStatus.create(
              {
                order_id: response.orders[i].order_id,
                ingram_order_id: response.orders[i].ingram_order_id,
                item: lineItem.itemNumber,
                item_status: response.orders[i].status,
                quantity: lineItem.qty
              },
              null
            );
          })
        });

        return accum;
      }, [] as { orderStatus: IngramOrderStatus[] }[]);

      return orderStatuses;
    } catch (err: any) {
      throw this.handleRequestError(err);
    }
  }

  public async update(
    entity: any,
    context: { id: string }
  ): Promise<any | null> {
    throw new Error('Method not implemented');
  }

  public async delete(id: string): Promise<true | null> {
    throw new Error('Method not implemented');
  }

  public async find(): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async findOne(id: string): Promise<any | null> {
    throw new Error('Method not implemented');
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

function processUnknownClientResponse(response: any) {
  if (typeof response === 'object') {
    const entries: [string, string][] = Object.entries(response);
    const FIRST_KEY = 0;
    const FIRST_KEY_MESSAGE = 1;
    return new Error(
      'Third-party API: ' + entries[FIRST_KEY][FIRST_KEY_MESSAGE]
    );
  }
  return new Error('Something went wrong sending a request to Third-party API');
}

async function pingService(url: string) {
  const dummyData = { orders: [{ order: [] }] };
  const dummyResponse = await httpClientInstanceUnsafe.post(url, {
    responseType: 'json',
    resolveBodyOnly: true,
    json: dummyData,
    timeout: 5000,
    retry: {
      methods: ['POST']
    }
  });

  return dummyResponse;
}
