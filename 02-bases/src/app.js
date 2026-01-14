// const { getUUID, getAge } = require('./plugins');

// const { buildMakePerson } = require('./js-foundation/05-factory');

// const makePerson = buildMakePerson(getUUID, getAge);
// const jhon = makePerson({ name: "John", birthdate: "1985-10-21" });

// console.log(jhon);

const { getPokemonById } = require('./js-foundation/06-promises');

getPokemonById(4)
  .then(name => console.log(name))
  .catch(err => console.error(err))
  .finally(() => console.log('End of execution'));
