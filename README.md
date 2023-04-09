# Finance Management Restful API for farmer

Description: 
Base url: https://finance.aditya8840.repl.co/

```
npm install
node app.js
```

Endpoints
```
/api/auth/register  Register User
/api/auth/login     Login User
/api/user/:id       Change Password
/api/user/name/:id  Change Users name
/api/profilepic/:id Change Profile Picture with base64 String
/api/transaction/add Add income and expense
/api/transaction/summary Get Balance Sheet
```


User Schema
```
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
```
