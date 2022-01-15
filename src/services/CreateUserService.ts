import { getRepository } from 'typeorm'

import { User } from '../entities/User'
import { AppError } from '../errors/AppError'

interface IRequest {
  name: string
  email: string
}

export class CreateUserService {
  async execute({ name, email }: IRequest) {
    const usersRepository = getRepository(User)

    const userAlreadyExists = await usersRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const user = usersRepository.create({
      name,
      email,
    })

    await usersRepository.save(user)

    return user
  }
}
