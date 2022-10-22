module.exports.home = function (req, res) {
    // res.end('This is home.');
    // console.log(req.cookies);
    // res.cookie('id', '89');
    res.render('home', { title: 'Homepage' });
};