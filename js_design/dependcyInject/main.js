var injector = require('./injector');

var main = injector.resolve(['service', 'router'], function(service, router, other) {
    service();
    router();
    console.log('other');
});

main('other');
