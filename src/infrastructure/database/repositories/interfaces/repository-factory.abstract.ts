import * as constants from '@config/constants';

type RepositoryMakerByDialect<T> = Record<string, () => T>;

export default abstract class RepositoryFactory<T> {
  public constructor() {}

  public abstract create(dbDialect: string): T;

  protected selectRepositoryMaker(
    repositoryMakerByDialect: RepositoryMakerByDialect<T>,
    dbDialect: string
  ): () => T {
    const { dbDialects } = constants;

    if (dbDialect in repositoryMakerByDialect) {
      const repositoryMaker = repositoryMakerByDialect[dbDialect];
      return repositoryMaker;
    }

    return repositoryMakerByDialect[dbDialects.IN_MEMORY];
  }
}
