import fs from 'fs';

export interface SaveFileUseCase {
  execute(params: Options): boolean;
}

export interface Options {
  fileContent: string;
  fileDestination: string;
  fileName: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor(
    // repository: StorageRepository
  ) { }

  execute({ fileContent, fileDestination, fileName }: Options) {

    try {
      fs.mkdirSync(fileDestination, { recursive: true });
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
      return true
    } catch (error) {
      console.error(error);
      return false
    }
  }
}