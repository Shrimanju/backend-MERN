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
        default: true
    },
    // username: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },

    created_by: {
        type: String,
        default: true
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
        default: true
    }

});
//user model
mongoose.model('users', userSchema);

//export module
module.exports = mongoose.model('users');
