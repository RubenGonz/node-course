import { ServerApp } from "../../src/presentation/server-app";
import { CreateTable } from "../../src/domain/use-cases/create-table.use-case";
import { SaveFile } from "../../src/domain/use-cases/save-file.use-case";

describe("ServerApp", () => {
  const runOptions = {
    base: 5,
    limit: 10,
    showTable: false,
    fileDestination: "/test-destination",
    fileName: "test-filename",
  };

  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should log 'File created' when file is created successfully", () => {
    jest.spyOn(CreateTable.prototype, "execute").mockReturnValue("1 x 5 = 5");
    jest.spyOn(SaveFile.prototype, "execute").mockReturnValue(true);

    ServerApp.run(runOptions);

    expect(logSpy).toHaveBeenCalledWith("Server running...");
    expect(logSpy).toHaveBeenCalledWith("File created");
  });

  test("should log error when file creation fails", () => {
    jest.spyOn(CreateTable.prototype, "execute").mockReturnValue("1 x 5 = 5");
    jest.spyOn(SaveFile.prototype, "execute").mockReturnValue(false);

    ServerApp.run(runOptions);

    expect(errorSpy).toHaveBeenCalledWith("Failed to create file.");
    expect(logSpy).not.toHaveBeenCalledWith("File created");
  });

  test("should log table when showTable is true", () => {
    jest.spyOn(CreateTable.prototype, "execute").mockReturnValue("1 x 5 = 5");
    jest.spyOn(SaveFile.prototype, "execute").mockReturnValue(true);

    ServerApp.run({ ...runOptions, showTable: true });

    expect(logSpy).toHaveBeenCalledWith("1 x 5 = 5");
  });
});