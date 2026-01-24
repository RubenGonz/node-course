import { envs } from "./env.plugin";

describe("envs.pluging.ts", () => {

  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'ruben30303030@gmail.com',
      MAILER_SECRET_KEY: 'zhld ylcu ymye ioet',
      PROD: false,
      MONGO_URL: 'mongodb://rubengonz:123456789@localhost:27017/',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'rubengonz',
      MONGO_PASS: '123456789',
      POSTGRES_URL: 'postgresql://rubengonz:123456789@localhost:5433/NOC-TEST',
      POSTGRES_DB: 'NOC-TEST',
      POSTGRES_USER: 'rubengonz',
      POSTGRES_PASSWORD: '123456789'
    })
  })

  test("should return error if PORT was not found in env", async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import("./env.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain("\"PORT\" should be a valid integer");
    }
  })

})