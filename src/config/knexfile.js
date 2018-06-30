const path = require('path')

/* istanbul ignore next */
if (!process.env.NODE_ENV) { // empty node env means is a command line execution
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
    allowEmptyValues: true
  })
}

const commonConfig = {
  client: 'pg',
  connection: {
    charset: 'utf8',
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    user: process.env.PG_USER
  },
  migrations: {
    directory: path.join(__dirname, '../services/db/migrations')
  },
  pool: {
    min: 2,
    max: 10
  },
  seeds: {
    directory: path.join(__dirname, '../services/db/seeds')
  }
}

module.exports = {
  development: commonConfig,
  test: commonConfig,
  production: commonConfig
}
