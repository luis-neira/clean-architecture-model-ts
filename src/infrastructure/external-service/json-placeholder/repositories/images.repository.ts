import got, { Got, HTTPError } from 'got';

import { Image } from '@core/entities';
import { ImageMapper } from '@core/mappers/image'
import IEntityMapper from '@core/mappers/i-entity-mapper'

import { IImagesGateway } from '@core/use-cases/interfaces';

type PropByString = Record<string, any>;

export default class ImagesRepository implements IImagesGateway {
  private _pathname: string;
  private _client: Got;
  private _dataMapper: Pick<IEntityMapper<Image, any>, 'toDomain'>;

  public constructor() {
    this._pathname = 'photos';
    this._client = got.extend({
      prefixUrl: process.env.SERVICE_JSON_PLACEHOLDER
    });
    this._dataMapper = new ImageMapper();
  }

  public async save(image: Image): Promise<Image> {
    const url = this._pathname;

    const imageRequestDetails = image.toJSON();

    const response: PropByString = await this._client.post(url, {
      responseType: 'json',
      resolveBodyOnly: true,
      json: imageRequestDetails
    });

    response._externalId = response.id;
    response.id = imageRequestDetails.id;

    return this._dataMapper.toDomain(response);
  }

  public async update(
    image: Image,
    context: { id: string }
  ): Promise<Image | null> {
    const url = `${this._pathname}/${context.id}`;

    const imageRequestDetails = image.toJSON();

    try {
      const response: PropByString = await this._client.put(url, {
        responseType: 'json',
        resolveBodyOnly: true,
        json: imageRequestDetails
      });

      response._externalId = response.id;
      response.id = imageRequestDetails.id;

      return this._dataMapper.toDomain(response);
    } catch (e: any) {
      const notFoundMsg = "Cannot read properties of undefined (reading 'id')";
      if (e.message === notFoundMsg) return null;
      throw e;
    }
  }

  public async delete(id: string): Promise<true | null> {
    const url = `${this._pathname}/${id}`;

    try {
      await this._client.delete(url).json();

      return true;
    } catch (e: any) {
      return null;
    }
  }

  public async findOne(id: string): Promise<Image | null> {
    const url = `${this._pathname}/${id}`;

    const response: PropByString = await this._client.get(url).json();

    if (JSON.stringify(response) === '{}') {
      return null;
    }

    response._externalId = response.id;
    response.id = null;

    return this._dataMapper.toDomain(response);
  }

  public async findAll(): Promise<Image[]> {
    const url = `${this._pathname}`;

    const response: PropByString[] = await this._client.get(url).json();

    const mappedResponse = response.map((el) => {
      el._externalId = el.id;
      el.id = null;
      return this._dataMapper.toDomain(el);
    });

    return mappedResponse;
  }

  // private handleClientError(e: unknown): null {
  //   if (e instanceof HTTPError === false) throw e;

  //   const err = e as HTTPError;

  //   if (err.code === 'ERR_NON_2XX_3XX_RESPONSE') return null;

  //   throw err;
  // }
}
