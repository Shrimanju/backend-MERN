// const router = require('express').Router();
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');;
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const Issues = require('./../models/issues');
const { json } = require('body-parser');
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
            message: 'User controllers'
        });
    }
);

//create new user route
router.post(
    '/newissues',
    [
        //check not empty field
        check('title').not().isEmpty().trim().escape(),
        check('id').not().isEmpty().trim().escape(),
        check('description').not().trim().escape(),
        // check('username').not().isEmpty().trim().escape(),
        check('created_by').not().isEmpty().trim().escape(),
        check('priority').not().isEmpty().trim().escape()

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

        //store in database
        Issues.create(
            {
                title: req.body.title,
                id: req.body.id,
                description: req.body.description,
                // username: req.body.username,
                priority: req.body.priority,
                created_by: req.body.created_by

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
    '/findissues',
    function (req, res) {
        //find user
        Issues.find(function (error, result) {
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
    '/findissues/:id',
    function (req, res) {
        //find user
        Issues.find({ id: req.params.id }, function (error, result) {
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
    '/updateissues/:id',
    function (req, res) {
        //check email currect or not 
        if (req.params.id) {
            //update user document
            Issues.update(
                { id: req.params.id },
                { title: 'jonyyy' },
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
    '/remove/:id',
    function (req, res) {
        //check firstname currect or not 
        if (req.params.id) {
            //update user document
            Issues.remove(
                { id: req.params.id },

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