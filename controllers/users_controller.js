const User = require('../models/user'); //users model

module.exports.users = function (req, res) {
    return res.render('users', {
        title: 'User'
    });
}

module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('user_sign_up', {
        title: 'User | Sign Up'
    });
}

module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('user_sign_in', {
        title: 'User | Sign In'
    });
}


//Get a sign-up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { return console.log(`Error in finding user during signing-up`); }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { return console.log(`Error while creating new-user`); }

                console.log(`Created a new-user : ${user}`);
                res.redirect('/users/sign-in');
            });
        }
        else {
            return res.redirect('back');
        }
    });
}

//Sign-in and create session for user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}


//Deleting the cookie
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { return console.log(`Error while logging out`); }
        res.redirect('/');
    });
}