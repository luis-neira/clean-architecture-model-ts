import * as constants from '@config/constants';

export default class ValueNotFoundError extends Error {
  public name: string;
  public code: string;

  public constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = constants.ERR_VALUE_NOT_FOUND;
  }
}
