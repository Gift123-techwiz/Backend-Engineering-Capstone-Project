const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {registerUser, loginUser, getProfile, getReports, deleteUser, promoteUser} = require("../controllers/authController");
const authorize = require("../middlewares/roleMiddleware");
const router = express.Router();

// Register route
router.post("/user/register", registerUser);

// Login route
router.post("/user/login", loginUser);

// Profile route
router.get("/user/profile", protect, getProfile);

// Reports route
router.get("/moderator/reports", protect, authorize("moderator", "admin"), getReports);

// Delete user route
router.delete("/admin/user/:id", protect, authorize("admin"), deleteUser);

// Promote user route
router.patch("/admin/promote/:id", protect, authorize("admin"), promoteUser);

module.exports = router;