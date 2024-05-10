
const express =require("express");
const UserController =require("../Controller/user.controller.js");
const validators = require('../Middleware/validator.js');

const router = express.Router();

router.post("/signup", validators.validate("signup"), validators.validationMiddleware, UserController.signupController);
router.post("/login", validators.validate("login"), validators.validationMiddleware, UserController.loginController);
router.post("/forgot-password", validators.validate("forgotPassWord"), validators.validationMiddleware, UserController.forgotPassword);
router.post("/reset-password", validators.validate("resetPassWord"), validators.validationMiddleware, UserController.resetPassword);
router.post("/logout", UserController.logoutController)
module.exports= router;
