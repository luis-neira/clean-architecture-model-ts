import type { MikroORM, EntityRepository } from '@mikro-orm/core';

import { User } from '@core/entities';
import { UserMapper } from '@core/mappers/user';
import IEntityMapper from '@core/mappers/i-entity-mapper';
import { IUsersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '@infra/database/orm/interfaces';

export default class UsersRepository
  extends DatabaseRepository
  implements IUsersGateway
{
  protected _db!: MikroORM

  private _model: EntityRepository<User>;
  private _dataMapper: Pick<IEntityMapper<User, any>, 'toDomain'>;

  public constructor() {
    super();
    this._model = this._db.em.getRepository(User);
    this._dataMapper = new UserMapper();
  }

  public async save(user: User): Promise<User> {
    const userRawData = user.toJSON();

    const addedUser = await this._model.create(userRawData);

    await this._model.persistAndFlush(addedUser);

    return this._dataMapper.toDomain(addedUser.toJSON());
  }

  public async findOne(userId: string): Promise<User | null> {
    const foundUser = await this._model.findOne({ id: userId });

    if (!foundUser) return null;

    return this._dataMapper.toDomain(foundUser.toJSON());
  }

  public async update(
    user: User,
    context: { id: string }
  ): Promise<User | null> {
    const foundUser = await this._model.findOne({ id: context.id });

    if (!foundUser) return null;

    Object.assign(foundUser, user.getProps());

    await this._model.persistAndFlush(foundUser);

    return this._dataMapper.toDomain(foundUser.toJSON());
  }

  public async delete(id: string): Promise<true | null> {
    const foundUser = await this._model.findOne({ id });

    if (!foundUser) return null;

    await this._model.removeAndFlush(foundUser);

    return true;
  }

  public async findAll(): Promise<User[]> {
    const foundUsers = (await this._model.findAll()).map((u) =>
      this._dataMapper.toDomain(u.toJSON())
    );

    return foundUsers;
  }
}
