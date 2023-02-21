const UserModel=require('../model/userModel')
const jwt = require("jsonwebtoken");

class UserController{
    login = async (req, res) => {
        // 1. Validate user info
       
        // 2. Check email of user exists in db
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Email not exists in db");
        // 3. check password in database
        const loginPassword = await UserModel.findOne({ password: req.body.password });

        if (!loginPassword) return res.status(400).send("Password Incorrect");
        // 4. generated token string
        const token = jwt.sign({ id: user._id }, "chuoibimatkhongthetietlo");
        // 5. Return token for user
        res.header("auth-token", token).send(token);
        console.log("token for client:",token)
    };
}
module.exports = new UserController()