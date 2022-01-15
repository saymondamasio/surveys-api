import { Request, Response } from 'express'
import { object, string } from 'yup'

import { AppError } from '../errors/AppError'
import { CreateUserService } from '../services/CreateUserService'

export class UsersController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body

    try {
      const schema = object({
        name: string().required('Name is required'),
        email: string()
          .email('Email is not valid')
          .required('Email is required'),
      })

      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      throw new AppError((err as Error).message, 400)
    }

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ name, email })

    return response.status(201).json(user)
  }
}
