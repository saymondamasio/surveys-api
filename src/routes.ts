import { Router } from 'express'

import { AnswerController } from './controllers/AnswerController'
import { NPSController } from './controllers/NPSController'
import { SendSurveyController } from './controllers/SendSurveyController'
import { SurveysController } from './controllers/SurveysController'
import { UsersController } from './controllers/UsersController'

const routes = Router()

routes.post('/users', new UsersController().create)
routes.post('/surveys', new SurveysController().create)
routes.get('/surveys', new SurveysController().show)
routes.post('/sendSurvey', new SendSurveyController().execute)
routes.get('/answers/:value', new AnswerController().execute)
routes.get('/nps/:survey_id', new NPSController().execute)

export { routes }
