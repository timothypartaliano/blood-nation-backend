module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'database_dev',
    password: process.env.DB_PASSWORD || 'database_dev',
    database: process.env.DB_DATABASE || 'database_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.CI_DB_USERNAME || 'root',
    password: process.env.CI_DB_PASSWORD || null,
    database: process.env.CI_DB_NAME || 'database_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME || 'root',
    password: process.env.PROD_DB_PASSWORD || null,
    database: process.env.PROD_DB_NAME || 'database_production',
    host: process.env.PROD_DB_HOSTNAME || '127.0.0.1',
    port: process.env.PROD_DB_PORT || 5432,
    dialect: 'postgres',
  },
};