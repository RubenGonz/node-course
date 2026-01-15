import { httpClient } from "../plugins";

export const getPokemonNameById = async (id: number): Promise<string> => {
  const pokemon = await httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return pokemon.name;
}