import express from "express";
import { verifyUser } from "./fetchData.js";
import Profile from "../../models/Profile.model.js";
import cors from "cors";
import FollowersDB from "../../models/Followers.model.js";

const FollowerMethod = express.Router();
FollowerMethod.use(cors());

FollowerMethod.get(
  "/api/users/profile/follow",
  verifyUser,
  async (req, res) => {
    try {
      const follower = req.user._id;
      const following = req.query.followUser;
      if (follower === following) {
        return res.status(400).send({ message: "Can't follow yourself" });
      }

      if (!follower) {
        return res.status(400).send({ message: "Follower ID is missing" });
      }

      if (!following) {
        return res.status(400).send({ message: "Following ID is missing" });
      }

      const follow = await FollowersDB.findOne({
        IFollower: follower,
        IFollowing: following,
      });

      if (follow) {
        return res.status(200).send({ message: "Already following" });
      } else {
        const newFollow = new FollowersDB({
          IFollower: follower,
          IFollowing: following,
        });
        await newFollow.save();
        const filter = { userid: follower };
        const updateOperation = { $inc: { Followers: 1 } };

        Profile.updateOne(filter, updateOperation)
          .then((result) => {
            if (result.nModified > 0) {
              console.log("Update successful:", result);
            } else {
              console.log("No document matched the filter.");
            }
          })
          .catch((error) => {
            console.error("Update failed:", error);
          });

        return res.status(201).send({ message: "Followed successfully" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

export default FollowerMethod;
