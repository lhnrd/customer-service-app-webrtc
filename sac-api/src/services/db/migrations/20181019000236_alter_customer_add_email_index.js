exports.up = function (knex, Promise) {
  return knex.schema.table('customers', function (table) {
    table.index('email')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('customers', function (table) {
    table.dropIndex('email')
  })
}
