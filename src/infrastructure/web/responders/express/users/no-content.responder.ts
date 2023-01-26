import express from 'express';

import { IResponder } from '@adapters/controllers/interfaces';

export default class NoContentResponder implements IResponder {
  private res: express.Response;

  public constructor(res: express.Response) {
    this.res = res;
  }

  public respond(): void {
    this.res.sendStatus(204);
  }
}
