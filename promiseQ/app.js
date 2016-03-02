var Q = require('q');
var fs = require('fs');
var defer = Q.defer();

function inputPromise() {
    return defer.promise;
}

//当inputPromise返回String, array时候，outputPromise进入fulfilled
//当inputPromise抛出异常的时候，outputPromise进入reject
var outPromise = inputPromise().then(function(fulfilled) {
    var myDefer = Q.defer();
    fs.readFile('./test.txt', 'utf-8', function(err, data) {
        if (!err && data) {
            myDefer.resolve(data);
        } else {
            myDefer.reject('error');
        }
    });
    return myDefer.promise;
}, function(reject) {
    throw new Error('oops!');
});

outPromise.then(function(fulfilled) {
    console.log('fulfilled: ' + fulfilled);
}, function(reject) {
    console.log('reject: ' + reject);
});

defer.resolve('aaaaa');