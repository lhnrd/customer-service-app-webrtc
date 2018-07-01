import BaseModel from '../../common/base-model'

class User extends BaseModel {
  static get tableName () {
    return 'users'
  }
  static get jsonSchema () { }

  $beforeInsert () { }
}

export default User
