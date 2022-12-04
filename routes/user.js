const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = require('../models/user')

const generateToken = (id) => {
    return jwt.sign({ id }, "secret-key", {expiresIn: "30d"});
};

router.route('/create').post(async (req,res)=>{
    const password = req.body.password;
    const email = req.body.email;

    const user = await users.findOne({email: email})
    if (user){
        res.status(400).json({message: "User already exists" })
    }
    const new_user = await new users({password: password, email: email});
    new_user.save().then(() => res.send("Added")).catch((error) => res.send(error));
})


router.route('/login').post(async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await users.findOne({email: email, password:password});
    if (user){
        res.json({_id: user._id, email: user.email, password: user.password, token: generateToken(user._id)});
    }
    else{
        res.status(400).json({message: "Incorrect email or password"});
    }
    
})

module.exports = router;
