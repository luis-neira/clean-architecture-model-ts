import Entity from './interfaces/entity.abstract';

interface IUserProps {
  firstName: string;
  lastName: string;
  meta: Record<string, any>
}

export default class User extends Entity<IUserProps> {
  private constructor(props: IUserProps, id: string | null) {
    super(props, id);
  }

  public static create(userData: IUserProps, id: string | null): User {
    const {
      firstName,
      lastName,
      meta = {}
    } = userData;

    return new User({ firstName, lastName, meta }, id);
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get meta(): Record<string, any> {
    return this.props.meta;
  }
}
