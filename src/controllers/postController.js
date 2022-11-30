const postModel = require("../models/post");

const createPost = async (req, res) => {
  const { title, description } = req.body;
  const newPost = new postModel({
    title: title,
    description: description,
    userId: req.userId,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log("Create Post Error", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const newPost = {
    title: title,
    description: description,
    userId: req.userId,
  };

  try {
    await postModel.findByIdAndUpdate(id, newPost, { new: true });
    res.status(200).json(newPost);
  } catch (error) {
    console.log("Update Post Error", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.findByIdAndRemove(id);
    res.status(202).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await postModel.find({ userId: req.userId });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { createPost, updatePost, deletePost, getUserPosts };
