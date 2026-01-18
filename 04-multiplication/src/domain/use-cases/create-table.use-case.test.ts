import { CreateTable } from "./create-table.use-case";

describe("CreateTableUseCase", () => {
  test("should create a table with default values", () => {
    const createTable = new CreateTable();
    expect(createTable).toBeInstanceOf(CreateTable);

    const table = createTable.execute({ base: 5 });
    expect(table).toContain("Tabla de multiplicar del 5");
    expect(table).toContain("5 x 1 = 5");
    expect(table).toContain("5 x 10 = 50");    

    const rows = table.split("\n").length;
    expect(rows).toBe(13); // +3 for header
  });

  test("should create a table with custom values", () => {
    const createTable = new CreateTable();
    const options = { base: 3, limit: 20 };
    const table = createTable.execute(options);

    expect(table).toContain("Tabla de multiplicar del 3");
    expect(table).toContain("3 x 1 = 3");
    expect(table).toContain("3 x 20 = 60");

    const rows = table.split("\n").length;
    expect(rows).toBe(options.limit + 3); // +3 for header
  })
})

