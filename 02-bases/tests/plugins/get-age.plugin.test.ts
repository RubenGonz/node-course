import { getAge } from "../../src/plugins";

describe("plugins/get-age.plugin", () => {

  test("getAge() should return the age of a person", () => {
    const birthdate = new Date("1990-01-01");
    const age = getAge(birthdate);
    expect(typeof age).toBe("number");
  });

  test("getAge() should return current age", () => {
    const birthdate = new Date("1990-01-01");
    const age = getAge(birthdate);

    const calculatedAge = new Date().getFullYear() - birthdate.getFullYear();
    expect(age).toBe(calculatedAge);
  });

  test("getAge() should return 0 years", () => {
    const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);

    const birthdate = new Date("1995-10-21");
    const age = getAge(birthdate);

    expect(age).toBe(0);
    expect(spy).toHaveBeenCalled();
  });
});