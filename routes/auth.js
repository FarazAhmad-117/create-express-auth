const express = require("express");
const passport = require("passport");
const {
  signUp,
  signIn,
  verifyEmail,
  oauthCallback,
} = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Registers a user and sends a verification email.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       500:
 *         description: Server error.
 */
router.post("/signup", signUp);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user and returns a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *       401:
 *         description: Invalid credentials.
 *       403:
 *         description: Email not verified.
 */
router.post("/signin", signIn);

// Email verification
router.get("/verify-email/:token", verifyEmail);

// OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", passport.authenticate("google"), oauthCallback);

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  oauthCallback
);

router.get("/github", passport.authenticate("github"));
router.get("/github/callback", passport.authenticate("github"), oauthCallback);

// Additional providers can be added similarly...

module.exports = router;
