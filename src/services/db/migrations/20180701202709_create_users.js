exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.string('name')
    table.enum('role', ['admin', 'user']).notNullable()
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
