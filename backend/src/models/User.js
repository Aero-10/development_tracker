import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  tokenHash: String,
  deviceFingerprint: String,
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  roles: { type: [String], default: ["user"] },
  tokenVersion: { type: Number, default: 0 },
  refreshTokens: [refreshTokenSchema],
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date
});

export default mongoose.model("User", userSchema);
