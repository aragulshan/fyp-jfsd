const userRouter = require("express").Router();
const userController = require("../controllers/User");
const auth = require("../middlewares/auth");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/send-otp", userController.generateAndSendOTP);
userRouter.put("/forgotpassword", userController.forgotPassword);
userRouter.get("/getallusers", userController.getAllUsers);

module.exports = userRouter;
