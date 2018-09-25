import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import User, { UserSchema, USER_ROLE_OPTIONS } from '../../api/users/model'

const formatError = (error) =>
  error.isJoi ? {
    message: error.details.map(detail => detail.message),
    error
  } : error

export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (error, user, info) => {
    if (error) {
      return res.status(400).json(formatError(error))
    } else if (!user) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

export const master = () =>
  passport.authenticate('master', { session: false })

export const token = ({ required, roles = USER_ROLE_OPTIONS } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err || (required && !user) || (required && !roles.includes(user.role))) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

passport.use('password', new BasicStrategy(async (email, password, done) => {
  try {
    await UserSchema.validate({ email, password }, { abortEarly: false })
  } catch (error) {
    return done(error)
  }

  const user = await User
    .query()
    .where('email', email)
    .first()

  if (!user) {
    return done(null, false, { message: 'No user was found.' })
  }

  const isVerified = await user.verifyPassword(password)

  if (isVerified) {
    return done(null, user)
  } else {
    return done(null, false)
  }
}))

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    return done(null, {}, { role: 'master' })
  } else {
    return done(null, false)
  }
}))

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ({ id }, done) =>
  User.query().findById(id).then(user => {
    done(null, user)
    return null
  }).catch(done)
))
