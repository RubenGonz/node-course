import { PostgresLogDatasource } from './postgres-log.datasource';
import { PostgresDataBase } from '../../data/postgres/init';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { envs } from '../../config/plugins/env.plugin';

describe('PostgresLogDatasource', () => {
  const log = new LogEntity({
    message: 'Test message',
    level: LogSeverityLevel.low,
    origin: 'postgres-log.datasource.test.ts',
  });

  let logDatasource: PostgresLogDatasource;
  let prisma: any = undefined;
  beforeAll(async () => {
    prisma = await PostgresDataBase.connect({ connectionString: envs.POSTGRES_URL });
    logDatasource = new PostgresLogDatasource();
  });

  afterEach(async () => {
    await prisma.logModel.deleteMany();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Postgress log created', expect.any(Number));
  });

  test('should get logs', async () => {
    await logDatasource.saveLog(log);

    const logs = await logDatasource.getLogs(LogSeverityLevel.low);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
    expect(logs[0].message).toBe(log.message);
    expect(logs[0].level).toBe(log.level.toUpperCase());
    expect(logs[0].origin).toBe(log.origin);
  });
});
