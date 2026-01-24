import mongoose from "mongoose";
import { envs } from "../../config/plugins/env.plugin";
import { LogModel, MongoDataBase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('mongo-log.datasource.test.ts', () => {

  const logdataSource = new MongoLogDatasource()
  const log = new LogEntity({
    message: "Test message",
    level: LogSeverityLevel.low,
    origin: "mongo-log.datasource.test.ts"
  })

  beforeAll(async () => {
    await MongoDataBase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });    
  })

  afterEach(async () => {
    await LogModel.deleteMany()
  })

  afterAll(() => {
    mongoose.connection.close();
  })

  test('should create a log', async () => {
    const logSpy = jest.spyOn(console, "log")

    await logdataSource.saveLog(log)

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith("Mongo log created", expect.any(String))
  })

  test('should get logs', async () => {
    await logdataSource.saveLog(log)
    const logs = await logdataSource.getLogs(LogSeverityLevel.low)
    
    expect(logs.length).toBe(1)
    expect(logs[0]).toBeInstanceOf(LogEntity)
  })
})
