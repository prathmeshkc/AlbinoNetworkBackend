const express = require("express");
const { register, login } = require("../controllers/userController");
const multer = require("multer");

const userRouter = express.Router();


const storage = multer.diskStorage({});

let upload = multer({
  storage,
}); 


userRouter.post("/register", upload.single("profile_pic"),register);
userRouter.post("/login", login)


module.exports = userRouter;
