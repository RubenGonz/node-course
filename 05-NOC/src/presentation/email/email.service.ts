import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[]
}

interface Attachments {
  fileName: string;
  path: string
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      })

      return true
    } catch (error) {
      return false
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor"
    const htmlBody = `<h3>Logs del sistema</h3>
    <p>Lorem ...</p>
    <P>Ver logs adjuntos</P>
    `

    const attachments: Attachments[] = [
      { fileName: "logs-all.log", path: "./logs/logs-all.log" },
      { fileName: "logs-high.log", path: "./logs/logs-high.log" },
      { fileName: "logs-medium.log", path: "./logs/logs-medium.log" },
    ]

    return this.sendEmail({ to, subject, htmlBody, attachments })
  }

}