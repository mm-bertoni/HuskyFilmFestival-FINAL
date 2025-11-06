import express from "express";
const router = express.Router();

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_CREDENTIALS.username && 
      password === ADMIN_CREDENTIALS.password) {

    res.json({
      success: true,
      message: 'Login successful'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

export default router;