var injector = {
    dependencies: {},
    register: function(key, value) {
        this.dependencies[key] = value;
    },
    resolve: function(deps, func, scope) {
        var args = [];
        for (var i = 0; i < deps.length, d = deps[i]; i++) {
            if (this.dependencies[d]) {
                args.push(this.dependencies[d]);
            } else {
                throw new Error('Can\'t, resolve' + d);
            }
        }
        return function() {
            func.apply(scope || {}, args.concat(Array.prototype.slice.call(arguments, 0)));
        }
    }
};

(function() {
    injector.register('service', require('./dependencies/service'));
    injector.register('router', require('./dependencies/router'));
})(injector);

module.exports = injector;
