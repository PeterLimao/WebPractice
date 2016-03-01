var express = require('express'),
    session = require('express-session'),
    redisStore = require('connect-redis')(session);

var app = express();

app.use(session({
    store: new redisStore({
        host: '127.0.0.1',
        port: 6379
    }),
    secret: 'password'
}));

app.get('/', function(req, res) {
    if (req.session.isVisit) {
        req.session.isVisit++;
        res.send('welcome to my app ' + req.session.isVisit + ' times!');
    } else {
        req.session.isVisit = 1;
        res.send('welcome to my app first times');
    }
});

app.listen(3000, function() {
    console.log('app is running at 3000!');
});