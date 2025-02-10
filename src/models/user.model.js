import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    UserName : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index: true,

    },
    Email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        

    },
    FullName : {
        type : String,
        required : true,
        trim : true,
        index: true,

    },
    avatar : {
        type : String, // cloudinary url
        required : true
    },
    coverImage : {
        type : String,
    },
    watchHistory : [{
        type : mongoose.Schema.ObjectId,
        ref : "video"


    }],
    password : {
        type : String,
        required : [true,"the password is required"]
    },
    refreshToken : {
        type : String,
    }
},
{
    timestamps : true,
})
export const user = mongoose.model("user",userSchema)