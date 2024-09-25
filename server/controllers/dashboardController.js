const authMiddleware = require("../middlewares/authMiddleware");
const Inventory = require("../models/inventoryModal");
const mongoose = require("mongoose");

const getAllBloodGroupsDetails = (async(req,res)=>{
    try {
        const allBloodgroups = ["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"];
        const organization = new mongoose.Types.ObjectId(req.body.userId);//from auth middleware
        const bloodGroupsData = [];
    //for each blood group, two DB queries are made and these are async. so using promise.all ensures these run concurrently
        await Promise.all(
          allBloodgroups.map(async (bloodGroup) => {
            const totalIn = await Inventory.aggregate([
              {
                $match: { 
                  bloodGroup: bloodGroup,
                  inventoryType: "in",
                  organization,
                },
              },
              {
                $group: {
                  _id: null,
                  total: {
                    $sum: "$quantity",
                  },
                },
              },
            ]);
    
            const totalOut = await Inventory.aggregate([
              {
                $match: {
                  bloodGroup: bloodGroup,
                  inventoryType: "out",
                  organization,
                },
              },
              {
                $group: {
                  _id: null,
                  total: {
                    $sum: "$quantity",
                  },
                },
              },
            ]);
    
            const available = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
    
            bloodGroupsData.push({
              bloodGroup,
              totalIn: totalIn[0]?.total || 0,
              totalOut: totalOut[0]?.total || 0,
              available,
            }); 
          })
        );
    
        res.send({
          success: true,
          message: "Blood Groups Data",
          data: bloodGroupsData,
        });
      } catch (error) {
        return res.send({
          success: false,
          message: error.message,
        });
      }
});
module.exports={getAllBloodGroupsDetails};