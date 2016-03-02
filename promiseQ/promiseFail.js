var Q = require('q');

var defer = Q.defer();

function getInputPromise() {
    return defer.promise;
}

var outputPromise = getInputPromise().fail(function(error) {
    console.log('error is: ' + error);
});

defer.reject('oops!');