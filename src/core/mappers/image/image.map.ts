import { Image } from '../../entities';
import IEntityMapper from '../i-entity-mapper';
import { IImageDto } from '../../dtos/image';

export default class ImageMapper implements IEntityMapper<Image, IImageDto> {
  public constructor() {}

  public toDTO(image: Image): IImageDto {
    const i = image.toJSON();
    Reflect.deleteProperty(i, 'id');
    return {
      imageId: image.id,
      ...i
    };
  }

  public toDomain(raw: { [key:string]: any }): Image {
    return Image.create(
      {
        title: raw.title,
        url: raw.url,
        thumbnailUrl: raw.thumbnailUrl,
        _externalId: raw._externalId
      },
      raw.id
    );
  }
}
