import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import pkg from 'validator';
import { config } from '../configs/appConfig.js';

const {isEmail} = pkg;
const {secret:{signingKey}} = config

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Email is required'],
        validate:{
            validator: isEmail,
            message: props => `${props.value} is not a valid email`
        }
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        validate:{
            validator: function (v) {
                return v.length >= 6
            },
            message: ()=> 'Password must be a least six characters long'
        }
    }
})

userSchema.methods.generateAccessToken = function(){
    const token = jwt.sign({email:this.email}, signingKey, { expiresIn: '1800s' });
    return token
}

export const User = mongoose.model('User', userSchema);


export function validateUser(data) {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    return schema.validate(data);
  }
