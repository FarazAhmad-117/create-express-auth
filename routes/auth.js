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

/**
 * @swagger
 * /api/auth/verify-email/{token}:
 *   get:
 *     summary: Verify email address
 *     description: Verifies the user's email address using the token provided in the URL. Marks the user as verified if the token is valid.
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token sent to the user's email.
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email verified successfully.
 *       400:
 *         description: Invalid or expired token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid token.
 *       500:
 *         description: Internal server error during verification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Verification failed.
 *                 error:
 *                   type: string
 *                   example: Error message here.
 */
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

module.exports = router;
