const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Routes
router.get('/', (req, res) => {
    res.render('login.njk');
});

router.post('/login', [
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'A valued email address is required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    check('password', 'Password is required').notEmpty(),
    check('password', 'Password needs to match confirm password').custom((value, { req }) => value === req.body.password),
    check('password', 'Password must be between 8 and 255 characters long').isLength({min:8, max: 255}),
    check('password', 'Password must have at least one number').matches(/\d/),
    check('password', 'Password must have at least one special character').matches(/[\W_]/),
    check('confirmPassword', 'Confirm password is required').notEmpty()
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('login.njk', {
            value: req.body,
            errors: errors.array(),
            errorTitle: "Error:"
        });
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const timeStamp = new Date().toISOString();

    // Login go to server to log in
    // res.render('welcome.njk', {
    //     value: req.body,
    //     serverMessage: {
    //         message: 'Successful login',
    //         data: {
    //             firstName,
    //             lastName,
    //             email,
    //             password,
    //             confirmPassword,
    //             timeStamp
    //         }}
    // });
    console.log( {serverMessage: {
        message: 'Successful login',
            data: {
            firstName,
                lastName,
                email,
                password,
                confirmPassword,
                timeStamp
        }}});
    // const { firstName, lastName, email, password, confirmPassword } = req.body;
    // res.redirect('/welcome?firstName=${encodeURIComponent(firstName)}&email=${encodeURIComponent(email)}');
    res.redirect( `/welcome?firstName=${firstName}&lastName=${lastName}`);
});

router.get('/welcome', (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const timeStamp = new Date().toISOString();
    res.render('welcome.njk', {
        value: req.query,
        serverMessage: {
            message: 'Successful login',
            data: {
                firstName,
                lastName,
                timeStamp
            }}
    });
});

module.exports = router;
