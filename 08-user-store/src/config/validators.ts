import mongoose from "mongoose";

export class Validators {
  static isMongoDb(id: string) {
    return mongoose.isValidObjectId(id)
  }
}