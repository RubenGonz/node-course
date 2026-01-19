import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fyleSystemRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)
export class Server {
  static start() {
    console.log("Server started...");

    CronService.createJob(
      "*/3 * * * * *",
      () => {
        const url = "https://localhost:3000"

        new CheckService(
          fyleSystemRepository,
          () => console.log(`${url} is ok`),
          (error) => console.log(error),
        ).execute(url)
      }
    )
  }
}