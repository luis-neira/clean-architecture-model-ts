import * as constants from '@config/constants';

type RepositoryMakerByClient<T> = Record<string, () => T>;

export default abstract class RepositoryFactory<T> {
  public constructor() {}

  public abstract create(dbClient: string): T;

  protected selectRepositoryMaker(
    repositoryMakerByClient: RepositoryMakerByClient<T>,
    dbClient: string
  ): () => T {
    const { dbClients } = constants;

    if (dbClient in repositoryMakerByClient) {
      const repositoryMaker = repositoryMakerByClient[dbClient];
      return repositoryMaker;
    }

    return repositoryMakerByClient[dbClients.IN_MEMORY];
  }
}
