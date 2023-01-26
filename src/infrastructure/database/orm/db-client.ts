import DatabaseClientFactory from './db-client.factory';
import { SingletonWrapper } from '@common/helpers';

const databaseClientFactory = new DatabaseClientFactory();

const databaseClient = databaseClientFactory.makeClient(process.env.DB_DIALECT!);

const singletonDatabaseClient = SingletonWrapper.makeSingleton(databaseClient);

export default singletonDatabaseClient;
