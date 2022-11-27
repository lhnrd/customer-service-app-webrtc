exports.up = function (knex, Promise) {
  return knex.raw(`
    CREATE TRIGGER set_duration_service_call
    BEFORE INSERT OR UPDATE OF ended_at
    ON service_calls
    FOR EACH ROW
    EXECUTE PROCEDURE set_duration();
  `)
}

exports.down = function (knex, Promise) {
  return knex.raw('DROP TRIGGER IF EXISTS set_duration_service_call ON service_calls; ')
}
