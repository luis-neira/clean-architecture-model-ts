import { User } from '../../core/entities';

export default class UserMap {
  private constructor() {}

  public static toDTO(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      meta: user.meta
    };
  }

  public static toPersistence(user: any) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      meta: user.meta
    };
  }

  public static toDomain(raw: any) {
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
