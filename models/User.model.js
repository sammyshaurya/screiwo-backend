import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    createdAt: { type: Date, default: Date.now },
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, required: true, minlength: 3 },
    isVerified: { type: Boolean, default: false },
    token: { type: String, required: false },
});

const User = mongoose.model('User', UserSchema);

export default User;