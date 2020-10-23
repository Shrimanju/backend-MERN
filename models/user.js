//init code
const mongoose = require('mongoose')
//user schema
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true

    },
    lastname: {
        type: String,

    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    created_by: {
        type: String,

    },


    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,

    },
    profileImage: {
        type: String,

    }

});
//user model
mongoose.model('users', userSchema);

//export module
module.exports = mongoose.model('users');
