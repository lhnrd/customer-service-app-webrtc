import Knex from 'knex'
import { knex as knexConfig } from '../../config'

const knex = Knex(knexConfig)

export default knex
