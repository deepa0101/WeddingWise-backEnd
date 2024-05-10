
const bcrypt =require("bcryptjs");
const { cookies } = require("cookie");
const jwt=require("jsonwebtoken");
const hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

const hashCompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const authenticate = async (req,res,next) => {
  let token = req.body.token;
  if(token){
    try{
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.id;
        console.log(decoded)
        next();
      }
    catch(error){
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    };
  } else{
    console.log("No token");
    res.status(500).json({ message: "Internal server error" });
    
  }
};

module.exports = {hashPassword,hashCompare,authenticate};