import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import * as UserModel from "../models/User.model.js";
import { env } from "../config/env.js";

/*
 * Register a new user
 */
export const registerUser = async (userData) => {
  const { firstName, lastName, email, phone, password, role } = userData;

  /*
   * Check if email already exists
   */
  const existingUser = await UserModel.findUserByEmail(email);

  if (existingUser) {
    const error = new Error("A user with this email already exists");

    error.statusCode = 409;
    throw error;
  }

  /*
   * Hash password
   */
  const hashedPassword = await bcrypt.hash(password, 12);

  /*
   * Default role
   *
   * Never allow normal registration to create
   * an ADMIN account.
   */
  const userRole = role && role !== "ADMIN" ? role : "ATTENDEE";

  /*
   * Create user
   */
  const user = await UserModel.createUser({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    role: userRole,
  });

  /*
   * Never return password to client
   */
  const { password: _password, ...safeUser } = user;

  return safeUser;
};

/*
 * Login user
 */
export const loginUser = async (loginData) => {
  const { email, password } = loginData;

  /*
   * Find user
   */
  const user = await UserModel.findUserByEmail(email);

  if (!user) {
    const error = new Error("Invalid email or password");

    error.statusCode = 401;
    throw error;
  }

  /*
   * Check if account is active
   */
  if (user.status !== "ACTIVE") {
    const error = new Error("Your account is not active");

    error.statusCode = 403;
    throw error;
  }

  /*
   * Compare password
   */
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const error = new Error("Invalid email or password");

    error.statusCode = 401;
    throw error;
  }

  /*
   * Create JWT
   */
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    },
  );

  /*
   * Remove password from response
   */
  const { password: _password, ...safeUser } = user;

  return {
    user: safeUser,
    token,
  };
};

/*
 * Get user profile
 */
export const getUserProfile = async (userId) => {
  const user = await UserModel.findUserById(userId);

  if (!user) {
    const error = new Error("User not found");

    error.statusCode = 404;
    throw error;
  }

  /*
   * Never expose password
   */
  const { password: _password, ...safeUser } = user;

  return safeUser;
};

/*
 * Get user by ID
 */
export const getUserById = async (userId) => {
  const user = await UserModel.findUserById(userId);

  if (!user) {
    const error = new Error("User not found");

    error.statusCode = 404;
    throw error;
  }

  const { password: _password, ...safeUser } = user;

  return safeUser;
};

/*
 * Get all users
 */
export const getUsers = async () => {
  const users = await UserModel.findAllUsers();

  /*
   * Remove password from every user
   */
  return users.map((user) => {
    const { password: _password, ...safeUser } = user;

    return safeUser;
  });
};

/*
 * Update user profile
 */
export const updateUserProfile = async (userId, userData) => {
  const existingUser = await UserModel.findUserById(userId);

  if (!existingUser) {
    const error = new Error("User not found");

    error.statusCode = 404;
    throw error;
  }

  /*
   * Prevent users from changing their role
   * through the profile endpoint.
   */
  const updateData = {
    firstName: userData.firstName ?? existingUser.first_name,

    lastName: userData.lastName ?? existingUser.last_name,

    phone: userData.phone ?? existingUser.phone,
  };

  /*
   * Update email if supplied
   */
  if (userData.email && userData.email !== existingUser.email) {
    const emailUser = await UserModel.findUserByEmail(userData.email);

    if (emailUser && emailUser.id !== userId) {
      const error = new Error("Email is already being used");

      error.statusCode = 409;
      throw error;
    }

    updateData.email = userData.email;
  }

  const updatedUser = await UserModel.updateUser(userId, updateData);

  const { password: _password, ...safeUser } = updatedUser;

  return safeUser;
};

/*
 * Change password
 */
export const changePassword = async (userId, passwordData) => {
  const { currentPassword, newPassword } = passwordData;

  const user = await UserModel.findUserById(userId);

  if (!user) {
    const error = new Error("User not found");

    error.statusCode = 404;
    throw error;
  }

  /*
   * Verify current password
   */
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);

  if (!passwordMatch) {
    const error = new Error("Current password is incorrect");

    error.statusCode = 400;
    throw error;
  }

  /*
   * Hash new password
   */
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await UserModel.updatePassword(userId, hashedPassword);

  return true;
};

/*
 * Delete user
 */
export const deleteUser = async (userId) => {
  const user = await UserModel.findUserById(userId);

  if (!user) {
    const error = new Error("User not found");

    error.statusCode = 404;
    throw error;
  }

  await UserModel.deleteUser(userId);

  return true;
};
