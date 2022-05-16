import mongoose from "mongoose";
import { Encrypt } from "../services/encrypt.js";
import { Password } from "../services/password.js";

const userSchema = new mongoose.Schema({
    email: {
        type: Object,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(_doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    if(this.isModified('email')){
        const encrypted = Encrypt.encrypt(this.get('email'));
        this.set('email', encrypted)
        //this.get('email')
    }
    

    done();
})

const User = mongoose.model('User', userSchema);

export { User };
