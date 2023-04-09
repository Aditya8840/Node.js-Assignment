const { text } = require("express");
const mongoose = require("mongoose")



//Transaction Schema
const transactionSchema = new mongoose.Schema({
    text: {type: String, required: [true, "Please enter some text"]},
    amount: {type: Number, required: [true, "Please enter some postive or negative value"]}
});



//User Schema
const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, default: "null"},
        username: {type: String, required : true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profilepic: {type: String, default: "null"}, //base64
        transactions: [transactionSchema],
        isAdmin: { type: Boolean, default: false},
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);