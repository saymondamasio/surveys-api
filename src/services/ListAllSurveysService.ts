import { getCustomRepository } from 'typeorm'

import { SurveysRepository } from '../repositories/SurveysRepository'

export class ListAllSurveyService {
  async execute() {
    const surveysRepository = getCustomRepository(SurveysRepository)

    const surveys = surveysRepository.find()

    return surveys
  }
}
