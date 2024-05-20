import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is a required field"],
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        required:[true,"Email is a required field"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ],
        unique:true

    },
    password:{
        type:String,
        required: [true, "Please provide password"],
        minLength: 6,
    }
});

userSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.createJwt = function(){
    const jwt_string =  "123123123asdfhasdfhaklh3892";

    return jwt.sign({userId:this._id,name:this.name},jwt_string,{
        expiresIn:"30d",
    });
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}

const Users = mongoose.model("Users",userSchema);

export default Users;


