import jwt from "jsonwebtoken";
import crypto from "crypto";

export const signAccessToken = (user) =>
  jwt.sign(
    { userId: user._id, roles: user.roles, tokenVersion: user.tokenVersion },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

export const generateRefreshToken = () =>
  crypto.randomBytes(64).toString("hex");

export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");
