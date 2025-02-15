import {asyncHandler}  from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { user } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
const registerUser = asyncHandler( async(req,res)=>{
    const {fullName,Email, UserName, password}=req.body
    console.log("Email: ",Email,"\n","password: ",password);
    if([fullName,Email, UserName, password].some((field)=>
    field?.trim() === "")
){
    throw new ApiError(400,"all fields are required");
    
}
    const existedUser = await user.findOne({
        $or: [{UserName},{Email}]
    })
    if(existedUser) {
        throw new ApiError(409,"UserName or Email already exists")
        
    }
    const avatarLocalPath = await req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = await req.files?.coverImage?.[0]?.path;
    console.log(avatarLocalPath);
    
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar File 1 is required")
    }
    const avatar = await UploadOnCloudinary(avatarLocalPath)
    const coverImage = await UploadOnCloudinary(coverImageLocalPath)
    let coverImageurl = "";
    if(coverImage?.url){
        coverImageurl = coverImage.url

    }
    if(!avatar){
        throw new ApiError(400,"Avatar File 2 is Required")
    }
    const newuser = await user.create({
        fullName,
        avatar : avatar.url,
        coverImage: coverImageurl,
        Email,
        password,
        UserName: UserName.toLowerCase()

    })
    .then (console.log("user created"));
    const createdUser = await user.findById(newuser._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered succesfully")
    )

})
export {registerUser};

//logic
//take input UserName Email fullname avatar password
//check whether UserName and Email are unique and avatar password is there
//remove password and refreshToken field from response
//upload the info to mongodb once the conditions are met
//once it is uploaded take the avatar link and use multer to to upload to cloudinary allong with storing a local copy
//once all stuff are done route to login page
 