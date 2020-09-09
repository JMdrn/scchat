const mongoose = require('mongoose');
// const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [2, 'Username must be at least 2 characters']
        // validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter a password' ],
        minlength: [8, 'Password must be 8 characters long (smile)']
    },
    role: {
        type: String,
        required: true
    }

}, {timestamps: true});


//post method goes after hook (1st param, could be delete etc).
//first param is document that was saved to db.
userSchema.post('save', (doc, next) => {
    console.log('new user created. and saved', doc);
    next();
})

//pre is before hook - hash before send
// function used over arrow as we need this instance of user obj
userSchema.pre('save', async function(next) {
    console.log(this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})



const User = mongoose.model('User', userSchema);
module.exports = User;

