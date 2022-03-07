import { AuthToken } from '../../core/entities';

export default class AuthTokenMap {
  private constructor() {}

  public static toDTO(authToken: AuthToken) {
    return {
      id: authToken.id,
      auth_token: authToken.auth_token
    };
  }

  public static toPersistence(authToken: AuthToken) {
    return {
      id: authToken.id,
      auth_token: authToken.auth_token
    };
  }

  public static toDomain(raw: any) {
    return AuthToken.create(
      {
        auth_token: raw.auth_token
      },
      raw.id
    );
  }
}
