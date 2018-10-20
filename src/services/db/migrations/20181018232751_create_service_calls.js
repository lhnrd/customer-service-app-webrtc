exports.up = function (knex, Promise) {
  return knex.schema.createTable('service_calls', function (table) {
    table.uuid('id').primary()
    table.string('description')
    table.integer('call_rating').defaultTo(0)
    table.integer('service_rating').defaultTo(0)
    table.boolean('is_solved').defaultTo(false)
    table.timestamp('started_at')
    table.timestamp('ended_at')
    table.integer('duration').comment('Service duration in milliseconds')
    table.timestamps()

    table.uuid('customer_id').references('customers.id')
    table.uuid('user_id').references('users.id')
    table.index('user_id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('service_calls')
}
