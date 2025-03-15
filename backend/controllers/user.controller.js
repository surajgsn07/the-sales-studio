const User = require("../models/user.js");
const { v4: uuidv4 } = require("uuid");

// ✅ Generate Session ID
exports.getSessionId = async (req, res) => {
  try {
    const sessionId = uuidv4(); // Generate a unique session ID
    res.json({ sessionId });
  } catch (err) {
    res.status(500).json({ error: "Error generating session ID" });
  }
};

// ✅ Register Normal User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const newUser = new User({ username, email, password });
    if(!newUser) return res.status(400).json({ error: "User registration failed" });
    await newUser.save();
    const token = newUser.generateToken();

    res.status(201).json({ message: "User registered successfully" , user:newUser , token });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValid = await user.comparePassword(password);
    if (!isValid) return res.status(400).json({ error: "Wrong password" });

    const token = user.generateToken();

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
