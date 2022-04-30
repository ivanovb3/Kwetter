import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    reacts: []   //reactSchema    //{userId: String, required: true}
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

const Content = mongoose.model('Content', contentSchema);

export { Content };
