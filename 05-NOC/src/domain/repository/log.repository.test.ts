import { LogRepository } from './log.repository'
import { LogEntity, LogSeverityLevel } from '../entities/log.entity'

describe('LogRepository (abstract)', () => {

  class TestLogRepository extends LogRepository {
    async saveLog(_: LogEntity): Promise<void> {
      return
    }

    async getLogs(_: LogSeverityLevel): Promise<LogEntity[]> {
      return []
    }
  }

  test('should allow implementation of abstract contract', () => {
    const repository: LogRepository = new TestLogRepository()

    expect(repository).toBeInstanceOf(TestLogRepository)
    expect(typeof repository.saveLog).toBe('function')
    expect(typeof repository.getLogs).toBe('function')
  })
})
