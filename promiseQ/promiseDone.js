var Q = require('q');
var defer = Q.defer();

function test(index, opt) {
    console.log(index);
    if (opt) {
        defer.reject();
    } else {
        defer.resolve();
    }
    return defer.promise;
}

test('1').then(function(){
    return test('2', 'aaa');
}).then(function() {
    return test('3');
});