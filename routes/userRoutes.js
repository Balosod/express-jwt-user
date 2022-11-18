const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/authentication")
require("dotenv").config();

//console.log(require('crypto').randomBytes(64).toString('hex'))

const router = express.Router();

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }

router.post('/sign-up',async (req,res)=>{
    try{
        const {email,password}=req.body
        let userExists = await User.findOne({email});
        
        if (userExists){
            return res.status(401).json({message:"Email is aready in use;"});
        };

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds,(err,hash)=>{
            if (err) throw new Error("Internal Server Error");


            let user = new User({
                email,
                password:hash
            });

            user.save().then(()=>{
                res.json({message:"User successfully created", user});
            });
        });

    } catch (err) {
        return res.status(401).send(err.message);
    };
});

router.post('/sign-in',async(req,res)=>{

    try{
        const {email, password} = req.body;

        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid Email or Password"});
        }

        bcrypt.compare(password, user.password,(err, result)=>{
            if (result){
                const token = generateAccessToken({email:user.email})
                return res.status(200).json({token:token});
            }
            console.log(err);
            return res.status(401).json({message:"Invalid Email or Password"});
        })
   } catch (err) {
    res.status(401).send(err.message);
   }
})

router.get('/protected', auth, async (req,res)=>{
    console.log(req.user)
    return res.status(200).json({message:"You are allowed"})
})
module.exports = router;