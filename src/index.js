const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter")
// const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const dotenv = require("dotenv"); /* cors is a middleware. it will add some headers in each response and our API can be called from everywhere*/

dotenv.config(); /*Loads .env file contents into process.env*/
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const mongoose = require("mongoose"); // mongoose is an ODM(Object Data Model) which helps us to avoid writing all the validation checks
// const auth = require("./middlewares/auth");
const { urlencoded } = require("express");

app.use(express.json()); // called because express cannot handle a json file directly
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postRouter)

app.get("/", (req, res) => {
  res.send("Albino Network API");
});

const PORT = 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Server up and running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
