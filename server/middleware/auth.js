// const jwt = require("jsonwebtoken");

// exports.verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// exports.isAdmin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(403).json({ message: "Access denied, Admin only" });
//   }
// };

const jwt = require("jsonwebtoken");

// Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received in backend:", token); // debug
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // debug
    req.user = decoded; // { id, isAdmin }
    next();
  } catch (err) {
    console.log("Token error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Verify Token + Admin
const isAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else res.status(403).json({ message: "Admin only" });
  });
};

// Verify Token + User (optional, for user routes)
const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else res.status(403).json({ message: "Not allowed" });
  });
};

module.exports = { verifyToken, verifyTokenAndUser, isAdmin };
