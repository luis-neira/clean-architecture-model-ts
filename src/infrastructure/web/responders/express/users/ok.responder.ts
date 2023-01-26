import express from 'express';

import { IResponder } from '@adapters/controllers/interfaces';

export default class OkResponder implements IResponder {
  private res: express.Response;

  public constructor(res: express.Response) {
    this.res = res;
  }

  public respond(value?: any): void {
    if (!value) {
      this.res.sendStatus(200);
      return;
    }

    this.res.status(200).send(value);
  }
}
