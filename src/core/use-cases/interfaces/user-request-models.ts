interface IUserID {
  id: string;
}

export interface IUserDetails {
  name: string;
  lastName: string;
  gender: number;
  meta: any;
}

export interface IAddUserRequestModel extends IUserDetails {}

export interface IDeleteUserRequestModel extends IUserID {}

export interface IGetUserByIdRequestModel extends IUserID {}

export interface IUpdateOrCreateUserRequestModel extends IUserID {
  userDetails: IUserDetails;
}
