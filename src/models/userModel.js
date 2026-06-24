import mongoose from 'mongoose';

const ageValidator = function (value) {
    return value >= 18 && value <= 100;
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: ageValidator,
            message: 'Age must be between 18 and 100'
        }
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true,
});

// Create model from schema
const UserModel = mongoose.model('User', userSchema);

export default UserModel;