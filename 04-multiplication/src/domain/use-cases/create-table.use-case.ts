export interface CreateTableUseCase {
  execute(params: Options): string;
}

export interface Options {
  base: number;
  limit: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor(
    // DI - Dependency Injection
  ) { }

  execute({ base, limit }: Options) {
    let table = `
===========================
Tabla de multiplicar del ${base}
===========================\n`;

    for (let i = 1; i <= limit; i++) {
      table += `${base} x ${i} = ${base * i}\n`;
    }

    return table;
  }
}