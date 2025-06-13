const mongoose = require("mongoose");

const emailRegexPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: [true, "Please enter first name"],
      minlength:[3,"First name must be at least 3 character long!"],
      trim: true,
      unique: false,
    },
    lastname: {
      type: String,
      minlength:[3,"First name must be at least 3 character long!"],
      trim: true,
      unique: false,
    },
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: {
      validator: function (value) {
        return emailRegexPattern.test(value);
      },
      message: "please enter a valid email",
    },
    unique: true,
    minlength:[5,"Email must be at least 5 character long!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"], 
    select:false
  },
  socketId:{
    type:String,
  }
});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"1d" });
    return token;
}

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword=async function (password) {
    return await bcrypt.hash(password,10); 
}

const User = mongoose.models.user || mongoose.model("User", userSchema);

module.exports=User;
