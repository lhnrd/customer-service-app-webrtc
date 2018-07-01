import path from 'path'
import dotenv from 'dotenv-safe'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  dotenv.load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
    allowEmptyValues: true
  })
}

module.exports = {
  env: process.env.NODE_ENV || 'development',
  root: path.join(__dirname, '../../'),
  port: process.env.API_PORT,
  ip: process.env.API_HOST,
  apiRoot: process.env.API_ROOT,
  masterKey: requireProcessEnv('MASTER_KEY'),
  jwtSecret: requireProcessEnv('JWT_SECRET'),
  knex: require('./knexfile')[process.env.NODE_ENV]
}
