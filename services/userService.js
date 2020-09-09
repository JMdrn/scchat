const User = require('../models/user.js');

module.exports.createUser = async (username, password) => {
    try {
       const user = await User.create({
            username,
            password,
            'role': 'basic'
        })

        return user;
    }

    catch (e){
        throw e;
    }
}
