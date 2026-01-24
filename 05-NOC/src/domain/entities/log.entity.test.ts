import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

describe('log.entity.test.ts', () => {

  const logData = {
    message: "Test message",
    level: LogSeverityLevel.low,
    origin: "log.repository.test.ts"
  }

  test('should create a LogEntity instance', () => {
    const log = new LogEntity(logData)

    expect(log).toBeInstanceOf(LogEntity);

    expect(log.message).toBe(logData.message);
    expect(log.level).toBe(logData.level);
    expect(log.origin).toBe(logData.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity instance from json', () => {
    const json = `{"message":"https://localhost:3000 is not ok. TypeError: fetch failed","level":"high","origin":"check-service.ts","createdAt":"2026-01-19T13:48:45.011Z"}`

    const log = LogEntity.fromJson(json)

    expect(log).toBeInstanceOf(LogEntity);

    expect(log.message).toBe("https://localhost:3000 is not ok. TypeError: fetch failed");
    expect(log.level).toBe(LogSeverityLevel.high);
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toStrictEqual(new Date("2026-01-19T13:48:45.011Z"));
  });

  test.each([
    [
      'Message is required',
      `{"level":"low","origin":"test","createdAt":"2026-01-19T13:48:45.011Z"}`
    ],
    [
      'Severity level is required',
      `{"message":"Test message","origin":"test","createdAt":"2026-01-19T13:48:45.011Z"}`
    ],
    [
      'Creation Time is required',
      `{"message":"Test message","level":"low","origin":"test"}`
    ],
    [
      'Origin is required',
      `{"message":"Test message","level":"low","createdAt":"2026-01-19T13:48:45.011Z"}`
    ],
  ])('should throw error: %s', (expectedError, json) => {
    expect(() => {
      LogEntity.fromJson(json)
    }).toThrow(expectedError)
  });

  test('should create a LogEntity instance from object', () => {
    const log = LogEntity.fromObject(logData)

    expect(log).toBeInstanceOf(LogEntity);

    expect(log.message).toBe(logData.message);
    expect(log.level).toBe(logData.level);
    expect(log.origin).toBe(logData.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
