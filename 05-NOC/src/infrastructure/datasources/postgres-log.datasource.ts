import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LevelSeverity, PrismaClient } from "../../generated/prisma/client";
import { PostgresDataBase } from "../../data/postgres/init";

const severityEnum = {
  low: LevelSeverity.LOW,
  medium: LevelSeverity.MEDIUM,
  high: LevelSeverity.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = PostgresDataBase.getPrisma();
  }

  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level]

    const newLog = await this.prisma.logModel.create({
      data: {
        ...log,
        level
      }
    })
    console.log("Postgress log created", newLog.id);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel]

    const logs = await this.prisma.logModel.findMany({
      where: { level }
    })

    return logs.map(LogEntity.fromObject)
  }
}