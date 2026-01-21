import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = "logs"
  private readonly allLogsPath = "logs/logs-all.log"
  private readonly mediumLogsPath = "logs/logs-medium.log"
  private readonly highLogsPath = "logs/logs-high.log"

  constructor() {
    this.createLogsFiles()
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath);

    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach((path: string) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "")
    })
  }

  async saveLog(newlog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newlog)}\n`
    fs.appendFileSync(this.allLogsPath, logAsJson)

    if (newlog.level == LogSeverityLevel.medium) fs.appendFileSync(this.mediumLogsPath, logAsJson);
    if (newlog.level == LogSeverityLevel.high) fs.appendFileSync(this.highLogsPath, logAsJson);

    console.log("Fs log created");
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8")

    return content
      .split("\n")
      .filter(line => line.trim() !== "")
      .map(LogEntity.fromJson);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath)
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath)
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath)
      default:
        throw new Error(`${severityLevel} not implemented`)
    }
  }
}