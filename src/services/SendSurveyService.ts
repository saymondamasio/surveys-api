import { resolve } from 'path'
import { getCustomRepository } from 'typeorm'

import { AppError } from '../errors/AppError'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import { SendMailService } from './SendMailService'

interface IRequest {
  email: string
  survey_id: string
}

export class SendSurveyService {
  async execute({ survey_id, email }: IRequest) {
    const sendMailService = new SendMailService()

    const templatePath = resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'nps-mail.hbs'
    )

    const surveysRepository = getCustomRepository(SurveysRepository)
    const usersRepository = getCustomRepository(UsersRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new AppError('User does not exists')
    }

    const survey = await surveysRepository.findOne({
      id: survey_id,
    })

    if (!survey) {
      throw new AppError('Survey does not exists')
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ['survey', 'user'],
    })

    if (surveyUserAlreadyExists) {
      await sendMailService.execute({
        to: email,
        subject: survey.title,
        templatePath,
        variables: {
          name: user.name,
          title: survey.title,
          description: survey.description,
          link: process.env.APP_URL,
          id: surveyUserAlreadyExists.id,
        },
      })

      return surveyUserAlreadyExists
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    })

    await surveysUsersRepository.save(surveyUser)

    await sendMailService.execute({
      to: email,
      subject: survey.title,
      templatePath,
      variables: {
        name: user.name,
        title: survey.title,
        description: survey.description,
        link: process.env.APP_URL,
        id: surveyUser.id,
      },
    })

    return surveyUser
  }
}
