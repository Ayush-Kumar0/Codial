const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Telling passport to use this localStrategy
passport.use(new localStrategy({
    usernameField: 'email'
},
    function (email, password, done) { //done is callback function which is reporting back to passport.js

        //Finding the user
        User.findOne({ email: email }, function (err, user) {
            if (err) { console.log(`Error in finding user`); return done(err); }
            if (!user || user.password != password) { console.log(`User not found`); return done(null, false); }
            return done(null, user);
        });

    }
));


//Serializing the user, i.e. , which key is to be kept in the cookie
passport.serializeUser(function (user, done) {
    console.log(`Serialization done`);
    done(null, user._id);
});

//Deserializing the user
passport.deserializeUser(function (_id, done) {
    User.findById(_id, function (err, user) {
        if (err) { console.log(`Error while finding the user`); return done(err); }

        console.log(`Deserialization done`);
        return done(null, user);
    });
});


//Check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/users/sign-in');
}

//Set user's data to views after checking if user is authenticated
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

//Exporting passport
module.exports = passport;