const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { addInventory, getInventoryWithFilters, getInventory } = require("../controllers/inventoryController");

// add inventory
router.post("/add", authMiddleware, addInventory);

// get inventory
router.get("/get", authMiddleware,getInventory);

// get inventory with filters
router.post("/filter", authMiddleware,getInventoryWithFilters);

module.exports = router;
