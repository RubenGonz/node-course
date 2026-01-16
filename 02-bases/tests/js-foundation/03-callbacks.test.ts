import { getUserById } from "../../src/js-foundation/03-callbacks";

describe("js-foundation/03-callbacks", () => {
  test("getUserById should return an error if user does not exist", () => {
    const id = 10
    getUserById(id, (err, user) => {
      expect(err).toBe(`No hay usuario con el id: ${id}`);
      expect(user).toBeUndefined();
    });
  });

  test("getUserById should return Alice", () => {
    const id = 1
    getUserById(id, (err, user) => {
      expect(err).toBe(undefined);
      expect(user).toEqual({ id: 1, name: 'Alice' });
    });
  });
});