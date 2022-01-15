import { getCustomRepository } from 'typeorm'

import { AppError } from '../errors/AppError'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

interface IRequest {
  value: number
  u: string
}

export class SetAnswerService {
  async execute({ value, u }: IRequest) {
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveysUsersRepository.findOne({ id: u })

    if (!surveyUser) {
      throw new AppError('Survey user does not exists')
    }

    surveyUser.value = value

    await surveysUsersRepository.save(surveyUser)

    return surveyUser
  }
}
