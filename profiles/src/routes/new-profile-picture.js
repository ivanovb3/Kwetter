import express from 'express'
import { requireAuth, validateRequest, Publisher } from '@rikwetter/common';
import { body } from 'express-validator'
import { UserProfile } from '../models/user-profile.js';

import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_BUCKET_REGION
})

const upload = () =>  multer({
    storage: multerS3({
        s3: s3,
        // acl:'public-read',
        bucket: "kwetter-profile-pic",
        metadata: function(req, file, cb) {          
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb) {
            console.log(file);
            cb(null, `${file.originalname}-${Date.now()}.jpeg`)
        }
    })
})

const router = express.Router();

router.post('/api/profiles/picture', requireAuth, async (req, res) => {

    const uploadSingle = upload().single('image');

    uploadSingle(req, res, async(err) => {
        if(err) 
            return res.status(400).json({success: false, message: err.message})
        
        console.log(req.file)

        const user = await UserProfile.findById(req.currentUser.id);

        user.pictureURL = req.file.location;

        await user.save();

        return res.status(201).send(req.file.location)
    })
});

export { router as uploadPictureRouter }