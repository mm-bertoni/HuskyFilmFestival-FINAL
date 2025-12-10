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


// Used Claude to help troubleshoot the serializing
// Anthropic. (2025, Dec 5). *Formatting MongoDB data to match users.js structure* [Generative AI Chat]. Claude Sonnet 4.5 https://claude.ai/share/13751439-461d-40f5-86cd-df89268c170e 
passport.serializeUser((user, done) => {
 
  console.log("Serializing user:",user._idD);
  done(null, user._id.toString());  // Save the string id to session
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("Deserializing user ID:", id);
    const user = await findUserById(id);  // findUserById will handle string->ObjectId conversion
    console.log("Deserialized user:", user);
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error, null);
  }
});

export default passport;
