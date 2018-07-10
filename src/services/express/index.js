import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { env } from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)

  // error handlers

  // development error handler
  // will print stacktrace
  if (env === 'development') {
    app.use(function (error, req, res, next) {
      res
        .status(error.status || 500)
        .json({
          message: error.message,
          error
        })
    })
  }

  // production error handler
  // no stacktraces leaked to user
  app.use((error, req, res, next) => {
    res
      .status(error.status || 500)
      .json({
        message: error.message,
        error: {}
      })
  })

  return app
}
