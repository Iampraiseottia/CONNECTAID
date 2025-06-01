import bcrypt from "bcryptjs";
import crypto from "crypto";

export const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const generateTokenExpiry = () => {
  // Token expires in 24 hours
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
};
