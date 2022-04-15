import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({});

const Tweet = mongoose.model('Tweet', tweetSchema);

export { Tweet };
