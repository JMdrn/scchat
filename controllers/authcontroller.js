const userService = require('../services/userService');
const { handleError } = require('../helper/authHandleError');
const User = require('../models/user');



module.exports.signup_post = async (req, res) => {

    // console.log(req.body);
    const {
        username,
        password
    } = req.body;

    userService.createUser(username, password).then(({user, token, maxAge}) => {
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})
            
            // console.log('user ->> ', user);
            // console.log('obj destruc user ->>', {user})
            
            
            //override the full user object with just the id
            //send user id back to compare against jwt.
            res.status(203).json({user: user._id});

        })
        .catch(err => {
            // console.log(err);
           const errors = handleError(err);
            res.status(400).json({ errors });
        });
    // res.send('signup hit');
}



module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;

    try {

        const {user, token} = await User.login(username, password);

        res.cookie('jwt', token, {maxAge: 28800000}) ; //token is undefined here - fix?
        

        res.status(200).json({user: user._id})
    }
    catch(err) {

    
        const errors = handleError(err);

        // console.log('2nd err = ' +  Object.values(errors))

        res.status(400).json({
            errors
        });
    }
}



module.exports.vippage_get = (req, res) => {

    //if you can get here you are past the auth :)

    res.render('vippage');
    // res.send('VIP hit !!');
}


// I think...
// 
// 
// 
// 
// craete services folder
//send upload details to that.



