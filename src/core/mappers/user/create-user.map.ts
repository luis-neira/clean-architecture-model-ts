import { User } from '../../entities';
import IEntityMapper from '../i-mapper';
import ICreateUserDto from '../../dtos/user/create-user.dto';

export default class CreateUserMapper implements IEntityMapper<User, ICreateUserDto> {
  public constructor() {}

  public toDTO(user: User): ICreateUserDto {
    return {
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
