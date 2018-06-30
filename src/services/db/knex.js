import Knex from 'knex'
import { knex as knexConfig } from '../../config'

let knex = null

export function init () {
  if (knex) {
    throw new Error("There's already a knex database connection.")
  }
  knex = Knex(knexConfig)
  return knex
}

export async function destroy () {
  if (!knex) {
    throw new Error("There's no knex database connection.")
  }
  await knex.destroy()
  const conn = knex
  knex = null
  return conn
}

export function get () {
  if (!knex) {
    throw new Error("There's no knex database connection.")
  }
  return knex
}

export default {
  init,
  destroy,
  get
}
