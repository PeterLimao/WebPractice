var http = require('http'),
    middleware = require('./middleware');

var myExpress = function() {
    var app = {
        listen: listen,
        use: use
    };

    var request, response;

    var server = http.createServer(function(req, res) {
        request = req;
        response = res;
    });

    function use(callback) {
        middleware.addMiddleware(callback);
    }

    function listen(port, callback) {
        server.listen(port, callback);
    }

    return app;
};

module.exports = myExpress;