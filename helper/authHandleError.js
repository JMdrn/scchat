module.exports.handleError = (e) => {
    console.log(e, ': error object');
    // console.log('here',e.message, e.code);
  

    let errors = { username: "", password: ""};

    //check for dups - mongo err code
    if(e.code === 11000){
        errors.username = 'Username already exists - sorry mate'
        return errors;
    }



    //validation errors
    if(e.message.includes('User validation failed')){
       Object.values(e.errors).forEach( ({properties} ) => {
            
            //properties.path provides either "username" or "password" here.
            errors[properties.path] = properties.message;
            // console.log(properties.message);
        });    
    }

    return errors;
}