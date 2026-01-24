import mongoose from "mongoose";
import { MongoDataBase } from "../init";
import { LogModel } from "./log.model";
import { log } from "node:console";
import { envs } from "../../../config/plugins/env.plugin";

describe("log.model.test.ts", () => {

  beforeAll(async () => {
    await MongoDataBase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })
  })

  afterAll(() => {
    mongoose.connection.close();
  })

  test("should return LogModel", async () => {
    const logData = {
      origin: "log.model.test.ts",
      message: "test-message",
      level: "low"
    }

    const log = await LogModel.create(logData)

    expect(log).toEqual(expect.objectContaining({
      ...logData,
      createdAt: expect.any(Date),
      id: expect.any(String),
    }));

    await LogModel.findByIdAndDelete(log.id)
  })

  test("should return the schema object", () => {
    expect(LogModel.schema.obj).toEqual(
      expect.objectContaining({
        message: expect.objectContaining({
          type: String,
          required: true,
        }),
        origin: expect.objectContaining({
          type: String,
        }),
        level: expect.objectContaining({
          type: String,
          default: 'low',
          enum: expect.objectContaining({
            low: 'low',
            medium: 'medium',
            high: 'high',
          }),
        }),
        createdAt: expect.objectContaining({
          type: Date,
        }),
      })
    );
  });
})