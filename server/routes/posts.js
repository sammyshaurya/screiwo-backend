import express from "express";
import cors from "cors";
import Profile from '../../models/Profile.model.js';
import {verifyUser} from './fetchData.js';

const posts = express.Router();
posts.use(cors());

// Fetch posts of the logged in user
posts.get('/api/user/allposts', verifyUser, async (req, res) => {
  const userId = req.user._id;

  try {
      const profile = await Profile.findOne({ userid: userId });
      
      if (!profile) {
          return res.status(404).json({ error: "Profile not found" });
      }

      const userPosts = profile.posts;
      
      res.status(200).json(userPosts);
  } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// fetch any users profile posts

posts.get("/api/screiwousersprofilepost", async (req, res) => {
  try {
    const userId = req.query.userid;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const profile = await Profile.findOne({ userid: userId });
    
    if (!profile) {
      return res.status(404).send({ message: "Profile not found" });
    }

    const userPosts = profile.posts;

    res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error searching for user profile posts:', error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Create a new post by logged in user
posts.post("/api/users/createpost", verifyUser, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }

  try {
    const profile = await Profile.findOne({ userid: req.user._id });
    
    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    // Create the new post
    const newPost = {
      userid: req.user._id,
      title: title,
      content: content,
      createdAt: new Date(),
    };

    profile.posts.push(newPost);

    await profile.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default posts;
