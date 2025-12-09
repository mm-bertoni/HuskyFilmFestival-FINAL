import express from "express";
import bcrypt from "bcrypt";

import { isAuthenticated } from "../../middleware/auth.js";
import { findUserByUsername, createUser } from "../../models/usersM.js";
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
// Login (for filmAdmin form) - JSON response version
router.post("/loginUser", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: "Server error during authentication" 
            });
        }
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: info?.message || "Invalid credentials" 
            });
        }
        
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ 
                    success: false, 
                    message: "Login failed" 
                });
            }
            
            return res.status(200).json({ 
                success: true, 
                message: "Login successful",
                user: { 
                    username: user.username,
                    // Add any other non-sensitive user data you need
                }
            });
        });
    })(req, res, next);
});

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