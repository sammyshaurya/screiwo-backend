import User from "../../models/User.model.js";
import Profile from "../../models/Profile.model.js";

const verifyUser = async (req, res, next) => {
    try {
        let token = req.body.token || req.headers.authorization || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        
        if (!token) {
            return res.status(401).send("Access denied. No token provided.");
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(401).send({ message: "Invalid User.", valid: false });
        }
        const { password, ...userData } = user.toObject();
        req.user = userData;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

// Returning signed in user profile
const userProfile = async (req,res,next) => {
    try {
        let token = req.body.token || req.headers.authorization || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        
        if (!token) {
            return res.status(401).send("Access denied. No token provided.");
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(401).send({ message: "Invalid User.", valid: false });
        }

        const profile = await Profile.findOne({ userid: user._id });

        if (!profile) {
            return res.status(401).send({ message: "Invalid User.", valid: false });
        }
        
        req.profile = profile;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}


export { verifyUser, userProfile };
