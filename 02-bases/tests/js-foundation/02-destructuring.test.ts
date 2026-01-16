import { characters } from "../../src/js-foundation/02-destructuring";

describe("js-foundation/02-destructuring", () => {
  test("characters should contain Goku, Vegeta", () => {
    expect(characters).toContain("Goku");
    expect(characters).toContain("Vegeta");
  });

  test("first character should be Goku", () => {
    const [firstCharacter] = characters;
    expect(firstCharacter).toBe("Goku");
  });

});