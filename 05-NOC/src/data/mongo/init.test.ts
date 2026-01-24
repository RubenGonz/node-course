import mongoose from "mongoose";
import { MongoDataBase } from "./init";
import { envs } from "../../config/plugins/env.plugin";

describe("init MongoDB", () => {

  afterAll(() => {
    mongoose.connection.close();
  })

  test("should connect to MongoDb", async () => {

    const connected = await MongoDataBase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })

    expect(connected).toBeTruthy()
  })

  test("should throw an error", async () => {
    await expect(
      MongoDataBase.connect({
        dbName: "Invalid Db name",
        mongoUrl: "Invalid url",
      })
    ).rejects.toThrow();
  });

})