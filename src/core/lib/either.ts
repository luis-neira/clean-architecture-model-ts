export class Left {
  public value: any;

  public constructor(value: any) {
    this.value = value;
  }

  public isLeft(): boolean {
    return true;
  }

  public isRight(): boolean {
    return false;
  }
}

export class Right {
  public value: any;

  public constructor(value: any) {
    this.value = value;
  }

  public isLeft(): boolean {
    return false;
  }

  public isRight(): boolean {
    return true;
  }

  public applyOnRight(func: any): Right {
    return new Right(func(this.value));
  }
}

export const left = (l: any): Left => {
  return new Left(l);
};

export const right = (a: any): Right => {
  return new Right(a);
};
