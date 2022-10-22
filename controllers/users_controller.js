module.exports.users = function (req, res) {
    return res.render('users', {
        title: 'User'
    });
}

module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'User | Sign Up'
    });
}

module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'User | Sign In'
    });
}


//Get a sign-up data
module.exports.create = function (req, res) {
    //Todo later
}

//Sign-in and create session for user
module.exports.createSession = function (req, res) {
    //Todo later
}