const express = require('express');
const {validationResult, body} = require('express-validator');
const validate = require('./middle');

const bcrypt = require('bcrypt');

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Word');
});

app.post('/',
    validate([body('username').notEmpty().withMessage('username is require').isLength({min: 5}).withMessage('5 characters long'), body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email invalid')])
    // checkSchema({
    //     username: {
    //         notEmpty: {
    //             errorMessage: "username is required",
    //             bail: true
    //         },
    //         isLength: {
    //             options: {min: 5},
    //             errorMessage: "username is to short",
    //         },
    //     },
    //     email: {
    //         notEmpty: {
    //             errorMessage: "email is required",
    //             bail: true
    //         },
    //         isEmail: {
    //             errorMessage: "invalid Email"
    //         },
    //         custom: {
    //             options: (value, {req, location, path}) => {
    //                 if (value !== 'user@user.com') {
    //                     console.log(value);
    //                     console.log(req);
    //                     console.log(location);
    //                     console.log(path);
    //                     throw new Error('Email is not valid')
    //                 };
    //                 return true;
    //             }
    //         }
    //     }
    // })
, (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()})
    }
    res.send('done post rest');
});

const randomString = 'username';
const some = 'jjjsje'
const saltRound = 0

let hashed;
bcrypt.genSalt(saltRound, (err, salt) => {
    if (err) {
        throw err;
    };
    console.log('salt', salt);
    bcrypt.hash(randomString, salt, (err, hash) => {
        if (err) {
            throw err;
        };
        console.log('hash', hash);
        bcrypt.compare(hash, (err, result) => {
            if (err) {
                console.log('compare error', err);
                throw err;
            };
            console.log(result);
        })

    })
});

console.log(hashed);



app.listen(5000, () => console.log('server port: 5000'));