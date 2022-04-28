import mongoose from "mongoose";
//import { reactSchema } from "./react.js";

const tweetSchema = new mongoose.Schema({
    reacts: []   //reactSchema    //{userId: String, required: true}
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

export { Tweet };
