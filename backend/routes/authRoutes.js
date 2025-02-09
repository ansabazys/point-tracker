import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/status", (req, res) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.status(401).json({ admin: null, message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ admin: { id: decoded.id }, message: "Authenticated" });
  } catch (error) {
    res.status(401).json({ admin: null, message: "Invalid token" });
  }
});

export default router;
