import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'

interface IRequest {
  to: string
  subject: string
  templatePath: string
  variables: Record<string, unknown>
}

export class SendMailService {
  private client: Transporter

  constructor() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'norene.wisozk16@ethereal.email',
        pass: 'GPU7ZuYsqtF9D48GkM',
      },
    })

    this.client = transporter
  }

  async execute({ to, subject, templatePath, variables }: IRequest) {
    const template = fs.readFileSync(templatePath).toString('utf-8')
    const templateParse = handlebars.compile(template)

    const html = templateParse(variables)

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com.br>',
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
