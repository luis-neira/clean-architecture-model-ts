import Entity from './interfaces/entity.abstract';

type Token = string;

export interface IAuthTokenProps {
  auth_token: Token;
}

export default class AuthToken extends Entity<IAuthTokenProps> {
  private constructor(props: IAuthTokenProps, id: string | null) {
    super(props, id);
  }

  public static create(
    tokenDetails: IAuthTokenProps,
    id: string | null
  ): AuthToken {
    const { auth_token }: IAuthTokenProps = tokenDetails;

    return new AuthToken({ auth_token }, id);
  }

  get auth_token(): Token {
    return this.props.auth_token;
  }
}
