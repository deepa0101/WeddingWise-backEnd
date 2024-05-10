const userModel = require( "../Model/User.js");
const Vendor = require( "../Model/Vendors.js");


const addVendor =  async(req,res)=>{
    try{
        const { vendorName, description ,contactNumber,vendorType} = req.body;
        const existingVendor = await eventModel.find({vendorName: vendorName})
        if(existingVendor){
            res.send("Vendor already exists in our Website.")
        }
        else{
            const newVendor = await Vendor.create({
                vendorName,
                description,
                contactNumber,
                vendorType,
                
              });
          
              await newVendor.save();
              res.status(201).json({ message: "Event added successfully" });
        }
    }catch(error){
        console.log(error)
        res.send(error)
    }
}



const deleteVendor = async(req,res)=>{
    try{
        const vendor = await Vendor.deleteOne({vendorName: req.body.vendorName})
        res.send({message: "vendor deleted"})
    } catch(error){
        console.log(error)
        res.send(error)
    }
}

const getVendors = async(req,res)=>{
    try{
        const vendor = await Vendor.find();
        res.send(vendor)
    }catch(error){
        res.send(error)
    }
}

module.exports = {addVendor,deleteVendor,getVendors}