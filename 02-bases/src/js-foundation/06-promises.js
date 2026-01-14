const { http } = require('../plugins');

const getPokemonById = async (id) => {
  const pokemon = await http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return pokemon.name;
}

module.exports = {
  getPokemonById
};