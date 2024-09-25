const router = require("express").Router();
const { getAllBloodGroupsDetails } = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");


// get all blood groups totalIn , totalOut , available data from inventory
router.get("/blood-groups-data", authMiddleware, getAllBloodGroupsDetails);

module.exports = router;
