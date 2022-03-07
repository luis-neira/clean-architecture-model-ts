import Entity from './interfaces/entity.abstract';

type Email = string;
type Password = string;

interface ICredentialsProps {
  email: Email;
  password: Password;
}

export default class Credentials extends Entity<ICredentialsProps> {
  private constructor(props: ICredentialsProps, id: string | null) {
    super(props, id);
  }

  public static create(
    credentialsDetails: ICredentialsProps,
    id: string | null
  ): Credentials {
    const { email, password }: ICredentialsProps = credentialsDetails;

    return new Credentials({ email, password }, id);
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): Password {
    return this.props.password;
  }
}
