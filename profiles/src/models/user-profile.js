import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    name: {
        type: String
    },
    bio: {
        type: String
    },
    pictureURL: {
        type: String
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export { UserProfile };
