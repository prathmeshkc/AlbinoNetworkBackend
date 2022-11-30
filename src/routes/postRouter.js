const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
} = require("../controllers/postController");

const auth = require("../middlewares/auth");

const postRouter = express.Router();

postRouter.post("/", auth, createPost);
postRouter.put("/:id", auth, updatePost);
postRouter.delete("/:id", auth, deletePost);
postRouter.get("/", auth, getUserPosts);

module.exports = postRouter;
