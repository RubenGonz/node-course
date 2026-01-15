interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

export const getUserById = (id: number, callback: (err?: string, user?: User) => void) => {
  const user = users.find((user) => { return user.id === id; });

  if (!user) return callback(`No hay usuario con el id: ${id}`)

  callback(undefined, user);
}
