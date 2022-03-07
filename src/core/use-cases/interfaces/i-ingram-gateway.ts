import { AuthToken } from '../../entities';

import { IAuthDetails } from './auth-request-models';

export interface ICredentialsGateway {
  authenticate(credentials: IAuthDetails): Promise<AuthToken | null>;
}
