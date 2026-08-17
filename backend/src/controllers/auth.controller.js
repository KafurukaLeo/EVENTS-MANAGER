import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";

import { jwtSecret, jwtExpiresIn } from "../config/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userModel.findByIdEmail(email);
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User Registered successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findByIdEmail(email);
    
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid password or email",
      });
    }
    
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password or email",
      });
    }
    
    const token = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        role: existingUser.role,
      },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      },
    );
    
    res.json({
      success: true,
      message: "Login successfully",
      token,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const currentUser = await userModel.findById(req.user.id);
    res.json({
      success: true,
      data: currentUser,
    });
  } catch (error) {
    next();
  }
};
