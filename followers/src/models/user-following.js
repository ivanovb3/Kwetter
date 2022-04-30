import mongoose from "mongoose";
import { followerSchema } from "./follower.js";

const userFollowersSchema = new mongoose.Schema({
    following:
        [
            {
                userId: {
                    type: String,
                    required: true
                }
            }],
    followers:
        [
            {
                userId: {
                    type: String,
                    required: true
                }
            }
        ]
    // following: [followerSchema],   //reactSchema    //{userId: String, required: true}
    // followers: [followerSchema]
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

const UserFollowers = mongoose.model('UserFollowers', userFollowersSchema);

export { UserFollowers };
