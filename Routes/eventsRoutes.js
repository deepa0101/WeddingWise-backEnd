
const express =require("express");
const { addEvent,deleteEvent,getEvents ,getEventsByID} = require("../Controller/events.controller.js");

const router = express.Router();

router.post("/addEvent",  addEvent);
router.post("/deleteEvent", deleteEvent);
router.get("/getEvents",getEvents);
router.get("/getEventsbyid",getEventsByID)
module.exports= router;
