import mongoose from "mongoose";

const reactSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

const React = mongoose.model('React', reactSchema);

export { React, reactSchema };
