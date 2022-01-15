import { Router } from 'express'

import { UserController } from './controllers/UserController'

const routes = Router()

routes.post('/users', new UserController().handle)

export { routes }
