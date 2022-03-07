export class Result {
  public isSuccess: boolean;
  public isFailure: boolean;
  private _value: any;
  private _error: any;

  public constructor(isSuccess: boolean, error: any, value: any) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;

    this._value = value;
    this._error = error;

    Object.freeze(this);
  }

  public getValue(): any {
    if (!this.isSuccess) {
      return this._error;
    }
    return this._value;
  }

  public getError(): any {
    if (this.isFailure) {
      return this._error;
    }
    return undefined;
  }

  public static ok(result: any): Result {
    return new Result(true, null, result);
  }

  public static fail(error: any): Result {
    return new Result(false, error, null);
  }

  public static combine(results: any): any {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok(null);
  }
}
