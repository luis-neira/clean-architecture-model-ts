import { Result } from '@core/lib/result';

export default interface IValidator {
  validate<T>(payload: Record<string, any>): Promise<Result<T>>;
}
