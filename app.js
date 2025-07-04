
const dotenv=require('dotenv');
dotenv.config();


const express=require('express');
const app=express();

const cookieParser = require('cookie-parser');

const cors=require('cors');
const connectDB = require('./utils/db');
const userRouter = require('./routes/user.route');
const captainRouter = require('./routes/captain.route');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use('/api/user',userRouter);
app.use('/api/captain',captainRouter);

module.exports=app;