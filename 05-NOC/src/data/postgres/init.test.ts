import { PrismaClient } from "../../generated/prisma/client";
import { PostgresDataBase } from "./init";
import { envs } from '../../config/plugins/env.plugin';

describe('init Postgres', () => {

  const connectionString = envs.POSTGRES_URL;

  afterEach(() => {
    (PostgresDataBase as any).prisma = undefined;
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    try {
      const prisma = PostgresDataBase.getPrisma();
      await prisma.$disconnect();
    } catch { }
  });

  test('should connect to Postgres database', async () => {
    const connected = await PostgresDataBase.connect({ connectionString });

    expect(connected).toHaveProperty('$connect');
    expect(connected).toHaveProperty('$disconnect');
  });

  test('should throw if prisma connection fails', async () => {
    const spy = jest
      .spyOn(PrismaClient.prototype, '$connect')
      .mockRejectedValueOnce(new Error('Forced failure'));

    await expect(
      PostgresDataBase.connect({
        connectionString: 'postgresql://whatever',
      })
    ).rejects.toThrow('Forced failure');

    spy.mockRestore();
  });

  test('should reuse the same PrismaClient instance', async () => {
    const prisma1 = await PostgresDataBase.connect({ connectionString });
    const prisma2 = await PostgresDataBase.connect({ connectionString });

    expect(prisma1).toBe(prisma2);
  });

  test('getPrisma should return initialized client', async () => {
    const prisma = await PostgresDataBase.connect({ connectionString });

    expect(PostgresDataBase.getPrisma()).toBe(prisma);
  });

  test('getPrisma should throw if not initialized', () => {
    expect(() => PostgresDataBase.getPrisma())
      .toThrow('Prisma client not initialized');
  });

});
