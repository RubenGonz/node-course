describe("args.plugin.ts", () => {
  const ORIGINAL_ARGV = process.argv;

  beforeEach(() => {
    //Para que los logs no ensucien la consola
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    process.argv = ORIGINAL_ARGV; // siempre restauramos
    jest.resetModules(); // limpiamos cache de imports
  });

  const runCommand = async (args: string[]) => {
    // Empezamos desde argv original cada vez
    process.argv = [ORIGINAL_ARGV[0], ORIGINAL_ARGV[1], ...args];
    const { yarg } = await import('./args.plugin');
    return yarg;
  };

  test("should throw error if base is not provided", async () => {
    await expect(runCommand([])).rejects.toThrow("Missing required argument: b");
  });

  test("should return default values when only base is provided", async () => {
    const argv = await runCommand(["-b", "5"]);

    expect(argv).toEqual(expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      n: 'multiplication-table',
      d: 'outputs',
    }));
  });

  test("should return configuration with custom values", async () => {
    const argv = await runCommand([
      "-b", "3",
      "-l", "15",
      "-s",
      "-n", "my-table",
      "-d", "my-outputs"
    ]);

    expect(argv).toEqual(expect.objectContaining({
      b: 3,
      l: 15,
      s: true,
      n: 'my-table',
      d: 'my-outputs',
    }));
  });

  test("should throw error if base < 1", async () => {
    await expect(runCommand(["-b", "0"])).rejects.toThrow('Base must be greater than 1');
  });

  test("should throw error if limit < 1", async () => {
    await expect(runCommand(["-b", "5", "-l", "0"])).rejects.toThrow('Limit must be greater than 1');
  });
});