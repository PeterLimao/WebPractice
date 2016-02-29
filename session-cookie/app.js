var express = require('express'),
    cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());

app.get('/', function(req, res) {
    if (req.cookies.isVisit) {
        console.log(req.cookies.isVisit);
        res.send('欢迎再次访问');
    } else {
        res.cookie('isVisit', 1, {maxAge: 60 * 1000});
        res.send('欢迎第一次访问!');
    }
});

app.listen(3000, function() {
    console.log('app is running at 3000');
});