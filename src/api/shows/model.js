import { Model } from 'objection'

class Show extends Model {
  static get tableName () {
    return 'shows'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        channel: { type: 'string', minLength: 1, maxLength: 255 },
        explicit: { type: 'boolean' },
        genre: { type: 'string', minLength: 1, maxLength: 255 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        rating: { type: 'integer' }
      }
    }
  }

  summary () {
    return `${this.name} - ${this.genre} - ${this.rating}`
  }
}

export default Show
