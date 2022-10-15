module.exports.home = function (req, res) {
    // res.end('This is home.');
    res.render('home', { title: 'Homepage' });
};