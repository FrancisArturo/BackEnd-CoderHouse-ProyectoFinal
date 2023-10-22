import multer from "multer";
import __dirname from "../dirname.js";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        switch (req.route.path) {
            case "/session/users/:uid/documents":
                cb(null, __dirname+"/public/uploads/documents");
                break;
            case "/session/:uid/profile":
                cb(null, __dirname+"/public/uploads/profiles");
                break;
            case "/api/v1/products/:pid":
                cb(null, __dirname+"/public/uploads/products");
                break;
            default:
                break;
        }
    },
    filename: function(req,file,cb) {
        cb(null,file.originalname)
    }
});

export const uploader = multer({storage});