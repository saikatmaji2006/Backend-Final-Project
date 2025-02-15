import {asyncHandler}  from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { user } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
const registerUser = asyncHandler( async(req,res)=>{
    const {fullName,email, username, password}=req.body
    console.log("email: ",email,"\n","password: ",password);
    if([fullName,email, username, password].some((field)=>
    field?.trim() === "")
){
    throw new ApiError(400,"all fields are required");
    
}
    const existedUser = user.findOne({
        $or: [{username},{email}]
    })
    if(existedUser) {
        throw new ApiError(409,"username or email already exists")
        
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar File is required")
    }
    const avatar = await UploadOnCloudinary(avatarLocalPath)
    const coverImage = await UploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar File is Required")
    }
    await user.create({
        fullName,
        avatar : avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowercase()

    })
    const createdUser = await user.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering please try again later")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered succesfully")
    )

})
export {registerUser};

//logic
//take input username email fullname avatar password
//check whether username and email are unique and avatar password is there
//remove password and refreshToken field from response
//upload the info to mongodb once the conditions are met
//once it is uploaded take the avatar link and use multer to to upload to cloudinary allong with storing a local copy
//once all stuff are done route to login page
 