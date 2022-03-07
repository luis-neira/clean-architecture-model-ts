import got, { Got } from 'got';

import {
  Credentials,
  AuthToken,
  IAuthTokenProps
} from '../../../../core/entities';

import { ICredentialsGateway } from '../../../../core/use-cases/interfaces';

export default class CredentialsRepository implements ICredentialsGateway {
  private _pathname: string;
  private _client: Got;

  public constructor() {
    this._pathname = 'authenticate';
    this._client = got.extend({
      prefixUrl: process.env.SERVICE_INGRAM
    });
  }

  public async create(entity: Credentials): Promise<Credentials> {
    throw new Error('Method not implemented.');
  }

  public async update(
    entity: Credentials,
    context: { id: string }
  ): Promise<Credentials | null> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<true | null> {
    throw new Error('Method not implemented.');
  }

  public async authenticate(entity: Credentials): Promise<AuthToken> {
    const url = this._pathname;

    const credentials = entity.getProps();

    const response: IAuthTokenProps = await this._client.post(url, {
      responseType: 'json',
      resolveBodyOnly: true,
      json: credentials
    });

    return AuthToken.create(response, null);
  }
}
