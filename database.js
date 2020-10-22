//INIT CODE
// require('dotenv').config();
const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL;

//mongoose connect

mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },

    function (error, link) {
        assert.equal(error, null, "DB connect fail...");//check error
        console.log("DB Connect successfully");
        // console.link(link);
    }

);