import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'
import Router from './routes/routes.js'
import posts from './routes/posts.js'
import verifyUser from './routes/verifyUser.js'
import follows from './routes/follows.js'

const App = express();

// Apply middleware
App.use(express.json());
App.use(cors());
App.use(Router)
App.use(verifyUser)
App.use(posts)
App.use(follows);

// Connect to the database
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
};


// Start the server after database connection
connectdb().then(() => {
    App.listen(3000, () => {
        console.log("Server started on port 3000");
    });
});
