var express = require('express'),
    session = require('express-session');

var app = express();

app.use(session({
    secret: 'recommand 128 bytes random string',
    cookie: {
        maxAge: 60 * 1000
    }
}));

app.get('/', function(req, res) {
    if (req.session.isVisit) {
        req.session.isVisit++;
        res.send('<p>Welcome ' + req.session.isVisit + ' time</p>');
    } else {
        req.session.isVisit = 1;
        res.send('欢迎第一次来');
        console.log(req.session);
    }
});

app.listen(3000, function() {
    console.log('app is running at 3000');
});