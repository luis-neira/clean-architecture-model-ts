// Error Codes
export const ERR_VALIDATION = 'ERR_VALIDATION';
export const ERR_VALUE_NOT_FOUND = 'ERR_VALUE_NOT_FOUND';

// Database dialect configuration
export const dbDialects = {
  IN_MEMORY: 'inMemory',
  MARIA_DB: 'mariadb',
  POSTGRES: 'postgres',
};

// Database client configuration
export const dbClients = {
  MIKRO_ORM: 'mikroOrm',
  SEQUELIZE: 'sequelize',
  IN_MEMORY: 'inMemory',
}

// API Resource collections
export const resourceName = {
  USERS: 'users',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  IMAGES: 'images'
};
