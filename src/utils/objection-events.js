const EventEmitter = require('events')

module.exports = Model => {
  return class EventsModel extends Model {
    static get events () {
      if (this.enableEvents) {
        this.eventEmitter = this.eventEmitter || new EventEmitter()
        return this.eventEmitter
      }
      return false
    }

    $afterDelete (...args) {
      return Promise.resolve(super.$afterDelete(...args))
        .then(() => {
          const { events } = this.constructor
          if (events) {
            events.emit('DELETE', { data: this.toJSON() })
          }
        })
    }

    $afterGet (...args) {
      return Promise.resolve(super.$afterGet(...args))
        .then(() => {
          const { events } = this.constructor
          if (events) {
            events.emit('GET', { data: this.toJSON() })
          }
        })
    }

    $afterInsert (...args) {
      return Promise.resolve(super.$afterInsert(...args))
        .then(() => {
          const { events } = this.constructor
          if (events) {
            events.emit('POST', { data: this.toJSON() })
          }
        })
    }

    $afterUpdate (...args) {
      return Promise.resolve(super.$afterUpdate(...args))
        .then(() => {
          const { events } = this.constructor
          if (events) {
            events.emit('PUT', { data: this.toJSON() })
          }
        })
    }
  }
}
