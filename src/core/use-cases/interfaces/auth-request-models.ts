export type Email = string;
export type Password = string;

export interface IAuthDetails {
  email: Email;
  password: Password;
}

export interface IAuthIgramRequestModel extends IAuthDetails {}
