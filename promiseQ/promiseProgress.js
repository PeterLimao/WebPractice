var Q = require('q');

var defer = Q.defer();

function getInputPromise() {
    return defer.promise;
}

var outputPromise = getInputPromise().progress(function(success) {
    console.log('progress: ' + success);
});

defer.notify(1);
defer.notify(2);