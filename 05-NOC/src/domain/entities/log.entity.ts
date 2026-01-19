export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high"
}

export interface LogEntityOptions {
  message: string,
  level: LogSeverityLevel,
  origin: string
  createAt?: Date;
}

export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;
  public origin: string

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createAt = new Date() } = options
    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createAt = createAt;
  }

  static fromJson = (json: string): LogEntity => {
    const { level, message, createAt, origin } = JSON.parse(json)

    if (!message) throw new Error("Message is required")
    if (!level) throw new Error("Severity level is required")
    if (!createAt) throw new Error("Creation Time is required")

    return new LogEntity({ message, level, origin })
  }

}