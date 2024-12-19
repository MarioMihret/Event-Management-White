// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { sendResetPasswordEmail } from "../utils/email.js";

// // const router = express.Router();

// // Signup
// const createUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Validate input
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Name, email, and password are required" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt); // Ensure password is defined here

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "attendee",
//     });

//     await user.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     console.error("Signup error:", error.message); // Log the specific error message
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Log incoming email
//     console.log("Login attempt for email:", email);

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found for email:", email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Password does not match for user:", user.email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Create JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get current user
// const getCurrentUser = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ user });
//   } catch (error) {
//     console.error("Auth check error:", error);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// // Request password reset
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate reset token
//     const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Save reset token to user
//     user.resetToken = resetToken;
//     user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
//     await user.save();

//     // Send reset email
//     await sendResetPasswordEmail(user.email, resetToken);

//     res.json({ message: "Password reset email sent" });
//   } catch (error) {
//     console.error("Password reset request error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Reset password
// const resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({
//       _id: decoded.userId,
//       resetToken: token,
//       resetTokenExpiry: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "Invalid or expired reset token" });
//     }

//     // Hash new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     // Update password and clear reset token
//     user.password = hashedPassword;
//     user.resetToken = undefined;
//     user.resetTokenExpiry = undefined;
//     await user.save();

//     res.json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Password reset error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { createUser };
// module.exports = { loginUser };
// // export { createUser, loginUser, getCurrentUser, forgotPassword, resetPassword };
