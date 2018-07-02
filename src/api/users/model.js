import { compose } from 'objection'
import password from 'objection-password'

import BaseModel from '../../common/base-model'

const enhance = compose(password())
class User extends enhance(BaseModel) {
  static get tableName () {
    return 'users'
  }
  static get jsonSchema () { }

  $beforeInsert () { }
}

export default User
