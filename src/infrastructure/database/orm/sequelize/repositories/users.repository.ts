import { Model, ModelCtor, Sequelize } from 'sequelize';

import { UserMap } from '../../../../../common/mappers';
import { User } from '../../../../../core/entities';

import { DatabaseRepository } from '../../interfaces';
import {
  IUsersGateway,
  IUserDetails
} from '../../../../../core/use-cases/interfaces';

export default class UsersRepository
  extends DatabaseRepository
  implements IUsersGateway
{
  private _model: ModelCtor<Model<any, any>>;

  public constructor() {
    super();
    this._model = (this._db as Sequelize).model('User');
  }

  public async create(user: User): Promise<User> {
    const userRawData = UserMap.toPersistence(user);

    const addedUser = await this._model.create(userRawData);

    return UserMap.toDomain(addedUser.toJSON());
  }

  public async findOne(userId: string): Promise<User | null> {
    const foundUser = await this._model.findOne({
      where: { id: userId }
    });

    if (!foundUser) return null;

    return UserMap.toDomain(foundUser.toJSON());
  }

  public async update(
    user: User,
    context: { id: string }
  ): Promise<User | null> {
    const foundUser = await this._model.findOne({
      where: { id: context.id }
    });

    if (!foundUser) return null;

    const updatedUser = user.toJSON();
    Reflect.deleteProperty(updatedUser, 'id');

    foundUser.set({
      ...updatedUser
    });

    await foundUser.save();

    return UserMap.toDomain(foundUser.toJSON());
  }

  public async delete(id: string): Promise<true | null> {
    const foundUser = await this._model.findOne({
      where: { id }
    });

    if (!foundUser) return null;

    await foundUser.destroy();

    return true;
  }

  public async find(): Promise<User[]> {
    const foundUsers = (await this._model.findAll()).map((el) =>
      UserMap.toDomain(el.toJSON())
    );

    return foundUsers;
  }
}
