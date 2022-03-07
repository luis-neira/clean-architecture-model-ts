import { Result } from '../../../core/lib/result';

export default interface IValidator {
  validate(payload: Record<string, any>): Promise<Result>;
}
