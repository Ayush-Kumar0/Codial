const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./config/mongoose');
const port = 8000;
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo');

//Static files
app.use(express.static('./assets'));

//Setting up views
app.set('view engine', 'ejs');
app.set('views', './views');

//Setting up layouts
app.use(expressLayouts);
app.set('layout', './layout');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded());
//Cookies
app.use(cookieParser());

//Middleware that encrypts the cookie
app.use(session({
    name: 'codial',
    secret: 'sectretkey',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new mongoStore({
        // mongooseConnection: db,
        client: require('mongoose').connection.getClient(),
        autoRemove: 'disabled'
    }, function (err) { console.log(err || `Error connecting mongo-store`); })
}));

//Using passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use express.Router middleware
app.use('/', require('./routes'));

app.listen(port, 'localhost', function (err) {
    if (err) {
        console.log(`Error while connecting to server on port : ${err}`);
        return;
    }
    console.log(`Server is successfully running on port : ${port}`);
});