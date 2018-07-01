import { compose, Model, snakeCaseMappers } from 'objection'
import guid from 'objection-guid'
import visibility from 'objection-visibility'
import { timestampPlugin as timestamps } from 'objection-timestamps'

const enhance = compose(guid(), timestamps(), visibility)

class BaseModel extends enhance(Model) {
  static get columnNameMappers () {
    return snakeCaseMappers()
  }

  $beforeInsert () {
    this.createdAt = new Date().toISOString()
  }

  $beforeUpdate () {
    this.updatedAt = new Date().toISOString()
  }
}

export default BaseModel
