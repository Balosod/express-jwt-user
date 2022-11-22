import dotenv from 'dotenv';
dotenv.config()

export const config = {
   
    db: {
      host: process.env.HOST,
      name: process.env.NAME
    }
   };