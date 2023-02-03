import { ModelCtor, Sequelize } from 'sequelize';

import { IUsersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '../../interfaces';
import { User } from '@infra/database/orm/sequelize/models/User';

export default class UsersRepository
  extends DatabaseRepository
  implements IUsersGateway
{
  protected _db!: Sequelize;

  private _model: ModelCtor<User>;

  public constructor() {
    super();
    this._model = this._db.model('User') as ModelCtor<User>;
  }

  public create(input: any): User {
    const user = this._model.build(input);

    return user;
  }

  public update(
    user: User,
    input: Record<string, any>
  ): User {
    return user.set({
      ...input
    });
  }

  public async save(user: User): Promise<User> {
    const savedUser = await user.save()

    return savedUser;
  }

  public async remove(id: string): Promise<true | null> {
    const foundUser = await this._model.findOne({
      where: { id }
    });

    if (!foundUser) return null;

    await foundUser.destroy();

    return true;
  }

  public async findAll(): Promise<User[]> {
    const foundUsers = await this._model.findAll();

    return foundUsers;
  }

  public async findAllUsersWithOrders(): Promise<User[]> {
    throw new Error('Method not implemented');

    // return foundUsers;
  }

  public async findOne(userId: string): Promise<User | null> {
    const foundUser = await this._model.findOne({
      where: { id: userId }
    });

    if (!foundUser) return null;

    return foundUser;
  }

  public async findOneUserWithOrder(userId: string): Promise<User | null> {
    throw new Error('Method not implemented');

    // return foundUser;
  }
}
