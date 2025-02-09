import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.cookies?.token; // ✅ Get token from cookie
  console.log("Token in request:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified:", decoded);
    req.admin = decoded;
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;