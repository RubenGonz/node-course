// Callbacks
import { getUserById } from "./js-foundation/03-callbacks";

getUserById(2, (err, user) => {
  console.log("***Callbacks***");
  if (err) {
    console.error(err);
    return;
  }
  console.log(user);
});

// Factory
import { getAge, getUUID } from "./plugins";
import { buildMakePerson } from "./js-foundation/05-factory";

const makePerson = buildMakePerson({ getUUID, getAge });
const jhon = makePerson({ name: "John", birthdate: new Date("1985-10-21") });

console.log("***Factory***");
console.log(jhon);

// Promises
import { getPokemonNameById } from "./js-foundation/06-promises";

getPokemonNameById(4)
  .then(name => {
    console.log("***Promises***");
    console.log(name)
  })
  .catch(err => {
    console.log("***Promises***");
    console.error(err)
  })
  .finally(() => console.log('End of execution'));

// Logger Plugin
import { buildLogger } from "./plugins/logger.plugin";

const logger = buildLogger('app.js');

console.log("***Loggers***");
logger.log('Hola mundo');
logger.error('Esto es algo malo');

