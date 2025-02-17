import {asyncHandler}  from "../utils/asyncHandler.js";
import { user } from "../models/user.model.js";
import { JsonWebTokenError as jwt } from "jsonwebtoken";

export const verifyJWT = asyncHandler( async(req,res,next)=>{
    //in web application we are already sending cookes in the user.controller.js
    //which is getting accesed by this middleware
    //but to make the code reusable for mobile application there is no system of cookie
    //instead the server sends a "Authorisation" header file where the token is stored
    //in this format Authorization: Bearer <token> thus we add or and replace bearer with "" to get the token only
    const token = await req.cookies?.accessToken || req.header("Authorisation")?.replace("Bearer ","")

    const Code = jwt.verify(token,document.env.ACCESS_TOKEN_SECRET,)
    user.findById()

})