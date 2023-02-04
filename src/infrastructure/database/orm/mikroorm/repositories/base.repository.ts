// import { MikroORM, EntityRepository, EntityName, AnyEntity } from '@mikro-orm/core';

// import { IEntityGateway } from '@core/use-cases/interfaces';

// import { DatabaseRepository } from '@infra/database/orm/interfaces';
// import { User, Product, Order } from '@infra/database/orm/mikroorm/entities';

// type EntityType = User | Product | Order;

// export default class UsersRepository<T extends EntityType>
//   extends DatabaseRepository
//   implements IEntityGateway
// {
//   protected _db!: MikroORM

//   private _model: EntityRepository<AnyEntity<T>>;

//   public constructor(entity: EntityName<AnyEntity>) {
//     super();
//     this._model = this._db.em.getRepository(entity);
//   }

//   public create(input: any): AnyEntity {
//     const user = this._model.create(input);

//     return user;
//   }

//   public update(
//     user: AnyEntity,
//     input: Record<string, any>
//   ): AnyEntity {
//     return this._model.assign(user, { ...input }, {
//       mergeObjects: true
//     });
//   }

//   public async save(user: AnyEntity): Promise<AnyEntity> {
//     await this._model.persistAndFlush(user);

//     return user;
//   }

//   public async remove(id: string): Promise<true | null> {
//     const foundUser = await this._model.findOne({ id });

//     if (!foundUser) return null;

//     await this._model.removeAndFlush(foundUser);

//     return true;
//   }

//   public async findAll(): Promise<AnyEntity[]> {
//     const foundUsers = await this._model.findAll();

//     return foundUsers;
//   }

//   public async findOne(userId: string): Promise<AnyEntity | null> {
//     const foundUser = await this._model.findOne({ id: userId });

//     return foundUser;
//   }
// }
