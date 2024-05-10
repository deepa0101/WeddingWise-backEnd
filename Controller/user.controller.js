
const userModel = require( "../Model/User.js");
const auth = require("../Middleware/auth.js");
const nodemailer = require("nodemailer");
const dotenv =require("dotenv");
const jwt=require("jsonwebtoken");
const eventModel=require("../Model/Event.js");
const { cookie } = require("express-validator");
const { signedCookies } = require("cookie-parser");

dotenv.config();

const signupController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await auth.hashPassword(password);
    const newUser = await  userModel.create({
      userName: userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await auth.hashCompare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const payload = {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    }
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
         })
        res.cookie('token',token,{
          httpOnly: true,
          secure:true,
          sameSite: "none"
        }).status(200).json({ message: "Login successful", token, payload});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const logoutController = async (req,res) =>{
  res.clearCookie('jwt')
  res.status(200).json({message:"logged out successfully"})
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const generateOTP = () => {
      const characters = "0123456789";
      return Array.from(
        { length: 6 },
        () => characters[Math.floor(Math.random() * characters.length)]
      ).join("");
    };

    const OTP = generateOTP();
    user.resetPasswordOtp = OTP;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_MAILER,
        pass: process.env.PASS_MAILER,
      },
    });

    const mailOptions = {
      from: "eyegamers1234@gmail.com",
      to: user.email,
      subject: "Password Reset",
      html: `
        <p>Dear ${user.userName}},</p>
        <p>We received a request to reset your password. Here is your One-Time Password (OTP): <strong>${OTP}</strong></p>
        <p>Please click the following link to reset your password:</p>
        <a href="https://password-reset-flows.netlify.app/reset-password">Reset Password</a>
        <p>If you did not make this request, please ignore this email.</p>
        <p>Thank you,</p>
        <p>From Validation</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { OTP, password } = req.body;

    const user = await userModel.findOne({
      resetPasswordOtp: OTP,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      const message = user ? "OTP has expired" : "Invalid OTP";
      return res.status(404).json({ message });
    }

    const hashedPassword = await auth.hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addEvents = async(req,res)=>{
  
  try{
    const {name,date} = req.body;
    const event = await userModel.findOne({eventName: name})
    if(event){
      res.send("Event Already exists in your plan")
    }
    else{
      const eventToAdd = await eventModel.findOne({eventName: name})
      userModel.events.push(eventToAdd)

      userModel.save();
    }

    
  } catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {signupController, loginController, logoutController,resetPassword,forgotPassword,};
