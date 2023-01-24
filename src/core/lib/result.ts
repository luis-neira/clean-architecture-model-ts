export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private _value: T;
  private _error: any;

  public constructor(isSuccess: boolean, error: any, value: T) {
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

  public getValue() {
    if (!this.isSuccess) {
      return undefined;
    }
    return this._value;
  }

  public getError(): any {
    if (this.isFailure) {
      return this._error;
    }
    return undefined;
  }

  public static ok<T2> (result: T2): Result<T2> {
    return new Result<T2>(true, null, result);
  }

  public static fail(error: any): Result<any> {
    return new Result<any>(false, error, null);
  }

  // public static combine(results: any): any {
  //   for (let result of results) {
  //     if (result.isFailure) return result;
  //   }
  //   return Result.ok(null);
  // }
}
