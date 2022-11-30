const bcrypt = require("bcrypt"); /* to hash and verify passwords*/
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
  //1. Check for Existing User
  //2. Hashed Password
  //3. User Creation
  //4. Token Generation

  const { fullname, age, gender, email, password } = req.body;
  /* if (!req.file) {
    console.log("No file");
    return;
  } */
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    //Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    //Upload profile picture to Cloudinary first
    console.log("Req.file: ", req.file);
    let cloudinaryResult;
    let result;
    if (req.file) {
      try {
        console.log("Profile Picture Provided");
        cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "AlbinoNetwork_Profile_Pictures",
        });
        result = await userModel.create({
          fullname: fullname,
          profile_picture_url: cloudinaryResult.secure_url,
          age: age,
          gender: gender,
          email: email,
          password: hashedPassword,
        });
      } catch (error) {
        console.log("Cloudinary upload error: ", error);
        return res.send(error);
      }
    } else {
      console.log("No Profile Picture ");
      result = await userModel.create({
        fullname: fullname,
        profile_picture_url:
          "https://res.cloudinary.com/dcqa6vckq/image/upload/v1669847401/samples/60111_otkwmp.jpg",
        age: age,
        gender: gender,
        email: email,
        password: hashedPassword,
      });
    }

    console.log(SECRET_KEY);
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "Prathmesh@425001"
    ); /* both the jwts are signed with the same payloads in register and login*/

    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "Prathmesh@425001"
    ); /* both the jwts are signed with the same payloads in register and login*/
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { register, login };
