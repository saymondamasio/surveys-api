import { Request, Response } from 'express'

import { SendSurveyService } from '../services/SendSurveyService'

export class SendSurveyController {
  async execute(request: Request, response: Response) {
    const { survey_id, email } = request.body

    const sendSurveyService = new SendSurveyService()

    const surveyUser = await sendSurveyService.execute({ survey_id, email })

    return response.json(surveyUser)
  }
}
