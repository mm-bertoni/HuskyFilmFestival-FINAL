import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserByEmail, findUserById } from "../models/users.js";

// Configure Local Strategy for email/password authentication
const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
async (email, password, done) => {
  try {
    console.log("Passport - Email:", email);
    console.log("Passport - Password:", password);
    
    const user = await findUserByEmail(email);
    console.log("Passport - User found:", user);

    if (!user) {
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
  } catch (error) {
    console.error("Passport error:", error);
    return done(error);
  }
})

passport.use(strategy);

// Serialize user
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
