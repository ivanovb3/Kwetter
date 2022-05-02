import mongoose from "mongoose";

const userOrganizationsSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['USER', 'MODERATOR', 'ADMIN'],
        default: 'USER'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

const UserOrganizations = mongoose.model('UserOrganizations', userOrganizationsSchema);

export { UserOrganizations };
