import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_BUCKET_REGION
})

const upload = () => multer({
    storage: multerS3({
        s3: s3,
        bucket: "kwetter-profile-pic",
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb) {
            cb(null, `image-${Date.now()}.jpeg`)
        }
    })
})

const uploadProfilePic = (req, res, next) => {
    const uploadSingle = upload().single('image-upload')

    uploadSingle(req, res, async(err) => {
        if(err) 
            return res.status(400).json({success: false, message: err.message})
        
        console.log(req.files)

        return req.files.location

        // res.status(200).send(req.file)

    })
}

export {uploadProfilePic};