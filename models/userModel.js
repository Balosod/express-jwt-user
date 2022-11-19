const mongoose = require('mongoose');
const Joi = require('joi');
const {isEmail} = require('validator');


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
function validateUser(data) {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    return schema.validate(data);
  }
exports.valid = validateUser
exports.User  = mongoose.model('User', userSchema);