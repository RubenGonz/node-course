export class CreateCategoryDto {
  constructor(
    public readonly name: string,
    public readonly available: boolean,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available } = object
    let availableAsBoolean = available

    if (!name) return ["Missing name"]
    if (typeof available !== "boolean") {
      availableAsBoolean = (available === "true")
    }

    return [undefined, new CreateCategoryDto(name, availableAsBoolean)]
  }
}