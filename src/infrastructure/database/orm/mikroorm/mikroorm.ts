import { MemoryCacheAdapter, Options } from '@mikro-orm/core';
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'; 

import { User, Product, Order } from './entities'
 
const config: Options<PostgreSqlDriver> = {
  resultCache: {
    adapter: MemoryCacheAdapter,
    expiration: 1000, // 1s
    options: {},
  },
  debug: true,
  entities: [ User, Product, Order ],
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  type: "postgresql", // `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
}

export default config;
