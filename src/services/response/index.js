export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const error = (res, next) => (error) => {
  if (error.name === 'error' && error.code === '23505') { // database validation error
    return res.status(409).json({
      valid: false,
      errors: [
        {
          param: 'email',
          message: '"email" already registered'
        }
      ]
    })
  } else if (error.name === 'ValidationError' && error.isJoi) {
    const errors = error.details.map(e => ({
      param: e.context.key,
      message: e.message
    }))

    res.status(400).json({
      valid: false,
      errors
    })
  }
  return null
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
