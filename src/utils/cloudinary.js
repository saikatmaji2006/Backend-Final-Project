import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from "fs";
// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_API_KEY, 
    api_key: process.env.CLOUDINARY_API_SECRET, 
    api_secret: process.env.CLOUDINARY_CLOUD_NAME,// Click 'View API Keys' above to copy your API secret
});
//Upload
const UploadOnCloudinary = async (localFilePath)=>{
    try {
        if (!localFilePath) {
            console.log("could not find file path");
            return null;
        }
        await cloudinary.uploader.upload(
            localFilePath, {
                resource_type : 'auto'
            }
        )
        console.log("file is uploaded successfully",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;

    }

}
export {UploadOnCloudinary};