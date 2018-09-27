import database from '../src/services/db'

const tables = [
  'users'
]

export const truncate = table => () =>
  database.get().raw(`truncate table ${table || tables.join(', ')} cascade`)

export const truncateAsync = () => {
  return Promise.each(tables, function (table) {
    return database.get().raw('truncate table ' + table + ' cascade')
  })
}

export const seed = () => {
  return Promise.each(tables, function (table) {
    return database.get()(table).insert(require('./seeds/' + table))
  })
}
