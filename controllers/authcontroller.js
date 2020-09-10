var userService = require('../services/userService');
var { handleError } = require('../helper/authHandleError');


module.exports.signup_post = async (req, res) => {

    console.log(req.body);
    const {
        username,
        password
    } = req.body;

    userService.createUser(username, password).then(({user, token, maxAge}) => {
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})
        
            res.status(203).json({user: user._id});

        })
        .catch(err => {
            // console.log(err);
           const errors = handleError(err);
            
            res.status(400).json({ errors });
        });
    // res.send('signup hit');
}



module.exports.login_post = (req, res) => {

    console.log(req.body);

    res.send('signup hit');
}



module.exports.vippage_get = (req, res) => {

    console.log(req.body);


    res.send('VIP hit');
}


// I think...
// 
// 
// 
// 
// craete services folder
//send upload details to that.