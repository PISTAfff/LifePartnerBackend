import { Post } from "../../../../DB/models/community/post.model.js";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
import { Gym } from "../../../../DB/models/Gym.model.js";
import { Shop } from "../../../../DB/models/Shop.model.js";
import { Coach } from "../../../../DB/models/coach.model.js";
import { User } from "../../../../DB/models/user.model.js";
export const reportPost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    post.reported = true;
    await post.save();
    res.status(200).json("Post Reported");
  } catch (error) {
    res.status(500).json(error);
  }
}
export const getAllposts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    const emails = posts.map((post) => post.email);
    const users = await User.find({ email: { $in: emails } }).select(
      "firstName lastName profileImg email"
    );
    const coaches = await Coach.find({ email: { $in: emails } }).select(
      "firstName lastName profileImg email"
    );
    const gyms = await Gym.find({ email: { $in: emails } }).select(
      "name profileImg email"
    );
    const shops = await Shop.find({ email: { $in: emails } }).select(
      "name profileImg email"
    );
    const userMap = new Map(users.map((user) => [user.email, user]));
    const coachMap = new Map(coaches.map((coach) => [coach.email, coach]));
    const gymMap = new Map(gyms.map((gym) => [gym.email, gym]));
    const shopMap = new Map(shops.map((shop) => [shop.email, shop]));
    let newPosts = [];
    posts.forEach((post) => {
      let foundUser = userMap.get(post.email);

      if (foundUser) {
        newPosts.push({ ...post.toObject(), user: foundUser });
      } else {
        foundUser = coachMap.get(post.email);
        if (foundUser) {
          newPosts.push({ ...post.toObject(), user: foundUser });
        } else {
          foundUser = gymMap.get(post.email);
          if (foundUser) {
            newPosts.push({ ...post.toObject(), user: foundUser });
          } else {
            foundUser = shopMap.get(post.email);
            if (foundUser) {
              newPosts.push({ ...post.toObject(), user: foundUser });
            } else {
              newPosts.push({ ...post.toObject(), user: foundUser });
            }
          }
        }
      }
    });
    res.status(200).json(newPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addPost = async (req, res) => {
  const { email, post_message } = req.body;
  const newPost = new Post({ email, post_message });
  await newPost.save();
  res.status(201).json({ message: "Post created successfully", post: newPost });
};

export const addPostWithImage = async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    const { email, post_message } = req.body;
    const newPost = new Post({ email, img: image.secure_url, post_message });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error uploading image", error: err.message });
  }
};
