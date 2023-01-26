import express from 'express';

import { IResponder } from '@adapters/controllers/interfaces';

export default class CreatedResponder implements IResponder {
  private res: express.Response;

  public constructor(res: express.Response) {
    this.res = res;
  }

  public respond(value: any): void {
    this.res.status(201).send(value);
  }
}
