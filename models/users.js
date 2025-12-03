let users = [];

export const createUser = (user) => {
    const newUser = {
        id: Date.now().toString(),
        ...user,
    };
    users.push(newUser);
    return newUser;
};

export const findUserByEmail = (email) => {
    return users.find((user) => user.email === email);
};

export const findUserById = (Id) => {
    return users.find((user) => user.id === id);
};

export const getAllUsers = () => {
    return users;
};