const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Inventory = require("../models/inventoryModal");
const mongoose = require("mongoose");
const { getAllOrganizationsOfHospital, getAllOrganizationsOfDonar, getAllHospitals, getAllDonors, getCurrentUser, login, register } = require("../controllers/userController");

// register new user
router.post("/register", register);

// login user
router.post("/login", login);

// get current user
router.get("/get-current-user", authMiddleware,getCurrentUser);

// get all unique donors
router.get("/get-all-donars", authMiddleware,getAllDonors );

// get all unique hospitals
router.get("/get-all-hospitals", authMiddleware, getAllHospitals);

// get all unique organizations for a donar
router.get(
  "/get-all-organizations-of-a-donar",
  authMiddleware,
  getAllOrganizationsOfDonar
);

// get all unique organizations for a hospital
router.get(
  "/get-all-organizations-of-a-hospital",
  authMiddleware,
  getAllOrganizationsOfHospital
);

module.exports = router;
