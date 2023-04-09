const { verifyTokenAndAuth, verifyToken } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const router = require("express").Router()


//Add Transaction
router.put("/add", verifyToken, async (req, res)=>{
    try{
        const transaction = {
            text: req.body.text,
            amount: req.body.amount
        }
        const updateUser = await User.findByIdAndUpdate(req.user.id, {$push: {transactions: transaction}}, {new:true})
        const {password, ...others} = updateUser._doc
        res.status(200).json({"message": "Sucessfully Updated"})
    }catch(err){
        res.status(500).json(err)
    }
})


//Balance Sheet
router.get("/summary", verifyToken, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id)
        res.status(200).json(user.transactions)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;