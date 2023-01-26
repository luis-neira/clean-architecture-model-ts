import { User } from '../../entities';
import IEntityMapper from '../i-entity-mapper';
import { IUserDto } from '../../dtos/user';

export default class UserMapper implements IEntityMapper<User, IUserDto> {
  public constructor() {}

  public toDTO(user: User): IUserDto {
    return {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      meta: user.meta
    };
  }

  public toDomain(raw: { [key:string]: any }): User {
    return User.create(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        meta: raw.meta
      },
      raw.id
    );
  }
}
