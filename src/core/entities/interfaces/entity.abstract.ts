import { v4 as uuidv4 } from 'uuid';

const isEntity = (v: any): boolean => {
  return v instanceof Entity;
};

export default abstract class Entity<T> {
  protected _id: string;
  protected props: T;

  public constructor(props: T, id: string | null) {
    this._id = id ? id : uuidv4();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  public equals(obj: { [key: string]: any }): boolean {
    if (obj == null) {
      return false;
    }

    if (!isEntity(obj)) {
      return false;
    }

    return this.id === obj.id;
  }

  public toJSON() {
    return {
      id: this.id,
      ...this.props
    };
  }

  public getProps(): T {
    return this.props;
  }
}
