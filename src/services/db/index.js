import Knex from 'knex'
import { Model } from 'objection'
import { knex as knexConfig } from '../../config'

let knex = null

export function init () {
  if (knex) {
    throw new Error("There's already a database connection.")
  }
  knex = Knex(knexConfig)
  Model.knex(knex)
  return knex
}

export async function destroy () {
  if (!knex) {
    throw new Error("There's no database connection.")
  }
  await knex.destroy()
  const conn = knex
  knex = null
  return conn
}

export function get () {
  if (!knex) {
    throw new Error("There's no database connection.")
  }
  return knex
}

export default {
  init,
  destroy,
  get
}
