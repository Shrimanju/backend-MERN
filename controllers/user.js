// const router = require('express').Router();
const express = require('express')

const router = express.Router()
const bodyParser = require('body-parser');;
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('./../models/user');
const { json } = require('body-parser');


const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir('.uploads/', (err) => {
            cb(null, '.uploads/');
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});




const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
// const another


//middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


//routes goes here
router.all(
    '/',
    function (req, res) {
        return res.json({
            status: true,
            message: 'User controller'
        });
    }
);

//create new user route
router.post(
    '/createnew', upload.single('productImage'),
    [
        //check not empty field
        check('firstname').not().isEmpty().trim().escape(),
        // check('username').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail()

    ],
    function (req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: 'form validation fail',
                errors: errors.array()
            });
        }
        // //o/p of the use
        User.create(
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                created_by: req.body.created_by,
                title: req.body.title,
                profileImage: req.file.path

            },
            function (error, result) {
                //error check
                if (error) {
                    return res.json({
                        status: false,
                        message: "DB Insert fail.",
                        error: error
                    });
                }
                return res.json(
                    {
                        status: true,
                        message: "DB Inserted..",
                        result: result
                    }
                );

            }

        );


    }
);
//list of users
router.get(
    '/find',
    function (req, res) {
        //find user
        User.find(function (error, result) {
            //error check
            if (error) {
                return res.json({
                    status: false,
                    message: "DB failed",
                    error: error
                });
            }
            //no error
            return res.json({
                status: true,
                message: "DB Success",
                result: result
            });
        });

    }
);

//find details using username
router.get(
    '/find/:firstname',
    function (req, res) {
        //find user
        User.find({ firstname: req.params.firstname }, function (error, result) {
            //error check
            if (error) {
                return res.json({
                    status: false,
                    message: "DB failed",
                    error: error
                });
            }
            //no error
            return res.json({
                status: true,
                message: "DB Success",
                result: result
            });
        });

    }
);


//update user data
router.put(
    '/update/:email',
    function (req, res) {
        //check email currect or not 
        if (req.params.email) {
            //update user document
            User.update(
                { email: req.params.email },
                { firstname: 'jonyyy' },
                function (error, result) {
                    //check user document
                    if (error) {
                        return res.json(
                            {
                                status: false,
                                message: "DB update fail",
                                error: error
                            }
                        );
                    }
                    //everything currect
                    return res.json(
                        {
                            status: true,
                            message: "DB update successfully",
                            result: result
                        }
                    );
                }
            );
            //if email not availabe
        } else {
            return res.json({
                status: false,
                message: 'email not provided'
            }

            );
        }

    }
);
//delete the file
router.delete(
    '/remove/:firstname',
    function (req, res) {
        //check firstname currect or not 
        if (req.params.firstname) {
            //update user document
            User.remove(
                { firstname: req.params.firstname },

                function (error, result) {
                    //check user document
                    if (error) {
                        return res.json(
                            {
                                status: false,
                                message: "DB deleted fail",
                                error: error
                            }
                        );
                    }
                    //everything currect
                    return res.json(
                        {
                            status: true,
                            message: "DB deleted successfully",
                            result: result
                        }
                    );
                }
            );
            //if firstname not availabe
        } else {
            return res.json({
                status: false,
                message: 'firstname not provided'
            }

            );
        }

    }
);


module.exports = router;
