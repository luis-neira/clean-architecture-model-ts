import { User } from '../../core/entities';

export default class UserMap {
  private constructor() {}

  public static toDTO(user: User) {
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      gender: user.gender,
      meta: user.meta
    };
  }

  public static toPersistence(user: any) {
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      gender: user.gender,
      meta: user.meta
    };
  }

  public static toDomain(raw: any) {
    return User.create(
      {
        name: raw.name,
        lastName: raw.lastName,
        gender: raw.gender,
        meta: raw.meta
      },
      raw.id
    );
  }
}
