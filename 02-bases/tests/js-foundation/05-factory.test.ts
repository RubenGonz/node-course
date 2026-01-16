import { buildMakePerson } from "../../src/js-foundation/05-factory";

describe("js-foundation/05-factory", () => {
  const getUUID = () => 'unique-id-123';
  const getAge = () => 30;
  const makePerson = buildMakePerson({ getUUID, getAge });
  
  test("buildMakePerson should return a function", () => {
    expect(typeof makePerson).toBe("function");
  });

  test("makePerson should return a person using the provided functions", () => {
    const jhon = makePerson({ name: "Jhon", birthdate: new Date("1985-10-21") });

    expect(jhon).toEqual({ id: 'unique-id-123', name: 'Jhon', birthdate: new Date("1985-10-21"), age: 30 });
  });
});