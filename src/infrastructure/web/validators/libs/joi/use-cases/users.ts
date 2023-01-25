import { JoiValidator } from '../validator-wrapper';
import {
  AddUserSchema,
  GetUserByIdSchema,
  DeleteUserByIdSchema,
  UpdateUserSchema
} from '../schemas/users';

export const addUserValidator = new JoiValidator(AddUserSchema);
export const getUserByIdValidator = new JoiValidator(GetUserByIdSchema);
export const deleteUserByIdValidator = new JoiValidator(DeleteUserByIdSchema);
export const updateUserValidator = new JoiValidator(
  UpdateUserSchema
);
