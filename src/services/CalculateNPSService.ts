import { getCustomRepository, IsNull, Not } from 'typeorm'

import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

interface IRequest {
  survey_id: string
}

// Detratores 0 - 6
// Passivos 7 - 8
// Promotores 9 - 10

// Formula para calcular a pontuação
// (promotores - detratores) / total * 100

export class CalculateNPSService {
  async execute({ survey_id }: IRequest) {
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    })

    const detractor = surveysUsers.filter(
      survey => survey.value >= 0 && survey.value <= 6
    ).length

    const promoter = surveysUsers.filter(
      survey => survey.value >= 9 && survey.value <= 10
    ).length

    const passive = surveysUsers.filter(
      survey => survey.value >= 7 && survey.value <= 8
    ).length

    const totalAnswers = surveysUsers.length

    const result = Number(
      (((promoter - detractor) / totalAnswers) * 100).toFixed(2)
    )

    return {
      detractor,
      passive,
      promoter,
      totalAnswers,
      nps: result,
    }
  }
}
