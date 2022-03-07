import Entity from './interfaces/entity.abstract';

interface IUserProps {
  name: string;
  lastName: string;
  gender: number;
  meta: any;
}

export default class User extends Entity<IUserProps> {
  private constructor(props: IUserProps, id: string | null) {
    super(props, id);
  }

  public static create(userData: IUserProps, id: string | null): User {
    const {
      name,
      lastName,
      gender = userConstants.genders.NOT_SPECIFIED,
      meta = {}
    } = userData;

    return new User({ name, lastName, gender, meta }, id);
  }

  get name(): string {
    return this.props.name;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get gender(): number {
    return this.props.gender;
  }

  get meta(): any {
    return this.props.meta;
  }
}

export const userConstants = {
  genders: {
    MALE: 0,
    FEMALE: 1,
    NOT_SPECIFIED: 2
  }
};
