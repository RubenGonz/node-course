import nodemailer, { Transporter } from 'nodemailer';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[]
}

export interface Attachments {
  fileName: string;
  path: string
}

export class EmailService {

  private transporter: Transporter;

  constructor(
    mailerService: string,
    mailerEmail: string,
    mailerEmailPassword: string,
    private readonly postToProvider: boolean
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: mailerEmailPassword
      }
    })
  }

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    if (!this.postToProvider) return true

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
}