interface BuildMakerPersonOptions {
  getUUID: () => string;
  getAge: (birthdate: Date) => number;
}

interface PersonOptions {
  name: string;
  birthdate: Date;
}

export const buildMakePerson = ({ getUUID, getAge }: BuildMakerPersonOptions) => {
  return ({ name, birthdate }: PersonOptions) => {
    return {
      id: getUUID(),
      name,
      birthdate,
      age: getAge(birthdate)
    }
  }
}
