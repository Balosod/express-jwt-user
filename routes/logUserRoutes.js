import express from 'express'
import  {authenticatedToken } from '../middleware/authentication.js';
import { logUser } from '../controllers/logUserData.js';


export const logUserDateRouter = express.Router();

logUserDateRouter.get('/protected', authenticatedToken, logUser)