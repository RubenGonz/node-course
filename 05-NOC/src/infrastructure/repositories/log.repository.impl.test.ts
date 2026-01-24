import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('log.repository.impl.test.ts', () => {

  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const logRepository = new LogRepositoryImpl(mockLogDataSource)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('saveLog should call the datasource with arguments', async () => {
    const log = new LogEntity({
      message: "Test message",
      level: LogSeverityLevel.medium,
      origin: "file-system.datasource.test.ts"
    })

    await logRepository.saveLog(log)
    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log)
  })

  test('getLogs should call the datasource with arguments', async () => {
    const logSeverityLevel = LogSeverityLevel.low
    await logRepository.getLogs(logSeverityLevel)
    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(logSeverityLevel)
  })
})
