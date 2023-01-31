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

  public async save(user: User): Promise<User> {
    this._model.push(user.toJSON());

    const persistedUser = this._model[this._model.length - 1];

    return this._dataMapper.toDomain(persistedUser);
  }

  public async update(
    user: User,
    context: { id: string }
  ): Promise<User | null> {
    const userIndex = this._model.findIndex((u: User) => u.id === context.id);

    if (userIndex < 0) return null;

    const updatedUser = user.toJSON();
    Reflect.deleteProperty(updatedUser, 'id');

    Object.assign(this._model[userIndex], updatedUser);

    return this._dataMapper.toDomain(this._model[userIndex]);
  }

  public async delete(id: string): Promise<true | null> {
    const userIndex = this._model.findIndex((u: User) => u.id === id);

    if (userIndex < 0) return null;

    this._model.splice(userIndex, 1);

    return true;
  }

  public async findOne(id: string): Promise<User | null> {
    const persistedUser = this._model.find((u: User) => u.id === id);

    if (!persistedUser) return null;

    return this._dataMapper.toDomain(persistedUser);
  }

  public async findAll(): Promise<User[]> {
    return this._model;
  }
}
