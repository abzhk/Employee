const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require("express");

//existing user find by mail id and field require
exports.registerUser = async (req, res) => {
  const { username, email, password, mobile, address, aadhar, role } = req.body;

  if ( !username || !email || !password || !mobile || !address || !aadhar || !role ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    //generate and count employee or user id
    const userCount = await User.countDocuments({ role }); //store all count in  usecount function
    const idPrefix = role === "employee" ? "EMP" : "M";
    const formattedNumber = String(userCount + 1).padStart(3, "0"); //increment one by one cound for employee or manager
    const generatedId = `${idPrefix}${formattedNumber}`;
    // console.log("usercount", userCount);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user REGISTRATION
    const newUser = new User({ username, email, password: hashedPassword, mobile, address, aadhar, role, generatedId, });

    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Set JWT in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side scripts from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Ensures cookie is only sent with same-site requests
      maxAge: 3600 * 1000, // 1 hour in milliseconds
    });

    // Return the token and user data in the response
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        ...newUser.toObject(),
        generatedId: newUser.generatedId,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (role & (user.role !== role)) {
      return res.status(403).json({ message: "unauthorized role" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // 1-hour token expiry
    );

    // Optionally store the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600 * 1000, // 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.empdetail = async (req, res) => {
  try {
    const userId = req.params.id;
    
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "No employee or user detail found" });
    }

    res.status(200).json({
      message: "Details fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  } 
};

