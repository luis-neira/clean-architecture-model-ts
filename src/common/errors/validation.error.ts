import * as constants from '@config/constants';

interface IValidationError extends Error {
  reason?: any;
  validationErrors?: any;
}

export default class ValidationError extends Error implements IValidationError {
  public name: string;
  public code: string;
  public reason?: any;
  public validationErrors?: any;

  public constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = constants.ERR_VALIDATION;
  }
}
