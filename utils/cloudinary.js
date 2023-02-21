const cloudinary = require("cloudinary")
// Configuration 
cloudinary.config({
    cloud_name: "dgfbwiqat",
    api_key: "985579189212356",
    api_secret: "1T0SB7m9HWCnstr781Wt4iYkmEY"
});

const cloudinaryUploading = async(fileToUploads)=>{
    return new Promise((resolve)=>{
        cloudinary.uploader.upload(fileToUploads,(result)=>{
            resolve({url:result.secure_url},{resource_type:"auto"});
        });
    });
};

module.exports = cloudinaryUploading;