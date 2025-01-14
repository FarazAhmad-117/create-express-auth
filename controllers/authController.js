const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../helpers/sendEmail");

// Local sign-up
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    // Send email verification link
    const verifyLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    const emailContent = `
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
        <a href="${verifyLink}">Verify Email</a>
      `;

    await sendEmail(email, "Verify Your Email", emailContent);

    res.json({
      success: true,
      message: "User created successfully. Please verify your email.",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error signing up",
      error: err.message,
    });
  }
};

// Email verification
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOneAndUpdate(
      { email: decoded.email, verificationToken: token },
      { isVerified: true, verificationToken: null },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    res.json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Verification failed",
      error: err.message,
    });
  }
};

// Local sign-in
exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "Please verify your email first" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error signing in",
      error: err.message,
    });
  }
};

// Handle OAuth Sign-Ins (common for all providers)
exports.oauthCallback = async (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/dashboard`);
};
