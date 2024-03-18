import multer, { diskStorage } from "multer";
import sharp from "sharp";
import { join } from "path";
import { unlinkSync } from "fs";

const multerStorage = diskStorage({
    destination:function(req,file,cb){
        cb(null, join(__dirname, "../public/images"));
    },
    filename:function(req,file,cb){
        const suffix = Date.now()+"-"+Math.round(Math.random()*1e9);
        cb(null,file.fieldname+"-"+suffix+".jpeg");
    }
});

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb({
            message:"Unsupported file format"
        },false);
    }
};

export const uploadPhoto = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
    limits:{fieldNameSize:2000000}
})

export const productImageResize = async(req,res,next)=>{
    if(!req.files) return next();
    await Promise.all(req.files.map(async(file)=>{
        await sharp(file.path).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`public/images/products/${file.filename}`);
        unlinkSync(`public/images/products/${file.filename}`);
    }));
    next();
};

export const blogsImageResize = async(req,res,next)=>{
    if(!req.files) return next();
    await Promise.all(req.files.map(async(file)=>{
        await sharp(file.path).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`public/images/blogs/${file.filename}`);
        unlinkSync(`public/images/blogs/${file.filename}`);
    }));
    next();
};

// export default { uploadPhoto, blogsImageResize, productImageResize }