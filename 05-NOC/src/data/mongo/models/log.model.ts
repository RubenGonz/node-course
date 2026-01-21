import mongoose from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  origin:{
    type: String
  },
  level:{
    type: String,
    enum: LogSeverityLevel,
    default: "low"
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})  

export const LogModel = mongoose.model("Log", logSchema)
