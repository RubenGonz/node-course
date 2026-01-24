import { EmailService } from '../../../presentation/email/email.service'
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { SendEmailLogs } from './send-logs'

describe('send-logs.test.ts', () => {

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  }

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  )

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should send email and log success', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(true)

    const result = await sendEmailLogs.execute('test@example.com')

    expect(result).toBe(true)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      message: "Log email sent",
      level: LogSeverityLevel.low,
      origin: "send-logs.ts",
      createdAt: expect.any(Date),
    })
  })

  test('should log error when sendEmailWithFileSystemLogs returns false', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

    const result = await sendEmailLogs.execute('test@example.com')

    expect(result).toBe(false)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      message: "Error: Email log not sent",
      level: LogSeverityLevel.high,
      origin: "send-logs.ts",
      createdAt: expect.any(Date),
    })
  })
})
