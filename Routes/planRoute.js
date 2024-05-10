const express =require("express");
const PlanController=require('../Controller/plan.controller.js')
const router = express.Router();
const {authenticate} = require('../Middleware/auth.js')


router.post("/addEvent", PlanController.addEventToPlan);
router.post("/removeEvent", PlanController.removeEventFromPlan);
router.get("/getPlan/:id", PlanController.getPlan);
router.post("/addVenue", PlanController.addVenueToEvent);
router.post("/addVendor", PlanController.addVendorToEvent);


module.exports= router;