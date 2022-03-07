import got, { Got } from 'got';

import { URL } from 'url';

import { IUsersGateway } from '../../../../core/use-cases/interfaces';

export default class UsersRepository implements IUsersGateway {
  private _pathname: string;
  private _client: Got;

  public constructor() {
    this._pathname = 'photos';
    this._client = got.extend({
      prefixUrl: 'https://jsonplaceholder.typicode.com'
    });
  }

  public async create(image: any): Promise<any> {}

  public async update(image: any): Promise<any> {}

  public async delete(id: any): Promise<any> {}

  public async findOne(id: any): Promise<any> {
    const url = new URL(`${this._pathname}/${id}`);

    const data = await this._client.get(url).json();

    return data;
  }

  public async find(): Promise<any> {}
}
