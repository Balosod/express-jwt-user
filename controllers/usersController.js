import { validateUser,User } from '../models/userModel.js';
import bcrypt from 'bcrypt'


export async function register(req,res){
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
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
}

export async function login(req,res){
    try{
        const {email, password} = req.body;

        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid Email or Password"});
        }

        bcrypt.compare(password, user.password,(err, result)=>{
            if (result){
                const token = user.generateAccessToken()
                return res.status(200).json({token:token});
            }
            console.log(err);
            return res.status(401).json({message:"Invalid Email or Password"});
        })
   } catch (err) {
    res.status(401).send(err.message);
   }
}