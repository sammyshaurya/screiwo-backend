import mongoose from "mongoose";

const { Schema } = mongoose;

const followerSchema = new Schema({
    IFollowing: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    IFollower: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdat: {
      type: Date,
      default: Date.now,
    },
  });

const FollowersDB = mongoose.model("Followers", followerSchema);
export default FollowersDB;