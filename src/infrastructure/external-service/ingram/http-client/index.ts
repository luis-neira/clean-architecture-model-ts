import got from 'got';

import { Credentials, AuthToken } from '../../../../core/entities';
import { CredentialsRepository } from '../repositories';

export const httpClientInstance = got.extend({
  prefixUrl: process.env.SERVICE_INGRAM,
  mutableDefaults: true,
  hooks: {
    afterResponse: [
      async (response, retryWithMergedOptions) => {
        if (response.statusCode === 401) {
          const refreshedToken = await getIngramToken();

          const updatedOptions = {
            headers: {
              Authorization: refreshedToken.auth_token
            }
          };

          // Update the defaults
          httpClientInstance.defaults.options = got.mergeOptions(
            httpClientInstance.defaults.options,
            updatedOptions
          );

          // Make a new retry
          return retryWithMergedOptions(updatedOptions);
        }

        // No changes otherwise
        return response;
      }
    ]
  },
  timeout: 5000,
  retry: {
    limit: 5,
    // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    methods: ['GET'],
    calculateDelay: ({ attemptCount, retryOptions, error, computedValue }) => {
      console.log('Request taking too long. Retying...');
      console.log('Attempt:', attemptCount);
      return computedValue;
    }
  }
});

export const httpClientInstanceUnsafe = got.extend({
  prefixUrl: process.env.SERVICE_INGRAM,
  mutableDefaults: true,
  hooks: {
    afterResponse: [
      async (response, retryWithMergedOptions) => {
        if (response.statusCode === 401) {
          const refreshedToken = await getIngramToken();

          const updatedOptions = {
            headers: {
              Authorization: refreshedToken.auth_token
            }
          };

          // Update the defaults
          httpClientInstance.defaults.options = got.mergeOptions(
            httpClientInstance.defaults.options,
            updatedOptions
          );

          // Make a new retry
          return retryWithMergedOptions(updatedOptions);
        }

        // No changes otherwise
        return response;
      }
    ]
  }
});

async function getIngramToken(): Promise<AuthToken> {
  const credentialsRepo = new CredentialsRepository();

  const credentials = Credentials.create(
    {
      email: process.env.INGRAM_CREDS_EMAIL!,
      password: process.env.INGRAM_CREDS_PASSWORD!
    },
    null
  );

  const token = await credentialsRepo.authenticate(credentials);
  return token;
}
