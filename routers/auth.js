const User = require("../models/User")
const router = require("express").Router()
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")



//Register User
router.post("/register", async (req, res) => {
    console.log(req.body.name)
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_CRYPTO).toString(),
        profilepic: req.body.profilepic
    })
    try{
        const savedUser = await newUser.save()
        console.log(savedUser)
        const {password, ...others} = savedUser._doc
        res.status(201).json(others)
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})


//Login User
router.post("/login", async (req,res) =>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user){
            return res.status(401).json("Wrong Credentials");
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_CRYPTO)
        const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        if(userPassword != req.body.password){
            return res.status(401).json("Wrong Credentials");
        }

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET, {expiresIn: '3d'})
        res.status(200).json(accessToken);
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router