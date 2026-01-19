import { envs } from "../config/plugins/env.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fyleSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)
const emailService = new EmailService()

export class Server {
  static start() {
    console.log("Server started...");

    new SendEmailLogs(
      emailService,
      fyleSystemLogRepository
    ).execute("ruben30303030@gmail.com")

    // CronService.createJob(
    //   "*/3 * * * * *",
    //   () => {
    //     const url = "https://localhost:3000"

    //     new CheckService(
    //       fyleSystemLogRepository,
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error),
    //     ).execute(url)
    //   }
    // )
  }
}