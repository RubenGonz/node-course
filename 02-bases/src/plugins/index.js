const { getUUID } = require('../plugins/geit-id-plugin');
const { getAge } = require('../plugins/get-age.plugin');
const { http } = require('../plugins/http-client.plugin');

module.exports = {
  getUUID,
  getAge,
  http
}