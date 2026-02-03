import { Validators } from "../../../config"

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = object
    let availableAsBoolean = available

    if (!name) return ["Missing name"]
    if (typeof available !== "boolean") {
      availableAsBoolean = (available === "true")
    }
    if (!user) return ["Missing user"]
    if (!Validators.isMongoDb(user)) return ["Invalid user Id"]
    if (!category) return ["Missing category"]
    if (!Validators.isMongoDb(category)) return ["Invalid category Id"]

    return [undefined, new CreateProductDto(name, availableAsBoolean, price, description, user, category)]
  }
}