import express, { NextFunction, Request, Response } from 'express'

import 'express-async-errors'
import 'reflect-metadata'
import './database'
import { AppError } from './errors/AppError'
import { routes } from './routes'

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
})

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
