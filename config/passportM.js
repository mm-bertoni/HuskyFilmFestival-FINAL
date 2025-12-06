import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserByUsername, findUserById} from "../models/usersM.js";

const strategy = new LocalStrategy(
    {
       usernameField: "username",
       passwordField: "password", 
    },
    async (username, password, done) => {
        try {
            console.log("Passport - Username:", username);
            console.log("Passport - Password:", password);

            // Find user by username
            const user = await findUserByUsername(username);
            console.log("Passport - User found:", user);
            // If no user found
            if (!user){
                return done(null, false, { message: "User or password incorrect" });
            }
            console.log("Passport - About to compare passwords");
            console.log("Passport - user.passwordHash:", user.passwordHash);
                
            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            console.log("Passport - Password valid:", isPasswordValid);
            
            if (!isPasswordValid) {
                return done(null, false, { message: "User or password incorrect" });
             }
            
            console.log("Passport - Login successful!");
            const { passwordHash, ...userWithoutPassword } = user;
            return done(null, userWithoutPassword);
        } catch (error){
            console.error("Passport Error:", error);
            return done(error);
        }
    }
)

// Use strategy
passport.use(strategy);

// Serialize the user 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);

    if (!user) {
      return done(null, false);
    }

    const { passwordHash, ...userWithoutPassword } = user;
    done(null, userWithoutPassword);
  } catch (error) {
    done(error);
  }
});

export default passport;
