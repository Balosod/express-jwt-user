import express from 'express'
import { register,login } from '../controllers/usersController.js';

//console.log(require('crypto').randomBytes(64).toString('hex'))

export const registerRouter = express.Router();

registerRouter.post('/sign-up',register);

registerRouter.post('/sign-in',login)


