const path = require('path')

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
    allowEmptyValues: true
  })
}

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOSTNAME,
      user: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: 'sac_api_server_dev',
      port: process.env.PG_PORT,
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname, '../services/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '../services/db/seeds')
    }
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOSTNAME,
      user: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: 'sac_api_server_test',
      port: process.env.PG_PORT,
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, '../services/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '../services/db/seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: process.env.PG_HOSTNAME,
      user: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: 'sac_api_server',
      port: process.env.PG_PORT,
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, '../services/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '../services/db/seeds')
    }
  }
}
