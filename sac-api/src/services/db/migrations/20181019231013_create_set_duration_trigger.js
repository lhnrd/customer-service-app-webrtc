exports.up = function (knex, Promise) {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION set_duration()
      RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.ended_at IS NOT NULL THEN
        NEW.duration = date_diff('ms', NEW.started_at, NEW.ended_at);
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `)
}

exports.down = function (knex, Promise) {
  return knex.raw('DROP FUNCTION IF EXISTS set_duration;')
}
