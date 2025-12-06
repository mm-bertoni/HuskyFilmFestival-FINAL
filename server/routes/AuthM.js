import express from "express";
import bcrypt from "bcrypt";

import { isAuthenticated } from "../../middleware/auth.js";
import { findUserByUsername, createUser } from "../../models/users.js";
import passport from "../../config/passportM.js"

const router = express.Router();

// Register (for filmAdmin form)
router.post("/registerUser", async (req, res) =>{
    try{
        // Parse from request to register from the form
        const {username, password} = req.body; 

        // Check if user exists
        const existingUser = await findUserByUsername(username);
        if (existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        //Create user
        const user = await createUser({
          username,
          passwordHash: hashedPassword,
        });
    
        // Don't send passoword back
        delete user.password;
    
        res.status(201).json({
          message: "User created successfully",
          user,
        });    

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// Login (for filmAdmin form)
router.post(
    "/loginUser",
    passport.authenticate("local", {
        successRedirect: "/loggedInAdmin",
        failureRedirect: "/filmAdmin?msg='Invalid credentials'",
    })
);

//Get current user
router.get("/user", isAuthenticated, (req, res) => {
    delete req.user.passwordHash;
    res.json({ user: req.user });
});

// Logout endpoint
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        message: "Error during logout",
        error: err.message
      });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});


export default router;