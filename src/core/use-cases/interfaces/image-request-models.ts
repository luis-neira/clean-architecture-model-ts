interface IImageID {
  id: string;
}

export interface IImageDetails {
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IAddImageRequestModel extends IImageDetails {}

export interface IDeleteImageRequestModel extends IImageID {}

export interface IGetImageByIdRequestModel extends IImageID {}

export interface IUpdateOrCreateImageRequestModel extends IImageDetails {
  _externalId: number;
}
