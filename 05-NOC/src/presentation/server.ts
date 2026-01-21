import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { EmailService } from "./email/email.service";

import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource, MongoLogDatasource, PostgresLogDatasource } from "../infrastructure/datasources";

import { CronService } from "./cron/cron-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

export class Server {
  static async start() {
    console.log("Server started...");

    // const emailService = new EmailService()

    // const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource())
    // const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource())
    // const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource())

    // new SendEmailLogs(
    //   emailService,
    //   postgresLogRepository
    // ).execute(["ruben30303030@gmail.com"])

    // CronService.createJob(
    //   "*/3 * * * * *",
    //   () => {
    //     const url = "https://google.com"

    //     new CheckServiceMultiple(
    //       [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error),
    //     ).execute(url)
    //   }
    // )
  }
}  