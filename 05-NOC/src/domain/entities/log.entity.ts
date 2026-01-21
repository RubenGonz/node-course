export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high"
}

export interface LogEntityOptions {
  message: string,
  level: LogSeverityLevel,
  origin: string
  createdAt?: Date;
}

export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options
    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  static fromJson = (json: string): LogEntity => {
    const { level, message, createdAt, origin } = JSON.parse(json)

    if (!message) throw new Error("Message is required")
    if (!level) throw new Error("Severity level is required")
    if (!createdAt) throw new Error("Creation Time is required")

    return new LogEntity({ message, level, origin })
  }

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { level, message, createdAt, origin } = object
    return new LogEntity({ level, message, createdAt, origin })
  }

}