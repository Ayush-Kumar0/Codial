const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const db = require('./config/mongoose');
const port = 8000;

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

//Use express.Router middleware
app.use('/', require('./routes'));

app.listen(port, 'localhost', function (err) {
    if (err) {
        console.log(`Error while connecting to server on port : ${err}`);
        return;
    }
    console.log(`Server is successfully running on port : ${port}`);
});