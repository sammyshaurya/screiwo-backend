import express from "express";
import User from "../../models/User.model.js";
import cors from "cors";

const verifyUser = express.Router();
verifyUser.use(cors());

verifyUser.get('/api/verify-token', async (req, res) => {
    const token = req.body.token || req.query.token || req.headers.authorization || req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).send("Access denied. No token provided.");
    else {
      const user = await User.findOne({ token: token })
        if (user) {
        return res.send({valid: true, message: "Validated User."});}
        else {
          res.send({valid: false, message: "Invalid User."});
        }
    }
  });
  export default verifyUser;