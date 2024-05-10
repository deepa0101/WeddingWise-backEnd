const express =require("express");
const { addVendor,deleteVendor,getVendors} = require("../Controller/vendor.controller.js");

const router = express.Router();

router.post("/addVendor",  addVendor);
router.post("/DeleteVendor", deleteVendor);
router.get("/getVendors",getVendors)

module.exports= router;
