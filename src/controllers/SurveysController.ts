import { Request, Response } from 'express'

import { CreateSurveyService } from '../services/CreateSurveyService'
import { ListAllSurveyService } from '../services/ListAllSurveysService'

export class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body

    const createSurveyService = new CreateSurveyService()

    const user = await createSurveyService.execute({ title, description })

    return response.status(201).json(user)
  }

  async show(request: Request, response: Response) {
    const listAllSurveysService = new ListAllSurveyService()

    const surveys = await listAllSurveysService.execute()

    return response.json(surveys)
  }
}
