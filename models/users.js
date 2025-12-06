import bcrypt from 'bcrypt';

let users = [
  /* {
    id: "1",
    email: "admin@test.com",
    passwordHash: bcrypt.hashSync("admin123", 10),
    name: "Admin User",
  },  */   
];

console.log("Users on startup:", users);

export const createUser = (user) => {
  const newUser = {
    id: Date.now().toString(),
    ...user,
  };
  users.push(newUser);
  return newUser;
};

export const findUserByEmail = (email) => {
  console.log("Searching for email:", email);
  const found = users.find((user) => user.email === email);
  console.log("Found:", found);
  return found;
};

export const findUserById = (id) => {
  return users.find((user) => user.id === id);
};

// Find by username
export const findUserByUsername = (username) => {
  console.log("Searching for username:", username);
  const found = users.find((user)=> user.username === username);
  console.log("Found:", found);
  return found;
};

export const getAllUsers = () => {
  return users;
};