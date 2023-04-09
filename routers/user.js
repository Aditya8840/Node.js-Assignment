const { verifyTokenAndAuth } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const router = require("express").Router()


//Change Password
router.put("/:id", verifyTokenAndAuth, async (req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_CRYPTO).toString()
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updateUser)
    }catch(err){
        res.status(500).json(err)
    }
})

//Change Name
router.put("/name/:id", verifyTokenAndAuth, async (req, res)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updateUser)
    }catch(err){
        res.status(500).json(err)
    }
})


// Change profile pic in base64 string
router.post("/profilepic/:id", verifyTokenAndAuth, async (req, res)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updateUser)
    }catch(err){
        res.status(500).json(err)
    }
})


// delete user
router.delete("/:id", verifyTokenAndAuth, async (req, res)=>{
    try{
        const updateUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({"message":"User Deleted Sucessfully"})
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router;