import { Request, Response } from 'express'

import { SetAnswerService } from '../services/SetAnswerService'

export class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params
    const { u } = request.query

    const setAnswerService = new SetAnswerService()

    const surveyUser = await setAnswerService.execute({
      u: String(u),
      value: Number(value),
    })

    return response.status(201).json(surveyUser)
  }
}
