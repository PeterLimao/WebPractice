var Q = require('q'),
    fs = require('fs');

function printFileContent(fileName) {
    var defer = Q.defer();
    fs.readFile(fileName, 'utf-8', function(err, data) {
        if (!err && data) {
            console.log(data);
            defer.resolve(fileName + ': success');
        } else {
            console.log(err.message);
            defer.reject(fileName + ': reject');
        }
    });
    return defer.promise;
}

// printFileContent('./test.txt')
// .then(printFileContent('./test2.txt'))
// .then(printFileContent('./test3.txt'));
var promiseList = [
    printFileContent('./test.txt'),
    printFileContent('./test2.txt'),
    printFileContent('./test3.txt')
];

Q.all(promiseList).then(function(success) {
    console.log(success);
}, function(reject) {
    console.log(reject);
});