const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_db'); //Makes a database 'codial'

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error while connecting to database.'));

db.once('open', function () {
    console.log('Connected to database.');
})

module.exports = db;