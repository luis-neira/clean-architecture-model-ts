import { InMemoryDatabase } from '../in-memory';

import { User } from '@core/entities';
import { UserMapper } from '@core/mappers/user'
import IEntityMapper from '@core/mappers/i-entity-mapper'
import { IUsersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '../../interfaces';

export default class UsersRepository
  extends DatabaseRepository
  implements IUsersGateway
{
  private _model: any[];

  private _dataMapper: Pick<IEntityMapper<User, any>, 'toDomain'>;

  public constructor() {
    super();
    this._model = (this._db as InMemoryDatabase).getModel('User')!;
    this._dataMapper = new UserMapper();
  }

  public create(input: any): User {
    return this._dataMapper.toDomain(input);
  }

  public update(
    user: User,
    input: Record<string, any>
  ): User {
    const updatedPojo = Object.assign({}, user.toJSON(), input);

    return this._dataMapper.toDomain(updatedPojo);
  }

  public async save(user: User): Promise<User> {
    this._model.push(user.toJSON());

    const persistedUser = this._model[this._model.length - 1];

    return this._dataMapper.toDomain(persistedUser);
  }

  public async remove(id: string): Promise<true | null> {
    const userIndex = this._model.findIndex((u: User) => u.id === id);

    if (userIndex < 0) return null;

    this._model.splice(userIndex, 1);

    return true;
  }

  public async findAll(): Promise<User[]> {
    return this._model.map((u) => this._dataMapper.toDomain(u));
  }

  public async findAllUsersWithOrders(): Promise<User[]> {
    throw new Error('Method not implemented');

    // return foundUsers;
  }

  public async findOne(id: string): Promise<User | null> {
    const persistedUser = this._model.find((u: User) => u.id === id);

    if (!persistedUser) return null;

    return this._dataMapper.toDomain(persistedUser);
  }

  public async findOneUserWithOrder(userId: string): Promise<User | null> {
    throw new Error('Method not implemented');

    // return foundUser;
  }
}
