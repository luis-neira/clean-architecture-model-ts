import { Image } from '../../core/entities';

export default class ImageMap {
  private constructor() {}

  public static toDTO(image: Image) {
    return {
      id: image.id,
      title: image.title,
      url: image.url,
      thumbnailUrl: image.thumbnailUrl,
      _externalId: image._externalId
    };
  }

  public static toPersistence(image: Image) {
    return {
      id: image.id,
      title: image.title,
      url: image.url,
      thumbnailUrl: image.thumbnailUrl,
    };
  }

  public static toDomain(raw: any) {
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
