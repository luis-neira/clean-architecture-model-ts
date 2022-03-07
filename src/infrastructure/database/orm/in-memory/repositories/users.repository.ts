import { User } from '../../../../../core/entities';
import { InMemoryDatabase } from '../in-memory';
import { UserMap } from '../../../../../common/mappers';

import { DatabaseRepository } from '../../interfaces';
import { IUsersGateway } from '../../../../../core/use-cases/interfaces';

export default class UsersRepository
  extends DatabaseRepository
  implements IUsersGateway
{
  private _model: any[];

  public constructor() {
    super();
    this._model = (this._db as InMemoryDatabase).getModel('User')!;
  }

  public async create(user: User): Promise<User> {
    this._model.push(UserMap.toPersistence(user));

    const persistedUser = this._model[this._model.length - 1];

    return UserMap.toDomain(persistedUser);
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

    return UserMap.toDomain(this._model[userIndex]);
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

    return UserMap.toDomain(persistedUser);
  }

  public async find(): Promise<User[]> {
    return this._model;
  }
}
