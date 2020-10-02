const jwt = require('jsonwebtoken');
const e = require('express');
const {secret} = require('../secretconfig.json')

//inside express router middleware we get access to req res :) - check jwt
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check token is valid
    if(!token){
        res.redirect('/login');
    } 
    else {
        jwt.verify(token, secret, (err, decodedToken) => {
            err ? ( console.log(err), res.redirect('/login?error=denied"') ) : ( console.log('decoded string -> ', decodedToken), next() );
        })
    }
    
}

module.exports = { requireAuth };