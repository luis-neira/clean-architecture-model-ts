import { Model, ModelCtor, Sequelize } from 'sequelize';

import { User } from '@core/entities';
import { UserMapper } from '@core/mappers/user';
import IEntityMapper from '@core/mappers/i-entity-mapper';
import { IUsersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '../../interfaces';

export default class UsersRepository
  extends DatabaseRepository
  implements IUsersGateway
{
  private _model: ModelCtor<Model<any, any>>;

  private _dataMapper: Pick<IEntityMapper<User, any>, 'toDomain'>;

  public constructor() {
    super();
    this._model = (this._db as Sequelize).model('User');
    this._dataMapper = new UserMapper();
  }

  public async save(user: User): Promise<User> {
    const userRawData = user.toJSON();

    const addedUser = await this._model.create(userRawData);

    return this._dataMapper.toDomain(addedUser.toJSON());
  }

  public async findOne(userId: string): Promise<User | null> {
    const foundUser = await this._model.findOne({
      where: { id: userId }
    });

    if (!foundUser) return null;

    return this._dataMapper.toDomain(foundUser.toJSON());
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

    return this._dataMapper.toDomain(foundUser.toJSON());
  }

  public async delete(id: string): Promise<true | null> {
    const foundUser = await this._model.findOne({
      where: { id }
    });

    if (!foundUser) return null;

    await foundUser.destroy();

    return true;
  }

  public async findAll(): Promise<User[]> {
    const foundUsers = (await this._model.findAll()).map((el) =>
      this._dataMapper.toDomain(el.toJSON())
    );

    return foundUsers;
  }
}
