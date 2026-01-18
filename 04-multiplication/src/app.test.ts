import { ServerApp } from "./presentation/server-app";

describe("App entrypoint", () => {
  const ORIGINAL_ARGV = process.argv;

  beforeEach(() => {
    jest.resetModules();

    // Mockeamos console.log y console.error para que no ensucien la consola
    jest.spyOn(console, "log").mockImplementation(() => { });
    jest.spyOn(console, "error").mockImplementation(() => { });
  });

  afterEach(() => {
    process.argv = ORIGINAL_ARGV;
    
    jest.restoreAllMocks();
  });

  test("should call ServerApp.run with correct values", async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = ["node", "app.ts", "-b", "3", "-l", "15", "-s", "-n", "my-table", "-d", "my-outputs"];

    await import("./app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 3,
      limit: 15,
      showTable: true,
      fileName: "my-table",
      fileDestination: "my-outputs",
    });
  });
});
