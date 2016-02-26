var middlewareList = [];

var middleware = {
    addMiddleware: function(middleware) {
        middlewareList.push(middleware);
    }
};

module.exports = middleware;