import Entity from './interfaces/entity.abstract';

interface IImageProps {
  title: string;
  url: string;
  thumbnailUrl: string;
  _externalId?: number;
}

export default class Image extends Entity<IImageProps> {
  private constructor(props: IImageProps, id: string | null) {
    super(props, id);
  }

  public static create(
    imageData: IImageProps,
    internalId: string | null
  ): Image {
    const { title, url, thumbnailUrl, _externalId } = imageData;

    const image: IImageProps = {
      title,
      url,
      thumbnailUrl
    };

    if (_externalId) {
      image._externalId = _externalId;
    }

    return new Image(image, internalId);
  }

  get title(): string {
    return this.props.title;
  }

  get url(): string {
    return this.props.url;
  }

  get thumbnailUrl(): string {
    return this.props.thumbnailUrl;
  }

  get _externalId(): number | undefined {
    return this.props._externalId;
  }
}
