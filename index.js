const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express()
const cookieParser = require("cookie-parser");
const mongoose=require('mongoose')
const path= require("path")
const { events } = require('./seedData/events.seed.js');
const { venues } = require('./seedData/venue.seed.js');
const { vendors } = require('./seedData/vendors.seed.js');
const Event = require('./Model/Event.js');
const Venue = require('./Model/Venue.js');
const Vendor  = require('./Model/Vendors.js');
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const userRoute = require('./Routes/userRoutes')
const planRoute = require('./Routes/planRoute')
const vendorRoute = require("./Routes/vendorRoute.js");
const eventRoute = require('./Routes/eventsRoutes.js');
const venueRoute = require('./Routes/venueRoute.js')
const todoRoute = require('./Routes/todoRoute.js')
const budgetRoute = require('./Routes/budgetRoute.js')
app.use("/user", userRoute);
app.use("/plan", planRoute);
app.use("/vendor",vendorRoute);
app.use("/event",eventRoute);
app.use("/venue",venueRoute);
app.use("/todo",todoRoute)
app.use("/budget",budgetRoute)


app.get("/", (req, res) => {
  res.send("Welcome to the Server! 🌐");
});
console.log(`${process.env.MONGO_URI}`)
mongoose.connect(`${process.env.MONGO_URI}`)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// const seedEvent=async()=>{
// await Event.deleteMany()
// await Event.insertMany(events)}
// seedEvent().then(value => { 
//     console.log("Saved Successfully"); 
// })
// .catch(error => { 
//     console.log(error); 
// })
// const seedVenue=async()=>{
//  await Venue.deleteMany()
//  await Venue.insertMany(venues)}
//  seedVenue().then(value => { 
//   console.log("Saved Successfully"); 
// }) 
// .catch(error => { 
//   console.log(error); 
// }) 
// const seedVendor=async()=>{
// await Vendor.deleteMany()
// await Vendor.insertMany(vendors)}
// seedVendor().then(value => { 
//   console.log("Saved Successfully"); 
// }) 
// .catch(error => { 
//   console.log(error); 
// }) 
