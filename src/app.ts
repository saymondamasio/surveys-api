import express, { NextFunction, Request, Response } from 'express'

import 'express-async-errors'
import 'reflect-metadata'
import { createConnectionApp } from './database'
import { AppError } from './errors/AppError'
import { routes } from './routes'

createConnectionApp()

const app = express()

app.use(express.json())

app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

export { app }
