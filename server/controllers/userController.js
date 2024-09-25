const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Inventory = require("../models/inventoryModal");
const mongoose = require("mongoose");

const register = async(req,res)=>{
    try {
        // check if user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
          return res.send({
            success: false,
            message: "User already exists",
          });
        }
    
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
    
        // save user
        const user = new User(req.body);
        await user.save();
    
        return res.send({
          success: true,
          message: "User registered successfully",
        });
      } catch (error) {
        return res.send({
          success: false,
          message: error.message,
        });
      }
}

const login = async (req, res) => {
    try {
      // check if user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.send({
          success: false,
          message: "User not found",
        });
      }
  
      // check if userType matches
      if (user.userType !== req.body.userType) {
        return res.send({
          success: false,
          message: `User is not registered as a ${req.body.userType}`,
        });
      }
  
      // compare password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
  
      if (!validPassword) {
        return res.send({
          success: false,
          message: "Invalid password",
        });
      }
  
      // generate token
     
      const token = jwt.sign({ userId: user._id },process.env.SECRET, {
        expiresIn: "1d",
      });
  
      return res.send({
        success: true,
        message: "User logged in successfully",
        data: token,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  }

  const getCurrentUser =  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      return res.send({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  }
  const getAllDonors = async (req, res) => {
    try {
      // get all unique donor ids from inventory
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      const uniqueDonorIds = await Inventory.distinct("donar", {
        organization,
      });
  
      const donars = await User.find({
        _id: { $in: uniqueDonorIds },
      });
  
      return res.send({
        success: true,
        message: "Donars fetched successfully",
        data: donars,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  }

  const getAllHospitals = async (req, res) => {
    try {
      // get all unique hospital ids from inventory
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      const uniqueHospitalIds = await Inventory.distinct("hospital", {
        organization,
      });
  
      const hospitals = await User.find({
        _id: { $in: uniqueHospitalIds },
      });
  
      return res.send({
        success: true,
        message: "Hospitals fetched successfully",
        data: hospitals,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  }

  const getAllOrganizationsOfDonar = async (req, res) => {
    try {
      // get all unique hospital ids from inventory
      const donar = new mongoose.Types.ObjectId(req.body.userId);
      const uniqueOrganizationIds = await Inventory.distinct("organization", {
        donar,
      });

      const org = await User.find({
        _id: { $in: uniqueOrganizationIds },
      });

      return res.send({
        success: true,
        message: "Organizations fetched successfully",
        data: org,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  }

  const getAllOrganizationsOfHospital = async (req, res) => {
    try {
      // get all unique organizations ids from inventory
      const hospital = new mongoose.Types.ObjectId(req.body.userId);
      //searching for distinct organization values in all documents where the hospital field matches the value of the variable hospital.
      const uniqueOrganizationIds = await Inventory.distinct("organization", {
        hospital,
      });

      const org = await User.find({
        _id: { $in: uniqueOrganizationIds },
      });

      return res.send({
        success: true,
        message: "Organizations fetched successfully",
        data:org,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  };

module.exports={login,register,getAllDonors,getAllHospitals,getCurrentUser,getAllOrganizationsOfDonar,getAllOrganizationsOfHospital};