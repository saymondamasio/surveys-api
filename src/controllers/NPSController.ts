import { Request, Response } from 'express'

import { CalculateNPSService } from '../services/CalculateNPSService'

export class NPSController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params

    const calculateNPSService = new CalculateNPSService()

    const result = await calculateNPSService.execute({ survey_id })

    return response.json(result)
  }
}
