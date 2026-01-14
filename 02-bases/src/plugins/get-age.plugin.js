const getAgePlugin = require('get-age');

const getAge = (birthdate) => {
  if (!birthdate) return new Error('Birthdate is required to calculate age.')
    
  return getAgePlugin(birthdate);
}

module.exports = {
  getAge,
};