import { Router } from 'express'

import { SurveysController } from './controllers/SurveysController'
import { UsersController } from './controllers/UsersController'

const routes = Router()

routes.post('/users', new UsersController().create)
routes.post('/surveys', new SurveysController().create)
routes.get('/surveys', new SurveysController().show)

export { routes }
