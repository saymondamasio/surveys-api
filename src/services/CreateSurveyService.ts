import { getCustomRepository } from 'typeorm'

import { SurveysRepository } from '../repositories/SurveysRepository'

interface IRequest {
  title: string
  description: string
}

export class CreateSurveyService {
  async execute({ title, description }: IRequest) {
    const surveysRepository = getCustomRepository(SurveysRepository)

    const survey = surveysRepository.create({
      title,
      description,
    })

    await surveysRepository.save(survey)

    return survey
  }
}
