import { Request, Response, NextFunction } from 'express';

import { AuthenticateController } from '../../../../../../adapters/controllers/ingram';
import { CredentialsRepository } from '../../../../../external-service/ingram/repositories';
import { CreatedResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class AuthenticateDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const credentialsRepository = new CredentialsRepository();

    const createdResponder = new CreatedResponder(this.res);

    const authenticateController = new AuthenticateController(
      credentialsRepository,
      createdResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await authenticateController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
