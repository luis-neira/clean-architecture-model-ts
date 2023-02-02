export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  meta: Record<string, any>;
  orders?: unknown
  createdAt?: Date;
  updatedAt?: Date;

  toJSON(): Omit<IUser, 'toJSON'> | {}
}