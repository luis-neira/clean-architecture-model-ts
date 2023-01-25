import { User } from '../../entities';
import IEntityMapper from '../i-mapper';

export default class UserMapper implements Pick<IEntityMapper<User, any>, 'toDomain'> {
  public constructor() {}

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
