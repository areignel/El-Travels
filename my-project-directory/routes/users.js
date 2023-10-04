const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Import the MySQL database connection (from your database.js or similar file)
const db = require('../database'); // Adjust the path to your database.js file

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if the username already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      username,
      password: hashedPassword,
    };

    const result = await createUser(newUser);

    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(500).json({ error: 'Failed to register user' });
    }
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login a user and issue a JWT token
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const user = req.user;

  // Create a JWT token
  const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', {
    expiresIn: '1h', // Token expiration time (adjust as needed)
  });

  res.json({ token });
});

// Get user by username from the database
async function getUserByUsername(username) {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const values = [username];

  const [rows] = await db.promise().query(sql, values);
  return rows[0];
}

// Create a new user in the database
async function createUser(user) {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  const values = [user.username, user.password];

  return await db.promise().query(sql, values);
}

// Passport.js configuration for local strategy (username/password)
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    try {
      // Find the user by username
      const user = await getUserByUsername(username);

      // If the user doesn't exist or the password is incorrect, return an error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      // If the username and password are correct, return the user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = router;

