// Troubleshooted original usersM.js file with Claude
// Fixed versions of functions made with Claude:
// Anthropic. (2025, Dec 5). *Formatting MongoDB data to match users.js structure* [Generative AI Chat]. Claude Sonnet 4.5 https://claude.ai/share/13751439-461d-40f5-86cd-df89268c170e
import UsersDB from "../server/usersDB.js";

export const createUser = (user) => {
    try{} catch (error) {
        console.error("Error creating user", error);
    }
};

export const findUserById = async (id) => {
    try {
        const users = await UsersDB.getUser({ _id: id });
        if (users && users.length > 0) {
            const user = users[0];
            console.log("Found:", user);
            // Convert MongoDB _id to id for consistency with users.js
            return {
                id: user._id.toString(),
                ...user
            };
        }
        console.log("Found: null");
        return null;
    } catch (error) {
        console.error("Error getting user by ID", error);
        return null;
    }
};

export const findUserByUsername = async (username) => {
    try {
        console.log("Searching for username:", username);
        const users = await UsersDB.getUser({ username: username });
        if (users && users.length > 0) {
            const user = users[0];
            console.log("Found:", user);
            // Convert MongoDB _id to id for consistency with users.js
            return {
                id: user._id.toString(),
                ...user
            };
        }
        console.log("Found: null");
        return null;
    } catch (error) {
        console.error("Error getting user by username", error);
        return null;
    }
};