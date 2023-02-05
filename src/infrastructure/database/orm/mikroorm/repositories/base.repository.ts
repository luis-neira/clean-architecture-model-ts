import { MikroORM, EntityRepository, EntityName, EntityData, RequiredEntityData } from '@mikro-orm/core';

import { IEntityGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '@infra/database/orm/interfaces';
// import { User, Product, Order } from '@infra/database/orm/mikroorm/entities';

// type EntityType = User | Product | Order;

export default class MikroOrmBaseRepository<T extends object>
  extends DatabaseRepository
  implements IEntityGateway
{
  protected _db!: MikroORM

  protected _model: EntityRepository<T>;

  public constructor(entity: EntityName<T>) {
    super();
    this._model = this._db.em.getRepository(entity);
  }

  public create(input: RequiredEntityData<T>): T {
    const user = this._model.create(input);

    return user;
  }

  // Lookup what is EntityData?
  public update(
    user: T,
    input: EntityData<T>
  ): T {
    return this._model.assign(user, { ...input }, {
      mergeObjects: true
    });
  }

  public async save(user: T): Promise<T> {
    await this._model.persistAndFlush(user);

    return user;
  }

  public async remove(id: string): Promise<true | null> {
    const foundUser = await this._model.findOne({ id } as object);

    if (!foundUser) return null;

    await this._model.removeAndFlush(foundUser);

    return true;
  }

  public async findAll(): Promise<T[]> {
    const foundUsers = await this._model.findAll();

    return foundUsers;
  }

  public async findOne(id: string): Promise<T | null> {
    const foundUser = await this._model.findOne({ id } as object);

    return foundUser;
  }
}
