var express = require('express'),
    bodyParser = require('body-parser'),
    routers = require('./routers'),
    path = require('path');

var app = express();

//设置视图模板
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use('/api', bodyParser.json());
app.use('/api', routers);

app.use('*', function(res, req) {
    req.send('404 Not Found!');
});

app.listen(8000, function() {
    console.log('app run at 8000');
});

module.exports = app;