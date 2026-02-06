import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { isPasswordValid } from "../utils/passwordValidator.js";
import {
  signAccessToken,
  generateRefreshToken,
  hashToken
} from "../utils/tokens.js";
import crypto from "crypto";
import { authLimiter } from "../middleware/rateLimiter.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
const router = express.Router();
router.post("/signup",authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }
  if (!isPasswordValid(password)) {
    return res.status(400).json({
      message: "Password does not meet security requirements"
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    passwordHash,
    roles: ["user"]
  });

  const accessToken = signAccessToken(user);
  const refreshToken = generateRefreshToken();
  const emailToken = crypto.randomBytes(32).toString("hex");

  user.emailVerificationToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");

  user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h

  user.refreshTokens.push({
    tokenHash: hashToken(refreshToken),
    deviceFingerprint: "signup",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });

  await user.save();

  try {
    await sendVerificationEmail(user.email, emailToken);
  } catch (err) {
    console.error("Email failed:", err.message);
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.status(201).json({ accessToken });

});

router.post("/verify-email",authLimiter, async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Verification token missing" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", authLimiter,async (req, res) => { 
  const { email, password, deviceFingerprint } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  
  if (!user.isEmailVerified) {
    return res.status(403).json({
      message: "Please verify your email before logging in"
    });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = signAccessToken(user);
  const refreshToken = generateRefreshToken();

  user.refreshTokens.push({
    tokenHash: hashToken(refreshToken),
    deviceFingerprint,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });

  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });

  res.json({ accessToken });
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const tokenHash = hashToken(token);
  const user = await User.findOne({ "refreshTokens.tokenHash": tokenHash });

  if (!user) return res.sendStatus(403);

  const stored = user.refreshTokens.find(
    (t) => t.tokenHash === tokenHash
  );

  if (stored.expiresAt < new Date()) return res.sendStatus(403);

  // ROTATION
  user.refreshTokens = user.refreshTokens.filter(
    (t) => t.tokenHash !== tokenHash
  );

  const newRefresh = generateRefreshToken();
  user.refreshTokens.push({
    tokenHash: hashToken(newRefresh),
    deviceFingerprint: stored.deviceFingerprint,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });

  await user.save();

  const accessToken = signAccessToken(user);

  res.cookie("refreshToken", newRefresh, {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });

  res.json({ accessToken });
});


//kill session
router.post("/logout", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(204);

  const tokenHash = hashToken(token);

  await User.updateOne(
    { "refreshTokens.tokenHash": tokenHash },
    { $pull: { refreshTokens: { tokenHash } } }
  );

  res.clearCookie("refreshToken");
  res.sendStatus(204);
});


export default router;
