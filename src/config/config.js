require('dotenv/config');
const env = process.env;

const development = {
    username: 'root',
    password: 'nana7221',
    database: 'clone',
    host: '127.0.0.1',
    dialect: 'mysql',
};

const test = {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
};

const production = {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
};

module.exports = { development, test, production };
