exports.up = function (knex, Promise) {
  return knex.schema.createTable('customers', function (table) {
    table.uuid('id').primary()
    table.string('email').notNullable().unique()
    table.string('name')
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('customers')
}
