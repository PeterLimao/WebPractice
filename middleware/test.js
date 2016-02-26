var myExpress = require('./my_express');

var app = myExpress();

app.use(function(req, res, next) {

});
app.use(function(req, res, next) {

});
app.use(function(req, res, next) {

});

app.listen(3000, function() {
    console.log('server is running at 3000');
});
