import path from "path"
import fs from 'fs';
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDatasource } from '../../domain/datasources/log.datasource';


describe('file-system.datasource.test.ts', () => {

  const logPath = path.join(__dirname, "../../../logs")

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true })
  })

  test('should create log files if they do not exists', async () => {
    new FileSystemDatasource()
    const files = fs.readdirSync(logPath)
    expect(files).toEqual(expect.arrayContaining(["logs-all.log", "logs-medium.log", "logs-high.log"]))
  })

  test('should save a log in logs-all.log', async () => {
    const logDataSource = new FileSystemDatasource()

    const log = new LogEntity({
      message: "Test message",
      level: LogSeverityLevel.low,
      origin: "file-system.datasource.test.ts"
    })

    await logDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8")
    expect(allLogs).toContain(JSON.stringify(log))
  })

  test('should save a log in logs-all.log and logs-medium.log', async () => {
    const logDataSource = new FileSystemDatasource()

    const log = new LogEntity({
      message: "Test message",
      level: LogSeverityLevel.medium,
      origin: "file-system.datasource.test.ts"
    })

    await logDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8")
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8")

    expect(allLogs).toContain(JSON.stringify(log))
    expect(mediumLogs).toContain(JSON.stringify(log))
  })

  test('should save a log in logs-all.log and logs-high.log', async () => {
    const logDataSource = new FileSystemDatasource()

    const log = new LogEntity({
      message: "Test message",
      level: LogSeverityLevel.high,
      origin: "file-system.datasource.test.ts"
    })

    await logDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8")
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8")

    expect(allLogs).toContain(JSON.stringify(log))
    expect(highLogs).toContain(JSON.stringify(log))
  })

  test('should return all logs', async () => {
    const logDataSource = new FileSystemDatasource()

    const logLow = new LogEntity({
      message: "Log low",
      level: LogSeverityLevel.low,
      origin: "file-system.datasource.test.ts"
    })

    const logMedium = new LogEntity({
      message: "Log medium",
      level: LogSeverityLevel.medium,
      origin: "file-system.datasource.test.ts"
    })

    const logHigh = new LogEntity({
      message: "Log high",
      level: LogSeverityLevel.high,
      origin: "file-system.datasource.test.ts"
    })

    await logDataSource.saveLog(logLow)
    await logDataSource.saveLog(logMedium)
    await logDataSource.saveLog(logHigh)

    const logsLow = await logDataSource.getLogs(LogSeverityLevel.low)
    const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium)
    const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high)

    expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]))
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))
  })

  test("should not throw an error if path exists", () => {
    new FileSystemDatasource()
    new FileSystemDatasource()

    expect(true).toBeTruthy()
  })

  test("should throw an error if severirt level is not defined", async () => {
    const logDatasource = new FileSystemDatasource()

    const customSeverityLevel = "newSeverityLevel" as LogSeverityLevel

    try {
      await logDatasource.getLogs(customSeverityLevel)
      expect(true).toBeFalsy()
    } catch (error) {
      expect(`${error}`).toContain(`${customSeverityLevel} not implemented`)
    }
  })
})
