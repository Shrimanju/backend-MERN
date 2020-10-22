//init code
const mongoose = require('mongoose')
//user schema
const issuesSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true

    },
    priority: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
        // default: true
    },


    status: {
        type: String,
        // default:actvr
        default: true

    },


    created_by: {
        type: String,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

});
//user model
mongoose.model('issues', issuesSchema);

//export module
module.exports = mongoose.model('issues');
