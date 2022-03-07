import { Credentials } from '../../core/entities';

export default class CredentialsMap {
  private constructor() {}

  public static toDTO(credentials: Credentials) {
    return {
      id: credentials.id,
      email: credentials.email,
      password: credentials.password
    };
  }

  public static toPersistence(credentials: Credentials) {
    return {
      id: credentials.id,
      email: credentials.email,
      password: credentials.password
    };
  }

  public static toDomain(raw: any) {
    return Credentials.create(
      {
        email: raw.email,
        password: raw.password
      },
      raw.id
    );
  }
}
