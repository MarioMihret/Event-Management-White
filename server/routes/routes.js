import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { body, validationResult } from "express-validator"; // For input validation
import logger from "../utils/logger.js"; // Assuming you have a logger utility
import { getEvents } from "../controller/eventController.js";

const routes = express.Router();

// Middleware for validating user input
const validateSignup = [
  body("name").notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required."),
  body("password").notEmpty().withMessage("Password is required."),
];

// Login User
const loginUser = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    logger.info("Login attempt for email:", email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn("User not found for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn("Password does not match for user:", user.email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Create User
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn("User already exists with email:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    logger.info("User created successfully:", newUser.email);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    logger.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Routes
routes.post("/signup", validateSignup, createUser);
routes.post("/login", validateLogin, loginUser);

// Event routes
routes.get("/events", getEvents);

export default routes;
