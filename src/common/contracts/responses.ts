export class SuccessResponse {
  public content: any;
  public error: null;

  public constructor(content: any) {
    this.error = null;
    this.content = content;
  }

  public static create(content: any = {}): SuccessResponse {
    return new SuccessResponse(content);
  }
}

export class FailResponse {
  public error: any;
  public content: null;

  public constructor(errorProps: any) {
    const error = {
      msg: errorProps.msg,
      reason: errorProps.reason,
      url: errorProps.url,
      ip: errorProps.ip,
      validationErrors: errorProps.validationErrors
    };
    this.error = error;
    this.content = null;
  }

  static create(errorProps: any = {}): FailResponse {
    const { msg, reason, url, ip, validationErrors = [] } = errorProps;

    return new FailResponse({ msg, reason, url, ip, validationErrors });
  }
}
