
const express=require('express');
const userRouter=express.Router();

const { body} =require("express-validator");
const { register } = require('../controllers/user.controller');

userRouter.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be 3 character long!'),
    body('password').isLength({min:6}).withMessage('Password must be 6 character long!'),
],register)

module.exports=userRouter;