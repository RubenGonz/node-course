import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

export interface PostgresOptions {
  connectionString: string;
}

export class PostgresDataBase {
  private static prisma: PrismaClient;

  static async connect(options: PostgresOptions): Promise<PrismaClient> {
    if (this.prisma) return this.prisma;

    try {
      const { connectionString } = options
      const adapter = new PrismaPg({ connectionString });

      this.prisma = new PrismaClient({ adapter });
      await this.prisma.$connect();

      console.log("Postgres connected");
      return this.prisma;
    } catch (error) {
      console.log("Postgres connection error:", error);
      throw error;
    }
  }

  static getPrisma(): PrismaClient {
    if (!this.prisma) throw new Error("Prisma client not initialized");
    return this.prisma;
  }
}
