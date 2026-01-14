const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

function getUserById(id, callback) {
  const user = users.find(function (user) { return user.id === id; });

  if (!user) {
    return callback(`No hay usuario con el id: ${id}`);
  }

  callback(null, user);
}

module.exports = { getUserById };