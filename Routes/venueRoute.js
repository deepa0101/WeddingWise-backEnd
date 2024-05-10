const express =require("express");
const { addVenue,deleteVenue,getVenues} = require("../Controller/venue.controller.js");

const router = express.Router();

router.post("/addVenue",  addVenue);
router.post("/deleteVenue", deleteVenue);
router.get("/getVenues",getVenues)

module.exports= router;