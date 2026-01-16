import { httpClient as http } from "../plugins";

export const getPokemonNameById = async (id: number): Promise<string> => {
  try {
    const pokemon = await http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return pokemon.name;
  } catch (error) {
    throw new Error(`Pokemon not found with id ${id}`);
  }

}