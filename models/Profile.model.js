import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postcount: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  commentscount: {
    type: Number,
    default: 0,
  },
  saves: {
    type: Number,
    default: 0,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
});

const ProfileSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Followers: {
    type: Number,
    default: 0,
  },
  Followings: {
    type: Number,
    default: 0,
  },
  Posts: {
    type: Number,
    default: 0,
  },
  Bio: {
    type: String,
    default: "I am using Screiwo",
  },
  dob: {
    type: String,
    required: true,
  },
  profileType: {
    type: String,
    required: true,
  },
  postCount: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  posts: {
    type: [PostSchema],
    default: [],
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);
const Posts = mongoose.model("Posts", PostSchema);

export { Profile, Posts };
export default Profile;
