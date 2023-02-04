import { MikroORM, EntityRepository, wrap } from '@mikro-orm/core';

import { IUsersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '@infra/database/orm/interfaces';
import { User } from '@infra/database/orm/mikroorm/entities';

export default class UsersRepository
  extends DatabaseRepository
  implements IUsersGateway
{
  protected _db!: MikroORM

  private _model: EntityRepository<User>;

  public constructor() {
    super();
    this._model = this._db.em.getRepository(User);
  }

  public create(input: any): User {
    const user = this._model.create(input);

    return user;
  }

  public update(
    user: User,
    input: Record<string, any>
  ): User {
    return this._model.assign(user, { ...input }, {
      mergeObjects: true
    });
  }

  public async save(user: User): Promise<User> {
    await this._model.persistAndFlush(user);

    return user;
  }

  public async remove(id: string): Promise<true | null> {
    const foundUser = await this._model.findOne({ id });

    if (!foundUser) return null;

    await this._model.removeAndFlush(foundUser);

    return true;
  }

  public async findAll(): Promise<User[]> {
    const foundUsers = await this._model.findAll();

    return foundUsers;
  }

  public async findAllUsersWithOrders(): Promise<User[]> {
    const foundUsers = await this._model.findAll({ populate: ['orders'] });

    return foundUsers;
  }

  public async findOne(userId: string): Promise<User | null> {
    const foundUser = await this._model.findOne({ id: userId });

    return foundUser;
  }

  public async findOneUserWithOrder(userId: string): Promise<User | null> {
    const foundUser = await this._model.findOne({
      id: userId
    }, {
      populate: ['orders']
    });

    return foundUser;
  }
}
