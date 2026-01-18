import { SaveFile } from "./save-file.use-case";
import fs from "fs";

describe("SaveFileUseCase", () => {
  const defaultOutputDir = "outputs";
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom_outputs/file-destination",
    fileName: "custom_table-name",
  };
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
  let saveFile: SaveFile;

  beforeEach(() => {
    //Para que los logs no ensucien la consola
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });

    saveFile = new SaveFile();

    [defaultOutputDir, customOptions.fileDestination.split("/")[0]].forEach((dir) => {
      if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();

    [defaultOutputDir, customOptions.fileDestination.split("/")[0]].forEach((dir) => {
      if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
    });
  });

  test("should save a file with default values", () => {
    const options = { fileContent: "Test content" };
    const filePath = `${defaultOutputDir}/table.txt`;

    const result = saveFile.execute(options);
    expect(result).toBe(true);

    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath, "utf-8")).toBe(options.fileContent);
  });

  test("should save a file with custom values", () => {
    const result = saveFile.execute(customOptions);
    expect(result).toBe(true);

    expect(fs.existsSync(customFilePath)).toBe(true);
    expect(fs.readFileSync(customFilePath, "utf-8")).toBe(customOptions.fileContent);
  });

  test("should return false if directory could not be created", () => {
    jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Custom error for testing");
    });

    const result = saveFile.execute(customOptions);
    expect(result).toBe(false);
  });

  test("should return false if file could not be written", () => {
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("Custom error for testing");
    });

    const result = saveFile.execute(customOptions);
    expect(result).toBe(false);
  });
});
