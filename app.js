
const dotenv=require('dotenv');
dotenv.config();


const express=require('express');
const app=express();

const cors=require('cors');
const connectDB = require('./utils/db');
const userRouter = require('./routes/user.route');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/api/user',userRouter);

module.exports=app;