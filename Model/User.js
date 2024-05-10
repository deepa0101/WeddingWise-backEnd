const mongoose = require('mongoose');

const validateEmail = (e) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e);
  };

  const userSchema = new mongoose.Schema(
    {
    userName: {
        type: String,
        required: [true, "Username is Required"]
    },
    password:{
        type: String,
        required: [true, "password is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: validateEmail,
      },
      role: {
         type: String, 
         enum:['customer','admin'],
         default: "customer" 
    },
      createdAt: { 
        type: Date, 
        default: Date.now() 
    },
      resetPasswordOtp: { 
        type: Number 
    },
      resetPasswordExpires: { 
        type: Date 
    },
    plannedEvents:
    [{
      type: mongoose.Types.ObjectId,
      ref: 'Plan'
    }]
  },{
        collection: 'User'
    })

const  User = mongoose.model("User",userSchema)
module.exports = User