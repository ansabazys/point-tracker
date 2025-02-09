import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express from "express";
import Admin from "../models/Admin.js"; // Adjust based on your DB schema

export const logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await password === "admin321"
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ success: true, token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logOut = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
};
