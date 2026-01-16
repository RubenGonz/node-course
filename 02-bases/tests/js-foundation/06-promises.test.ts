import { getPokemonNameById } from "../../src/js-foundation/06-promises";

describe("js-foundation/06-promises", () => {

  test("getPokemonNameById should return a pokemon name", async () => {
    const pokemonId = 1;
    const pokemonName = await getPokemonNameById(pokemonId);
    expect(pokemonName).toBe("bulbasaur");
  });

  test("getPokemonNameById should throw an error if the pokemon is not found", async () => {
    const invalidPokemonId = 9999;
    try {
      await getPokemonNameById(invalidPokemonId);
      expect(true).toBeFalsy();
    } catch (error) {
      expect((error as Error).message).toBe(`Pokemon not found with id ${invalidPokemonId}`);
    }
  });
});