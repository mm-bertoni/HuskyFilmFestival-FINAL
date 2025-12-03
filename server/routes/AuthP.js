import express from "express"
import bcrypt from "bcrypt"

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = getUserByEmail(email);
    if (!user) {
        return res.status(401).json({message :"Invalid email or password"})
    }
});

export default router;