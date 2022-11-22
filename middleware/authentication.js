import  jwt from 'jsonwebtoken'
import { config } from '../configs/appConfig.js';

const {secret:{signingKey}} = config

export function authenticatedToken(req,res, next){
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message:"Token can't be empty"})

    jwt.verify(token, signingKey, (err,user) => {
        if (err) return res.status(403).json({message:"Invalid Token"})
        req.user = user

        next()
    })
}