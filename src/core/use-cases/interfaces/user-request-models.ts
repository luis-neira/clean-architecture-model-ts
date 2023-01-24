interface IUserID {
  id: string;
}

export interface IUserDetails {
  firstName: string;
  lastName: string;
  meta: {
    [key: string]: any
  };
}

export interface IAddUserRequestModel extends IUserDetails {}

export interface IDeleteUserRequestModel extends IUserID {}

export interface IGetUserByIdRequestModel extends IUserID {}

export interface IUpdateOrCreateUserRequestModel extends IUserID {
  userDetails: IUserDetails;
}
