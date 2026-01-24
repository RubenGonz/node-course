import { LogDatasource } from './log.datasource'
import { LogEntity, LogSeverityLevel } from '../entities/log.entity'

describe('LogDatasource (abstract)', () => {

  class TestDatasource extends LogDatasource {
    async saveLog(_: LogEntity): Promise<void> {
      return
    }

    async getLogs(_: LogSeverityLevel): Promise<LogEntity[]> {
      return []
    }
  }

  test('should allow implementation of abstract contract', () => {
    const datasource: LogDatasource = new TestDatasource()

    expect(datasource).toBeInstanceOf(TestDatasource)
    expect(typeof datasource.saveLog).toBe('function')
    expect(typeof datasource.getLogs).toBe('function')
  })
})
