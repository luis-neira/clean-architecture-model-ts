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

  public equals(object: any): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.id === object.id;
  }

  public toJSON() {
    return {
      id: this.id,
      ...this.props
    };
  }

  public getProps() {
    return {
      ...this.props
    };
  }
}
