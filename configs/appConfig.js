import dotenv from 'dotenv';
dotenv.config()

export const config = {
    secret: {
        signingKey: process.env.TOKEN_SECRET,
    }
   };