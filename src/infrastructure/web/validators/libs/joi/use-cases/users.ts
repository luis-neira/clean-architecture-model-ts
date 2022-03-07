import { JoiValidator } from '../validator-wrapper';
import {
  AddUserSchema,
  GetUserByIdSchema,
  DeleteUserByIdSchema,
  UpdateOrCreateUserSchema
} from '../schemas/users';

export const addUserValidator = new JoiValidator(AddUserSchema);
export const getUserByIdValidator = new JoiValidator(GetUserByIdSchema);
export const deleteUserByIdValidator = new JoiValidator(DeleteUserByIdSchema);
export const updateOrCreateUserValidator = new JoiValidator(
  UpdateOrCreateUserSchema
);
