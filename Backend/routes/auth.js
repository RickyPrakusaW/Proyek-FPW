const express = require('express');
const jwt = require('jsonwebtoken')
const router = express();
const {OAuth2Client} = require("google-auth-library");
const dotenv = require('dotenv');
dotenv.config();

// const User = require('../models/user.model')

const redirectUrl = 'http://localhost:3000/api/auth/google/callback';
const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
);

router.post('/google/request', async(req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ]

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent'
    });
    res.json({url: authorizeUrl})
})

async function getUserData(access_token){
    try{
        const getResponse = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const data = await getResponse.json();
        return data
    }
    catch (e){
        console.log(e)
    }
}

async function userCheck(email) {
    try {
        const valid = await User.findOne({ email });

        // Return true if valid user is found, otherwise false
        return valid !== null;
    } catch (e) {
        console.error("Error while checking user:", e);
        return false; // Handle gracefully in case of error
    }
}


router.get('/google/callback', async(req, res) => {
    const code = req.query.code;
    try{
        const resp = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(resp.tokens);
        const user = oAuth2Client.credentials;
        const getData = await getUserData(user.access_token);
        // console.log(getData)
        // const userExist = await userCheck(getData.email)
        // if(!userExist){
        //     const newUser = new User({
        //         fullName: getData.name,
        //         frontName: getData.given_name,
        //         email: getData.email,
        //         picture: getData.picture
        //     });
        //     const savedUser = await newUser.save();
        // }

        // const token = jwt.sign(
        //     { getData },
        //     process.env.JWT_SECRET,
        //     { expiresIn: '3h'}
        // );
        // res.cookie('auth_token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 10800000
        // });
        res.redirect('http://localhost:5173');
    }
    catch(e){
        console.log('Error with signing in with Google, ' + e)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router