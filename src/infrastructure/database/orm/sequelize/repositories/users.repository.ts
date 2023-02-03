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

  public async create(input: any): Promise<User> {
    const user = await this._model.create(input);

    return user;
  }

  public async save(user: User): Promise<User> {
    const savedUser = await user.save()

    return savedUser;
  }

  public async findOne(userId: string): Promise<User | null> {
    const foundUser = await this._model.findOne({
      where: { id: userId }
    });

    if (!foundUser) return null;

    return foundUser;
  }

  public async update(
    input: any,
    context: { id: string }
  ): Promise<User | null> {
    const foundUser = await this._model.findOne({
      where: { id: context.id }
    });

    if (!foundUser) return null;

    Reflect.deleteProperty(input, 'id');

    foundUser.set({
      ...input
    });

    const savedUser = await foundUser.save();

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
}
